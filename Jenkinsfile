pipeline {
    agent any

    environment {
        CONTAINER_NAME = "wolfbnb"
        CONTAINER_ENVIRONMENT = "node:22-alpine"
        CONTAINER_PORT = "3000"
        ENV_FILE_PATH = "./.env.local"
        ENV_CREDS_ID = "${CONTAINER_NAME}-env"
    }

    stages {
        stage('Workspace Cleanup') {
            steps {
                cleanWs()
            }
        }

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Create Env File') {
            steps {
                withCredentials([file(credentialsId: ENV_CREDS_ID, variable: 'ENV_FILE')]) {
                    sh "cp $ENV_FILE ${ENV_FILE_PATH}"
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    sh """
                    docker run \
                        --rm \
                        -v ${WORKSPACE}:/app \
                        ${CONTAINER_ENVIRONMENT} \
                        sh -c "cd app && yarn"
                    """
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    sh """
                    docker run \
                        --rm \
                        -v ${WORKSPACE}:/app \
                        ${CONTAINER_ENVIRONMENT} \
                        sh -c "cd app && yarn build"
                    """
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    sh "docker rm -f ${CONTAINER_NAME} || true"
                    
                    sh """
                    docker run \
                        -d \
                        --restart always \
                        -p ${CONTAINER_PORT} \
                        -v ${WORKSPACE}:/app \
                        --name ${CONTAINER_NAME} \
                        ${CONTAINER_ENVIRONMENT} \
                        sh -c "cd app && yarn start"
                    """
                }
            }
        }
    }
}
