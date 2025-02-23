pipeline {
    agent any

    environment {
        CONTAINER_NAME = "wolfbnb"
        CONTAINER_ENVIRONMENT = "node:22-alpine"
        CONTAINER_PORT = "3000"

        ENV_CREDS_ID = "${CONTAINER_NAME}-env"
        ENV_FILE_PATH = "./.env.local"
    }

    stages {
        stage('Create Env File') {
            steps {
                script {
                    createEnvFile()
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    runContainer("yarn")
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    runContainer("yarn build")
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    deployContainer("yarn start")
                }
            }
        }

        stage('Cloudflared Tunnel') {
            steps {
                script {
                    configureTunnel()
                }
            }
        }

    }
}
