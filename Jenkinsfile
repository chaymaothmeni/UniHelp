pipeline {
    agent any

    environment {
        BACKEND_DIR = 'unihelp-backend'
        FRONTEND_DIR = 'unihelp-frontend'
        JAVA_HOME = '/usr/lib/jvm/java-21-openjdk-amd64'
        PATH = "/usr/bin:$PATH"  // assure que node et npm sont trouvés
    }

    tools {
        maven '$_MAVEN'   // le nom que tu as configuré dans Jenkins Tools
        jdk '$_HOME'     // le JDK21 configuré dans Jenkins Tools
        nodejs '$_NODEJS'
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
                    // Installer les dépendances dans le projet
                    sh 'npm install'
                    // Utiliser Angular CLI local avec npx
                    sh 'npx ng build --configuration production'
                }
            }
        }

        stage('Vérifier les builds') {
            steps {
                echo "Backend build :"
                sh "ls -la ${BACKEND_DIR}/target/"

                echo "Frontend build :"
                sh "ls -la ${FRONTEND_DIR}/dist/"
            }
        }

        stage('Archive des artifacts') {
            steps {
                archiveArtifacts artifacts: "${BACKEND_DIR}/target/*.jar", fingerprint: true
                archiveArtifacts artifacts: "${FRONTEND_DIR}/dist/**", fingerprint: true
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
