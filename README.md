# LambdaAutoDeploy

This solution uses github services to deploy to lambda from github. Github has built-in functionality to send an SNS message when a push occurs to the repository. To setup github and lambda deploy function follow <a href="https://aws.amazon.com/blogs/compute/dynamic-github-actions-with-aws-lambda/">AWS blog post</a> . It is advised to manually create functions in lambda first. Use two repositories for staging and production. Set the before mentioned procedure for both repos. 

##LAMBDA Functionality
Receives the SNS message, find out what stage it is (dev or prod). For the function use the code provided. Edit the code in function to let it know which one is your staging. Change EC2_ADDRESS with public dns of your EC2.

##EC2 Functionality
Clones the git repo, pack EACH FOLDER INTO SEPERATE FUNCTION after running npm install in each folder. The folder name must be same as function name. Deploy the EC2 folder in your EC2 - Machine and run the app.

###Note
This can be implemented in Lambda itself but beacause of capacity limit for free account i used EC2. Ofcourse, this can be implmented in EC2 in whole, then you have to worry about additional security measures. In this way only lambda can connect to your EC2.
