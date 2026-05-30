pipeline{
    agent any


    stages{
        stage('Build Docker Image'){
            steps{
                
                    sh 'docker build -t learning-platform .'
               
            }
        }
        stage("Upload to dockerhub"){
            steps{
                withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKERHUB_USERNAME', passwordVariable: 'DOCKERHUB_PASSWORD')]) {
                    sh 'echo $DOCKERHUB_PASSWORD | docker login -u $DOCKERHUB_USERNAME --password-stdin'
                    sh 'docker tag learning-platform:latest dawoodalam/learning-platform:latest'
                    sh 'docker push dawoodalam/learning-platform:latest'
                }
            }
        }
        stage("Fetch image from dockerhub and run"){
            steps{
                sh 'docker pull dawoodalam/learning-platform:latest'
                sh 'docker run -d -p 3000:3000 dawoodalam/learning-platform:latest'
            }
        }
    }
}