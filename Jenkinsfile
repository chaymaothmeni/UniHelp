pipeline {
    agent any

    environment {
        BACKEND_DIR = 'unihelp-backend'
        FRONTEND_DIR = 'unihelp-frontend'
        JAVA_HOME = '/usr/lib/jvm/java-21-openjdk-amd64'
        PATH = "/usr/bin:$PATH"
        
        // Token SonarQube (défini dans Jenkins Credentials)
        SONAR_TOKEN = credentials('sonar-token')
    }

    tools {
        maven '$_MAVEN'
        jdk '$_HOME'
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

        // ==================== NOUVEAU STAGE SONARQUBE ====================
        stage('SonarQube Analysis - Backend') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    dir("${BACKEND_DIR}") {
                        sh '''
                            mvn clean verify sonar:sonar \
                                -Dsonar.projectKey=unihelp-backend \
                                -Dsonar.projectName="UniHelp Backend" \
                                -Dsonar.host.url=http://localhost:9000 \
                                -Dsonar.login=${SONAR_TOKEN} \
                                -Dsonar.java.binaries=target/classes
                        '''
                    }
                }
            }
        }

        stage('SonarQube Analysis - Frontend') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    dir("${FRONTEND_DIR}") {
                        sh '''
                            npx sonar-scanner \
                                -Dsonar.projectKey=unihelp-frontend \
                                -Dsonar.projectName="UniHelp Frontend" \
                                -Dsonar.host.url=http://localhost:9000 \
                                -Dsonar.login=${SONAR_TOKEN} \
                                -Dsonar.sources=. \
                                -Dsonar.exclusions=**/node_modules/**,**/dist/**,**/*.spec.ts
                        '''
                    }
                }
            }
        }

        // ==================== QUALITY GATE ====================
        stage('Quality Gate Check') {
            steps {
                timeout(time: 30, unit: 'MINUTES') {
                    // Attend le résultat du webhook SonarQube
                    waitForQualityGate abortPipeline: true
                }
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
