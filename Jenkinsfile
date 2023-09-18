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
        script {
          if (isUnix()) {
            // Unix/Linux environment
            sh '''
              npm install
              npm install -D @playwright/test
              npm install -D playwright-core
            '''
          } else {
            // Windows environment
            bat '''
              npm install
              npm install -D @playwright/test
              npm install -D playwright-core
            '''
          }
        }
      }
    }
    stage('test') {
      steps {
        script {
          if (isUnix()) {
            // Unix/Linux environment
            sh '''
              npx playwright test deneme.spec.ts --workers=1
            '''
          } else {
            // Windows environment
            bat '''
              npx.cmd playwright test deneme.spec.ts --workers=1
            '''
          }
        }
      }
      post {
        success {
          archiveArtifacts(artifacts: 'homepage-*.png', followSymlinks: false)
          script {
            if (isUnix()) {
              sh 'rm -rf *.png'
            } else {
              bat 'del *.png'
            }
          }
        }
      }
    }
  }
}
