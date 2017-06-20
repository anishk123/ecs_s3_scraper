# ecs_s3_scraper
A sample web scraper written in nightmare that outputs HTML files to AWS S3, and can be deployed to AWS ECS

> Click on the step link, and you will see instructions on how to run the code in that step.
> It will also walk you through the code that was written in that step, and issues that were encountered along the way.
> If you like to run the final result, please go to the [Step 5](step5) folder.

## [Step 1](step1)
Setup nightmarejs example web scraper on the local machine

## [Step 2](step2)
Expand on the example to allow users to pass a keyword as an argument, and save the resulting HTML file to the local machine

## [Step 3](step3)
Dockerize the web scraper i.e. run the code in a docker container, and obtain the resulting HTML file

## [Step 4](step4)
Configure a mock AWS S3 running on a docker container, and write the HTML file from the dockerized web scraper to it

## [Step 5](step5)
Deploy the dockerized web scraper to AWS ECS, and write the HTML file to the real AWS S3!
