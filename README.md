# copydeck.js
Language tool for web application built with nodejs 

The purpose is to create json file representing the copydeck of the webb application, then to retreive automatically the language files from the json file using a language context cookie or variable.
the json then is easyly transaltable, can add new language easily and will manage language without the ned to copy pages more than once. 

## Installation:


* npm install 
* set the config file
* run the setup.js (setup generate -v)  command-line tool to set up language structure
* this will create language file with appropriate language file
* the setup will create a directory per views, in shich each language will appear as <language>.json


## Example use(with express) : 

````
var express = require('express');
var http = require('http');
var app = express();
var copydeck = require("../../index.js");

app.use(function (req, res, next) {
  copydeck.cookies(req, res)
  next();
});

app.get('/', function (req, res) {
	var options = {
		filePath: "index",
		header: true,
		footer: true
	};
	copydeck.importTextsByLanguage(options, function(languagePack) {
		var nextLanguage;
		if (languagePack.currentLanguage == "en"){
			nextLanguage = "fr"
		}else{
			nextLanguage = "en"
		}
		res.send('<div><a href="/switch?language='+nextLanguage+'">'+languagePack.contentBlock.switchLanguage+'</a><br><p>'+languagePack.contentBlock.helloWorld+'!</p></div>')
	});
})

app.get('/switch', function (req, res) {
	var language = req.query.language || req.params.language || req.sessions.language
	copydeck.updateGuestLanguage(language, function(){
		res.redirect("/")
	})
	
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

 
````
 
 This will expose all language values as locales available to your rendering/templating engine
 
 #### Example use with handlebars:
 with :
 langague file index/en.js
 {
	title: "Helloworld!",
	content: "this is content" 
 }
  langague file index/fr.js
 {
	title: "Allo monde !",
	content: "Ceci est du contenu" 
 }
 
````
  <div class="entry">
  <h1>{{contentBlock.title}}</h1>
  <div class="body">
    {{contentBlock.content}}
  </div>
</div>

````

 will output either "helloworld!" or "Allo monde !" depending on actual user language
 
  #### Example use with jade/pug:
 with :
 langague file index/en.js
 {
	title: "Helloworld!",
	content: "this is content" 
 }
  langague file index/fr.js
 {
	title: "Allo monde !",
	content: "Ceci est du contenu" 
 }
 
````
html
  body
    .entry
      h1 = contentBlock.title
      .body
        | {{#contentBlock.content}}
        
````
