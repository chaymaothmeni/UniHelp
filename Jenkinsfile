pipeline {
    agent any  // Exécute sur ton agent Jenkins (ta VM Ubuntu)

    tools {
        maven 'Maven'          // Le nom que tu as configuré dans Jenkins Tools (si pas, on ajuste)
        jdk 'JDK17'            // Si tu as configuré JDK 17 dans Jenkins Global Tools
        nodejs 'Node24'        // Si tu as configuré NodeJS dans Jenkins (sinon on installe via sh)
    }

    stages {
        stage('Cloner le code') {
            steps {
                git branch: 'main',
                    credentialsId: 'github-token-for-jenkins',  // Le nom exact de ton credential !
                    url: 'https://github.com/chaymaothmeni/UniHelp.git'
            }
        }

        stage('Build Backend (Spring Boot)') {
            steps {
                dir('unihelp-backend') {  // Va dans le dossier backend
                    sh 'mvn clean install -DskipTests'  // Build sans tests pour commencer
                }
            }
        }

        stage('Build Frontend (Angular)') {
            steps {
                dir('unihelp-frontend') {  // Va dans le dossier frontend
                    sh 'npm install'                // Installe les dépendances
                    sh 'ng build --configuration production'  // Build pour prod
                }
            }
        }

        // Optionnel : Ajoute une étape pour voir les fichiers buildés
        stage('Vérifier les builds') {
            steps {
                sh 'ls -la unihelp-backend/target/'     // Doit montrer le JAR
                sh 'ls -la unihelp-frontend/dist/'      // Doit montrer les fichiers Angular buildés
            }
        }
    }

    post {
        always {
            echo 'Pipeline terminé !'
        }
        success {
            echo 'Tout est OK 🎉'
        }
        failure {
            echo 'Il y a eu une erreur 😔'
        }
    }
}
