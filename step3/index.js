// Command Line Args
const commandLineArgs = require('command-line-args')

const optionDefinitions = [
  { name: 'keyword', alias: 'k', type: String, defaultOption: true },
]

const options = commandLineArgs(optionDefinitions)
if (!options.hasOwnProperty("keyword")) {
  console.error('Keyword not provided')
  return;
}
//

// File System Utils
const fs = require('fs');

// Nightmare
var Nightmare = require('nightmare');		
var nightmare = Nightmare({ 
  show: true,
  openDevTools: {
    mode: 'detach'
  },
  dock: true,
});

nightmare
  .goto('https://duckduckgo.com')
  .type('#search_form_input_homepage', options.keyword)
  .click('#search_button_homepage')
  .wait('.content-wrap')
  .then(function () {
      return nightmare.evaluate(function() {
        return document.querySelector('body').innerHTML;
      })
  })
  .then(function(page) {
    fs.writeFileSync(options.keyword+'.html', page);
  })
  .then(function (result) {
    return nightmare.end();
  })
  .catch(function (error) {
    console.error('Search failed:', error);
  });
//