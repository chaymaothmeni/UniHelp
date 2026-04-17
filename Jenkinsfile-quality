pipeline {
    agent any

    environment {
        BACKEND_DIR = 'unihelp-backend'
        FRONTEND_DIR = 'unihelp-frontend'
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

        stage('Compiler Backend') {
            steps {
                dir("${BACKEND_DIR}") {
                    sh 'mvn clean compile -DskipTests'
                }
            }
        }

        stage('Compiler Frontend') {
            steps {
                dir("${FRONTEND_DIR}") {
                    sh 'npm install'
                }
            }
        }

        stage('Analyse Backend') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    dir("${BACKEND_DIR}") {
                        sh '''
                            mvn sonar:sonar \
                                -Dsonar.projectKey=Unihelp \
                                -Dsonar.projectName="Unihelp" \
                                -Dsonar.host.url=http://localhost:9000 \
                                -Dsonar.login=${SONAR_TOKEN}
                        '''
                    }
                }
            }
        }

        stage('Analyse Frontend') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    dir("${FRONTEND_DIR}") {
                        sh '''
                            npx sonar-scanner \
                                -Dsonar.projectKey=Unihelp \
                                -Dsonar.projectName="Unihelp" \
                                -Dsonar.host.url=http://localhost:9000 \
                                -Dsonar.login=${SONAR_TOKEN} \
                                -Dsonar.sources=src
                        '''
                    }
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 30, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }

        stage('Résultat') {
            steps {
                echo "✅ Analyse terminée"
                echo "📊 Résultats: http://localhost:9000"
            }
        }
    }

    post {
        success {
            echo '🎉 Qualité du code validée !'
        }
        failure {
            echo '❌ Qualité du code non conforme'
        }
    }
}
