# Step 2

## Objective
Expand on the example to allow users to pass a keyword as an argument, and save the resulting HTML file to the local machine

## To execute the code in this directory, run the commands below
If you like to code it yourself, follow the steps in the [Development log](README.md#coding-changes-and-tools-installed-to-complete-the-objective-development-log)
* ```$ npm install```
* ```$ node index.js "code & coffee vancouver"```

## Coding changes and tools installed to complete the objective (Development log)

### Install command-line-args so we can pass keyword as arg/param to index.js

If you followed the steps in [ecs_s3_scraper_starter](https://github.com/anishk123/ecs_s3_scraper_starter), and used yarn instead of npm, then

```
$ rm -rf node_modules
$ npm install
```

  > *Note: The above command uninstalls all the libraries that were installed by yarn, and installs them via npm. Yarn is a better package manager, and we will use it in Step 4 onwards, but the way yarn installs electron on OSX is different than Linux, and this makes things difficult for us in Step 3, so we are reverting to using npm for now. (This is explained in more detail in Step 4)*

OTHERWISE

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
*Note: setting defaultOption to true means that we don't have to use -k option. It will assume that the next argument is the "keyword"*

### Remove hardcoded keyword, and instead use the keyword param that was passed in

Change 

```.type('#search_form_input_homepage', "code and coffee vancouver")``` 

to 

```.type('#search_form_input_homepage', options.keyword)```

### Run index.js with a keyword (both commands below do the same thing)

```
$ node index.js "code & coffee vancouver"
node index.js -k "code & coffee vancouver"
```

### Add fs lib to index.js so that we can save the HTML

```
const fs = require('fs');
```

### Change index.js to save the HTML to the current directory

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

Nightmare.js allows us to open up the Chrome Dev Tools, so we can easily debug the issue. It is pretty handy especially when stuff has changed on the web page.

Change how we initialize Nightmare in index.js to the below.

```
var nightmare = Nightmare({ 
  show: true,
  openDevTools: {
    mode: 'detach'
  },
  dock: true,
});
```

### Oh, the problem is that our code is waiting for the presence of a div with ID zero_click_wrapper that contains a div with class c-info__title

> But, this is not the case anymore.
> So, waiting for it unfortunately doesn't work.
> However, there is a div with class content-wrap, so let us use that.

Change the .wait line in index.js to the below.

```
.wait('.content-wrap')
```

### Run index.js again

```$ node index.js "code & coffee vancouver"```

### Alright, great success! We have the HTML output.
