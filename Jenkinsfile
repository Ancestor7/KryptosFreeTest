pipeline {
  agent any 
  stages {
    stage('Checkout') {
        steps {
            // Checkout your repository
            git branch: 'main', url: 'https://github.com/Ancestor7/KryptosFreeTest.git'
        }
    }
    stage('install playwright') {
      steps {
        sh '''
          export PATH=/usr/local/bin:$PATH && npm install
          export PATH=/usr/local/bin:$PATH && npm install -D @playwright/test
          export PATH=/usr/local/bin:$PATH && npm install -D playwright-core
          export PATH=/usr/local/bin:$PATH && npm i -g npx
        '''
      }
    }
    stage('test') {
      steps {
        sh '''
          export PATH=/usr/local/bin:$PATH && sudo npx playwright test deneme.spec.ts --workers=1
        '''
      }
      post {
        success {
          archiveArtifacts(artifacts: 'homepage-*.png', followSymlinks: false)
          sh 'rm -rf *.png'
        }
      }
    }
  }
}
