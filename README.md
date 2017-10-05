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
var copydeck = require("copydeck")
var app = express();

server = http.createServer( function( req, res ) {

app.get('/',  function (req, res) {
	// set to true to use header and/or footer, leave blank if not
	var blocks = {
		filePath: "index",
		header: true,
		footer: true
	};
	
	var callback = function (languagePack) {
		var data = {
			currentLanguage: languagePack.lang
			headerBlock: languagePack.headerBlock,
			contentBlock: languagePack.contentBlock,
			footerBlock: languagePack.footerBlock
		};
		res.render('somePage', data);
	};
	
	copydeck.importTextsByLanguage(
		blocks,
		callback
	);
}

app.get('/updateLanguage',  function (req, res) {
	var language = req.query.language || req.params.language || req.sessions.language
	copydeck.updateGuestLanguage(language)
	res.redirect("somewhere")
}

}
server.listen(3000)
 
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
