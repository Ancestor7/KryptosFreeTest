pipeline {
    agent any 

    stages {
        stage('Checkout') {
            steps {
                // Checkout your repository
                git branch: 'main', url: 'https://github.com/Ancestor7/KryptosFreeTest.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                // Set the PATH environment variable directly inside the shell step
                sh 'export PATH=/usr/local/bin:$PATH && npm install'
            }
        }

        stage('Run Tests') {
            steps {
                // Run your Playwright test script, setting the PATH environment variable again
                sh 'export PATH=/usr/local/bin:$PATH && npx playwright test'
            }
        }
    }

    post {
        always {
            // Always run this block even if the build fails
            // Here, you can archive test results, artifacts, etc.
            echo 'This will always run'
        }

        success {
            // Run this block only when the build succeeds
            // For instance, you can send a notification of success here
            echo 'Build was a success!'
        }

        failure {
            // Run this block only when the build fails
            // Here, you can send a notification of failure
            echo 'Build failed!'
        }
    }
}
