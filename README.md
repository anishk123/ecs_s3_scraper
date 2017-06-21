# ecs_s3_scraper
A web scraper written in [Nightmare.js](http://www.nightmarejs.org/) that outputs HTML files to [AWS S3](https://aws.amazon.com/s3/), and can be deployed to [AWS ECS](https://aws.amazon.com/ecs/).

## Goal
The goal of this repo is take a [sample web scraper](https://github.com/segmentio/nightmare#examples) that can be run on a local machine and go through a series of development and tooling steps into deploying it as a service on [AWS ECS](https://aws.amazon.com/ecs/)

## How to get the most out of this repo
Click on the step link, and you will see instructions on how to run the code in that step. It will also walk you through the code that was written in that step, and issues that were encountered along the way. If you like to run the final result, please go to the [Step 5](step5) folder.

## Outline of steps
### [Step 1](step1)
Setup nightmarejs example web scraper on the local machine. 

*Note: If you have followed the steps in [ecs_s3_scraper_starter](https://github.com/anishk123/ecs_s3_scraper_starter), then you don't need to do this step. The [dev log](https://github.com/anishk123/ecs_s3_scraper/tree/master/step1#development-log) talks about how we got there though, if you are interested in finding out.*

### [Step 2](step2)
Expand on the example to allow users to pass a keyword as an argument, and save the resulting HTML file to the local machine

### [Step 3](step3)
Dockerize the web scraper i.e. run the code in a docker container, and obtain the resulting HTML file

### [Step 4](step4)
Configure a mock AWS S3 running on a docker container, and write the HTML file from the dockerized web scraper to it

### [Step 5](step5)
Deploy the dockerized web scraper to AWS ECS, and write the HTML file to the real AWS S3!
