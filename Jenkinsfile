pipeline{
	agent any

	stages{
		stage("clone code"){
			steps{
				echo "Cloning the code"
				git url: "https://github.com/Vinitparmar03/url_shortner.git", branch: "master"
			}
		}
		
		stage("build and run"){
			steps {

				echo "building the image"
				sh "docker compose down"
				echo "start the container with new build"
				sh "docker compose up --build -d"		
			}
		}

	}
}
	
		
