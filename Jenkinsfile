pipeline {
    agent any

    environment {
        BACKEND_DIR = 'unihelp-backend'
        FRONTEND_DIR = 'unihelp-frontend'
    }

    stages {

        stage('Cloner le code') {
            steps {
                git branch: 'main',
                    credentialsId: 'github-token-for-jenkins',
                    url: 'https://github.com/chaymaothmeni/UniHelp.git'
            }
        }

        stage('Vérifier les versions') {
            steps {
                sh 'java -version'
                sh 'mvn -version'
                sh 'node -v'
                sh 'npm -v'
            }
        }

        stage('Build Backend (Spring Boot)') {
            steps {
                dir("${BACKEND_DIR}") {
                    sh 'mvn clean install -DskipTests'
                }
            }
        }

        stage('Build Frontend (Angular)') {
            steps {
                dir("${FRONTEND_DIR}") {
                    sh 'npm install'
                    sh 'npm install -g @angular/cli'
                    sh 'ng build --configuration production'
                }
            }
        }

        stage('Vérifier les builds') {
            steps {
                sh 'echo "Backend build :"'
                sh 'ls -la unihelp-backend/target/'

                sh 'echo "Frontend build :"'
                sh 'ls -la unihelp-frontend/dist/'
            }
        }

        stage('Archive des artifacts') {
            steps {
                archiveArtifacts artifacts: 'unihelp-backend/target/*.jar', fingerprint: true
                archiveArtifacts artifacts: 'unihelp-frontend/dist/**', fingerprint: true
            }
        }
    }

    post {
        always {
            echo 'Pipeline terminé'
        }
        success {
            echo 'Build réussi 🎉'
        }
        failure {
            echo 'Build échoué ❌'
        }
    }
}
