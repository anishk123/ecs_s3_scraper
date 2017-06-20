# ecs_s3_scraper
A sample web scraper written in nightmare that outputs HTML files to AWS S3, and can be deployed to AWS ECS

> Each step has setup instructions pertaining to how to run the code.
> It also walks through the code that was written in that step, and issues that were encountered along the way.
> If you like to run the final result, please go to the completed folder.

## Step 1
Setup nightmarejs example web scraper on the local machine

## Step 2
Expand on the example to allow users to pass a keyword as an argument, and save the resulting HTML file to the local machine

## Step 3
Dockerize the web scraper i.e. run the code in a docker container, and obtain the resulting HTML file

## Step 4
Configure a mock AWS S3 running on a docker container, and write the HTML file from the dockerized web scraper to it

## Step 5
Deploy the dockerized web scraper to AWS ECS, and write the HTML file to the real AWS S3!
