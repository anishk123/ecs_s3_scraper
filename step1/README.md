# Step 1

## Objective
We want setup and run nightmarejs example web scraper on the local machine.

## To execute the code in this directory, run the commands below
If you like to code it yourself, follow the steps in the Development log
* ```$ npm install```
* ```$ node index.js```

## Coding changes and tools installed to complete the objective (Development log)

### First thing, let us initialize the package.json file

```$ npm init```

### Install nightmarejs

```$ npm install --save nightmare```

*Note: This will take some time*

### Create index.js file and copy/paste code the code below

The code initializes nightmarejs, and searches a keyword "github nightmare" on your local machine. The code makes use of Javascript Promises to perform async tasks. [Nightmare.js Github repo](https://github.com/segmentio/nightmare) provides a good introduction and guide to learn more about nightmarejs.

```
var Nightmare = require('nightmare');		
var nightmare = Nightmare({ show: true });

nightmare
  .goto('https://duckduckgo.com')
  .type('#search_form_input_homepage', 'github nightmare')
  .click('#search_button_homepage')
  .wait('#zero_click_wrapper .c-info__title a')
  .evaluate(function () {
    return document.querySelector('#zero_click_wrapper .c-info__title a').href;
  })
  .end()
  .then(function (result) {
    console.log(result);
  })
  .catch(function (error) {
    console.error('Search failed:', error);
  });
 ```
 [*Above code has been referenced from here*](https://github.com/segmentio/nightmare#examples)

 ### Run index.js

 ```$ node index.js```
