# Step 1

## Initialize package.json file

```$ npm init```

## Install nightmare

```$ npm install --save nightmare```

* will take some time *

## Create index.js file and copy/paste code from https://github.com/segmentio/nightmare#api

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

 ## Run index.js

 ```$ node index.js```
