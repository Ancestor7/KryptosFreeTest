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
          npm install
          npm install -D @playwright/test
          npm install -D playwright-core
          npx playwright install
        '''
      }
    }
    stage('help') {
      steps {
        sh 'npx playwright test --help'
      }
    }
    stage('test') {
      steps {
        sh '''
          npx playwright test --list
          npx playwright test
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
