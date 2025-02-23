pipeline {
    agent any

    environment {
        CONTAINER_NAME = "wolfbnb"
        CONTAINER_ENVIRONMENT = "node:22-alpine"
        CONTAINER_PORT = "3000"
        ENV_FILE_PATH = "./.env.local"
        ENV_CREDS_ID = "${CONTAINER_NAME}-env"
        TUNNEL_NAME = "my-tunnel"
        BASE_DOMAIN = "dire-wolf.tech"
        HOSTNAME = "${CONTAINER_NAME}.${BASE_DOMAIN}"
    }

    stages {
        stage('Create Env File') {
            steps {
                withCredentials([file(credentialsId: ENV_CREDS_ID, variable: 'ENV_FILE')]) {
                    sh "cp -f ${ENV_FILE} ${ENV_FILE_PATH}"
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

        stage('Cloudflared Tunnel') {
            steps {
                script {
                    def hostPort = sh(script: """
                        docker inspect \
                        --format='{{(index (index .NetworkSettings.Ports "${CONTAINER_PORT}/tcp") 0).HostPort}}' \
                        ${CONTAINER_NAME} 
                    """, 
                    returnStdout: true)
                    
                    sh "docker exec cloudflared cloudflared tunnel route dns -f ${TUNNEL_NAME} ${HOSTNAME}"
                
                    sh """
                        docker run \
                            --rm \
                            -v ${JENKINS_HOME}/scripts:/app \
                            -v /var/cloudflare:/home/nonroot/.cloudflared \
                            node:22-alpine \
                            sh -c "cd app && yarn && node updateCloudflareConfig.js ${HOSTNAME} http://localhost:${hostPort}"
                    """

                    sh "docker exec cloudflared cloudflared tunnel ingress validate"

                    sh "docker restart cloudflared"    
                }
            }
        }

    }
}
