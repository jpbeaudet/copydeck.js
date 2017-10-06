/**Author: Jean-Philippe Beaudet @ S3R3NITY Technology 
//
// copydeck.js
// language tool for webapp in nodejs & express
//
// Version : 1.0.0
//
//
//========================================================
*/

// Dependencies
/////////////////////////////////////////////
var Cookies = require( "cookies" )
var config = require("./config.js")
var fs = require('fs-extra');       //File System - for file manipulation

// Main Module
/////////////////////////////////////////////
module.exports = {
	self: this,
	lang: self.getGuestLanguage(),
	// set lang context attribute
	getGuestLanguage: function  () { 
		if(cookies.get( "lang" )) {
			self.lang = cookies.get( "lang" );
		}
		else {
			self.lang = config.langDefault;
		}
	},
	updateGuestLanguage: function  (lang, callback) { 
		cookies
			.set( "lang", lang, { httpOnly: false } )
		callback()
	},
	// import language json files based on querystring
	importTextsByLanguage: function  (options, callback) {
		var pathHeaderBlock = './languages/header/' + self.lang + '.json',
			pathContentBlock =  './languages/' + options.filePath +
					'/' + self.lang + '.json',
			pathFooterBlock = './languages/footer/' + self.lang + '.json',      
			headerBlock,
			contentBlock,
			footerBlock = {};
			options.hasOwnProperty('header') ? importHeader(): importContent();
			
		// if set to true, import the header languagepack
		function importHeader() {
			fs.readJson(pathHeaderBlock, 'utf8', function (err, file) {
				if (err) {
					throw err;
				}
				headerBlock = file;
				importContent();
			});
		}
		
		// import the main content block languagepack
		function importContent() {
			fs.readJson(pathContentBlock, 'utf8', function (err, file) {
				if (err) {
					throw err;
				}
				contentBlock = file;
				options.hasOwnProperty('footer') ? importFooter() : callback(
				{
					currentLanguage: self.lang,
					headerBlock: headerBlock,
					contentBlock: contentBlock
				});
			});
		}
		
		// if set to true, import the footer languagepack
		function importFooter() {
			fs.readJson(pathFooterBlock, 'utf8', function (err, file) {
				if (err) {
					throw err;
				}
				footerBlock = file;
				
				callback({
					currentLanguage: self.lang,
					headerBlock: headerBlock,
					contentBlock: contentBlock,
					footerBlock: footerBlock
				});
			});
		}
	}
}
