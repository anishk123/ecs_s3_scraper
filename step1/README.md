# Step 1

## Setup and run instructions
* ```$ npm install```
* ```$ node index.js```

## Development log

#### Initialize package.json file

```$ npm init```

#### Install nightmare

```$ npm install --save nightmare```

*will take some time*

#### Create index.js file and copy/paste code the code below

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

 #### Run index.js

 ```$ node index.js```
