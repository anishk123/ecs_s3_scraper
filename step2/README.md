# Step 2

## Setup and run instructions
* ```$ npm install```
* ```$ node index.js "code & coffee vancouver"```

## Development log

### Install command-line-args so we can pass keyword as arg/param to index.js

```$ npm install --save command-line-args```
[*Command-line-args npm package*](https://www.npmjs.com/package/command-line-args)

### Add command-line-args lib to index.js, and ability to accept keyword as an arg

```
const commandLineArgs = require('command-line-args')

const optionDefinitions = [
  { name: 'keyword', alias: 'k', type: String, defaultOption: true },
]

const options = commandLineArgs(optionDefinitions)
```

### Run index.js with a keyword

```
$ npm index.js "code & coffee vancouver"
npm index.js -k "code & coffee vancouver"
```

### Add fs lib to index.js so that we can save the HTML

```
const fs = require('fs');
```

### Save the HTML to the current directory

```
.then(function () {
  return nightmare.evaluate(function() {
    return document.querySelector('body').innerHTML;
  })
})
.then(function(page) {
  fs.writeFileSync(options.keyword+'.html', page);
})
```

### Run index.js with a keyword

```$ node index.js "code & coffee vancouver"```

### Debug (seems to not save HTML, but instead times out)

```
var nightmare = Nightmare({ 
  show: true,
  openDevTools: {
    mode: 'detach'
  },
  dock: true,
});
```

### This is because our code expects div with ID zero_click_wrapper to contain div with class c-info__title

> But, this is not the case anymore.
> So, waiting for it unfortunately doesn't work, and we don't need to click on it, we just want to get the HTML.
> There is a div with class content-wrap, let us use that

```
.wait('.content-wrap')
```

### Alright, great success! We have the HTML output.
