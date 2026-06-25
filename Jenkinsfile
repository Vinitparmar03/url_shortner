pipeline {
    agent any

    stages {

        stage('Clone Code') {
            steps {
                echo "Cloning the code"
                git url: 'https://github.com/Vinitparmar03/url_shortner.git', branch: 'master'
            }
        }

        stage('Build Images') {
            steps {
                echo "Building Docker images"

                sh '''
                docker build --build-arg VITE_API_URL=http://3.111.33.43:8000 -t url_shortner_frontend ./frontend

                docker build -t url_shortner_backend ./backend
                '''
            }
        }

        stage('Push Images') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-creds',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )
                ]) {

                    sh '''
                    echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin

                    docker tag url_shortner_frontend $DOCKER_USER/url_shortner_frontend:latest
                    docker tag url_shortner_backend $DOCKER_USER/url_shortner_backend:latest

                    docker push $DOCKER_USER/url_shortner_frontend:latest
                    docker push $DOCKER_USER/url_shortner_backend:latest
                    '''
                }
            }
        }

        stage('Deploy') {
            steps {
                echo "Stopping old containers"
                sh 'docker-compose down'

                echo "Starting new containers"
                sh 'docker-compose up --pull always -d'
            }
        }
    }
}
