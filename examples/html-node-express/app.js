/**Author: Jean-Philippe Beaudet @ S3R3NITY Technology 
//
// copydeck.js html-nodejs,express examples use
//
// Version : 1.0.0
//
//========================================================
*/
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
