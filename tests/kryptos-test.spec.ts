import { expect, test } from '@playwright/test';
import { ElectronApplication, Page, _electron as electron } from '@playwright/test';

let electronApp: ElectronApplication;

// Kurulum ve dokümentasyon için -> https://playwright.dev/docs/intro ve https://playwright.dev/docs/api/class-playwright

/**
 * NOT:
 * Test etmek için VS Code uzantısı veya Playwright'ın test arayüzü kullanılmayacaksa (npx playwright test --ui)
 * Kryptos uygulaması bir kere açılmışken tekrar başka bir worker tarafından açılamayacağından workerların
 * paralel çalışmalarını engellemek için test komutu konsola şu şekilde yazılmalı: npx playwright test --workers=1
 */

//beforeAll hook fonksyonu her worker için testlere başlamadan önce çalışması gereken kodları içerir.
test.beforeAll(async () => {
  process.env.CI = 'e2e'
  electronApp = await electron.launch({
    executablePath: "C:\\Program Files\\Kryptos\\Free\\KryptosFree.exe"
  });

  //her açılan pencere için çalışır
  electronApp.on('window', async (page) => {
    const filename = page.url()?.split('/').pop()
    console.log(`Window opened: ${filename}`)

    page.on('pageerror', (error) => {
      console.error(error)
    })

    page.on('console', (msg) => {
      console.log(msg.text())
    })
  })

})

//her worker testlerin tamamını bitirdiğinde bu kodları çalıştırır
test.afterAll(async () => {
  await electronApp.close();
})

let page: Page;
let password = "Kaan*2001";// DEĞİŞMELİ

test('Uygulamaya login yap', async () => {
  
  const timeout = 30000; 
  const startTime = Date.now();

  // Uygulama başta login penceresiyle başlamadığı için while loopu kurdum
  while (true) {

    // Eğer 30 saniye içerisinde login penceresi çıkmaz ise diye timeout koşulu koydum
    if (Date.now() - startTime > timeout) {
      throw new Error('Timeout waiting for the login window');
    }
    const newPage = await electronApp.waitForEvent('window'); // Her aılan pencereyi algılar
    const title = await newPage.title(); // Açılan pencerenin başlığını çeker
    
    // Login penceresinin açılıp açılmadığını böyle ayırt ettim
    if (title == "Kryptos Free") {
      page = newPage;
      break;
    }
  }

  /* 
    login penceresinde sadece bir tane textbox olduğu için getByRole('textbox') ile bulabildim
    ancak birden fazla textbox olsaydı .getByRole('textbox') yanında baka bir locater daha gerek olurdu
    bu linkte önerilen diğer locater'lar yazıyor -> https://playwright.dev/docs/locators 
  */
  await page.getByRole('textbox').fill(password); // fill ile textboxa yazı yazıyor

  /*
    Giriş butonu dışında şifreyi görme butonu da olduğundan ve onların isimlerine ulaşamadığımdan 
    penceredeki butonları bir listeye koyup listedeki sırasına göre tıkladım
  */
  await page.$$eval('button', (buttons, index) => buttons[index].click(), 1);
  //await page.getByRole('button').click();

  // pencere değişikliğini bekleme
  const newWindow = await electronApp.waitForEvent('window');

  // Yeni açılan pencerenin doğru olduğunun kontrolünü ancak böyle yapabildim
  const newWindowTitle = await newWindow.title();
  expect(newWindowTitle).toBe('Kryptos Free');
  
  //ilerdeki yapılabilecek testler için
  page = newWindow;
});
