# Step 3

## Setup and run instructions
* ```$ yarn install```
* ```$ docker run -v <absolute path>/ecs_s3_scraper/step3/:/workspace ecs_s3_scraper:latest index.js "code and coffee vancouver"```
*Note: We are using the yarn package manager from now onwards because our docker image uses it, and it is also better than npm*

## Development log

#### Search for a nightmarejs docker image on [hub.docker.com](https://hub.docker.com)

![Searching for nightmare on hub.doker.com](images/searching_for_nightmare_on_docker_hub.png)

#### This one looks good. 
1. The setup instructions make sense.
2. The github repo is linked.
3. The Dockerfile seems reasonable, although versions don't seem to be well defined.

![ivanvanderbyl/docker-nightmare docker image]
(images/ivanvanderbyl_docker-nightmare.png)

#### Install docker

[Docker CE and EE for various platforms](https://www.docker.com/get-docker)

[I installed Docker CE for Mac](https://store.docker.com/search?type=edition&offering=community)

#### Pull the nightmare docker image

```$ docker pull ivanvanderbyl/docker-nightmare ```

#### Create Dockerfile and copy/paste the usage instructions into it

```
FROM quay.io/ivanvanderbyl/docker-nightmare:latest

ADD . /workspace
RUN yarn install
```
[*Above code has been referenced from here*](https://hub.docker.com/r/ivanvanderbyl/docker-nightmare/)

*Note: The Dockerfile uses yarn instead of npm to install the dependencies/libs. We can also use yarn instead of npm on our local machines. To know more about the differences between yarn and npm, [click here](https://www.sitepoint.com/yarn-vs-npm/)*

#### Build the new docker image

```$ docker build -t ecs_s3_scraper . ```

#### Run the scraper in a docker container

```$ docker run ecs_s3_scraper index.js "code and coffee vancouver" ```

#### Wait, where is my HTML file ??!!

> It has been written to the filesystem of the docker container.
> More specifically, the /workspace directory of the container.
> The docker container turned off after running the command that it was supposed to.

We can prove this my doing to following

```
$ docker container ls -a
docker export <container_id> -o "scraper.tar.gz"
tar -xvf scraper.tar.gz -C scraper
ls scraper
```

#### Mapping the local directory to docker container is the easiest way to output the HTML file on the local machine

[Explanation of how to do this from Docker docs](https://docs.docker.com/engine/tutorials/dockervolumes/#mount-a-host-directory-as-a-data-volume)

Basically,
```$ docker run -v /Users/<path>:/<container path> ... ```

Let's give this a try:

```$ docker run -v /Users/anish/Documents/STAT/ecs_s3_scraper/step3/:/workspace ecs_s3_scraper:latest index.js "code and coffee vancouver" ```
*Note: The directories have to be absolute path :(*

#### Hmm, doesn't quite work because the local directory doesn't have the dependencies installed

> more specifically it doesn't have the dependencies installed using yarn

So, let's clean up the existing node dependencies, and install them using yarn

```
$ rm -rf node_modules/
yarn install
docker run -v <absolute path>/ecs_s3_scraper/step3/:/workspace ecs_s3_scraper:latest index.js "code and coffee vancouver"
```

#### That seems to have worked! We have the same result as in step2
