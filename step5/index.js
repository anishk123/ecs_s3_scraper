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

// AWS-SDK S3 setup
var AWS = require('aws-sdk')

var config = {
  s3ForcePathStyle: true,
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  endpoint: 'http://s3:'+process.env.S3_EXTERNAL_PORT
}

var s3Client = new AWS.S3(config)
//

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
    writeFileToS3(options.keyword+'.html');
  })
  .then(function (result) {
    return nightmare.end();
  })
  .catch(function (error) {
    console.error('Search failed:', error);
  });
//

// writeFileToS3(options.keyword+'.html');
function writeFileToS3(fileName) {
  var params = {
    Key: fileName,
    Bucket: 'duckduckgo_htmls',
    Body: fs.createReadStream(fileName)
  }

  s3Client.upload(params, function uploadCallback (err, data) {
    console.log(err, data);
  })
}