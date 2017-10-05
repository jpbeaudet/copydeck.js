/**Author: Jean-Philippe Beaudet @ S3R3NITY Technology 
//
// copydeck.js
// command-line tool for copydeck.js
//
// Version : 1.0.0
//
//
//========================================================
*/
// dependencies
//////////////////////////////////////////////////////////////////

var program = require('commander');
var fs = require('fs')
var path = require('path'); 
var moment = require("moment")
var languagePaths = require("./languagePaths.js")

// globals
/////////////////////////////////////////////////////////////////

var NOW = moment().format('lll')
var VERBOSE = false

// helpers
/////////////////////////////////////////////////////////////////

function generate(paths, cb){
	cb(null)
}

function addPage(paths, cb){
	cb(null)
}
// PROGRAM commands
/////////////////////////////////////////////////////////////////
program
	.version('1.0.0')
	.description('Welcome to copydeck.js, this setup will create the langguage file. Be sure you have set at 2 languages in config.js languages attribute')

// generate base language file structure
program
	.command('generate')
	.usage('node setup generate -v')
	.option('-v, --verbose', 'Set to verbose ')
	.action(function(options){
		console.log("*********************************")
		console.log("*            Copydeck.js        *")
		console.log("*                               *")
		console.log("* Author: Jean-Philippe Beaudet *")
		console.log("* Version: 0.0.1                *")
		console.log("* License:GPL-3.0               *")
		console.log("*                               *")
		console.log("* Generating language structure *")
		console.log("*                               *")
		console.log("*            Generate...        *")
		console.log("*                               *")
		console.log("*********************************")
		VERBOSE = (options.verbose != null)
		if (languagePaths.path[0] == null || languagePaths.path[0] == null || languagePaths.path[0] == ""){
			console.log("ERROR: ./languagePaths.js must contain at leats one(1) languages in paths array")
			return;
		}
		generate(languagePaths.paths, function(err){
			if (err){
				console.log(err.message)
			}
			return;
		})
		
	})
	
// add a new page on the fly
program
	.command('add')
	.usage('node setup add -n <pageName>')
	.option('-n, --name [String]', 'name of new page', null)
	.option('-v, --verbose', 'Set to verbose ')
	.action(function(options){
		if(!options.name || options.name.type != "string" || options.name == ""){
			console.log("ERROR: you must specify a name for the new page, which you will use as filePath in your route")
			return;
		}
		addPage(options.name, function(err){
			if (err){
				console.log(err.message)
			}
			return;
			})
	})
