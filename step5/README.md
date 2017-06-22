# Step 5

## Objective
Deploy the dockerized web scraper to AWS ECS, and write the HTML file to the real AWS S3!

## Coding changes and tools installed to complete the objective (Development log)

### Before we deploy our docker image to ECS, we should fix the issue around hard-coded (magic) S3 config

> If we don't, then everytime we build a docker image for ECS, we will need to change the config to point to actual AWS S3.

There is a node library called [dotenv](https://www.npmjs.com/package/dotenv) that makes management of environment variables easier.

### Based on dotenv's usage instructions, let's create an .env file with our local S3 config

But first, lets install the dotenv lib

```$ yarn add dotenv```

The .env file should look like

```
S3_ACCESS_KEY_ID=ACCESS_KEY_ID
S3_SECRET_ACCESS_KEY=SECRET_ACCESS_KEY
```

and now, we can use them in index.js as follows

```
require('dotenv').config();

var config = {
  s3ForcePathStyle: true,
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  endpoint: new AWS.Endpoint('http://s3:4569')
}
```

Let's run the scraper service and see if it still works

```$ docker-compose run scraper index.js "code and coffee vancouver"```

Awesome! appears to work.

### But, there is an easier and better to do this in docker-compose.

Here is an [example](https://docs.docker.com/compose/environment-variables/#setting-environment-variables-in-containers) of what it looks like in docker-compose.yml

```
web:
  environment:
    - DEBUG=1
```

and you can also do [variable substitution](https://docs.docker.com/compose/compose-file/#variable-substitution)

```
web:
  build: .
  ports:
    - "${EXTERNAL_PORT}:5000"
```

So, we can do something like the following in our docker-compose.yml

```
version: '3'
services:
  scraper:
    build: .
    volumes:
      - .:/workspace
      - /workspace/node_modules
    links:
      - s3
    depends_on:
      - s3
    environment:
      - S3_ACCESS_KEY_ID=ACCESS_KEY_ID
      - S3_SECRET_ACCESS_KEY=SECRET_ACCESS_KEY
    env_file: .env
  s3:
    image: lphoward/fake-s3
    ports:
      - "${S3_EXTERNAL_PORT}:4569"
```

*Note: S3_EXTERNAL_PORT can be passed in as an argument to docker-compose, but to make our life easier, we can set it to a default value in the .env file*

Let us replace everything in the .env file with just

```
S3_EXTERNAL_PORT=4569
```

There are several advantages of doing it in docker-compose vs dotenv.

1. No custom library install required
2. All of the configuration is in one place
3. Easier to read and modify

Alright, let us remove the dotenv library, and try running this again

Firstly, remove dotenv from index.js 

and the change the S3 config to use the S3_EXTERNAL_PORT as follows

```
var config = {
  s3ForcePathStyle: true,
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  endpoint: 'http://s3:'+process.env.S3_EXTERNAL_PORT
}
```

then, the last step is to remove the dotenv lib, build and run again

```
$ yarn remove dotenv
docker-compose build
docker-compose run scraper index.js "code and coffee vancouver"
```

This is great! It picks up all the environment variables from docker-compose.yml, and it is fairly easy to read.

### Creat docker-compose.yml from dev, test and production

Taking this to the next level, we can create

> docker-compose.yml

> docker-compose-test.yml

> docker-compose-production.yml

and we can set the s3 service in production to be actual AWS S3.

Infact, we can do a bit more than that if we like, ECS provides a [CLI](http://docs.aws.amazon.com/AmazonECS/latest/developerguide/cmd-ecs-cli-compose.html) that we can use to setup everything that is required for ECS service(s) to run.

### To be continued...
