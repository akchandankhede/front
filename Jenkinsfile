node{
  def app
  stage('Clone Repo'){
    /* Checking git repo */
    checkout scm
  }
  stage('Build Image'){
    app = docker.build("akchandankhede/front")
  }
  stage('Test Image'){
    app.inside{
      sh 'echo ' Test passed''
    }
  }
  stage('push image'){
    docker.withRegistory('https://registory.hub.docker.com','docker-hub')
    app.push("${env.BUILD_NUMBER}")
    app.push("latest")
  }
}
