/** 
 * Example Playwright script for Electron
 * showing/testing various API features 
 * in both renderer and main processes
 */

import { expect, test } from '@playwright/test';
import { 
  clickMenuItemById,
  findLatestBuild, 
  ipcMainCallFirstListener, 
  ipcRendererCallFirstListener, 
  parseElectronApp,
  ipcMainInvokeHandler,
  ipcRendererInvoke
} from 'electron-playwright-helpers';
import jimp from 'jimp';
import { ElectronApplication, Page, _electron as electron } from 'playwright';

let electronApp: ElectronApplication;

test.beforeAll(async () => {
  process.env.CI = 'e2e'
  electronApp = await electron.launch({
    executablePath: "/Users/ilaydagurocak/Desktop/Deneme-main/bin/Desktop/mac/BlazorElectronApp.app"
  });
  electronApp.on('window', async (page) => {
    const filename = page.url()?.split('/').pop()
    console.log(`Window opened: ${filename}`)

    // capture errors
    page.on('pageerror', (error) => {
      console.error(error)
    })
    // capture console messages
    page.on('console', (msg) => {
      console.log(msg.text())
    })
  })

})

test.afterAll(async () => {
  await electronApp.close();
})

let page: Page;

test('Count button test', async () => {
    await page.getByText('Counter' ).click();

    let oldText = await page.getByRole('status');

    await page.getByText('Click me').click();

    let newText = await page.getByRole('status');

    expect(oldText!=newText)

});