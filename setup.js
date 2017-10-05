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
var config = require("./config.js")
var jsonfile = require('jsonfile')

// globals
/////////////////////////////////////////////////////////////////

var VERBOSE = false
var PATH = config.appPath

// helpers
/////////////////////////////////////////////////////////////////

function generate(paths, cb){
	fs.mkdir(PATH+'/language', function (err) {
		if (err) {
			console.error(err);
		} 
		for (var i = 0; i < paths.length; i++) {
			if (VERBOSE){ 
				console.log("generate "+paths[i])
			}
			var basePath = PATH+'/language/'+paths[i]
			fs.mkdir(PATH+'/language/'+paths[i], function (err) {
				if (err) {
					console.error(err);
				} 
				
				for (var x = 0; x < config.languages.length; x++) { 
					var lang = config.languages[x]
					jsonfile.writeFile(basePath+"/"+lang+'.json', {path: basePath+"/"+lang+'.json'}, err => {
						if (err) return console.error(err)
						if (VERBOSE){ 
							console.log('success! '+basePath+" for language: "+lang)
						}
					})
				}
			})
		}
		cb(null)
	});
}

function addPage(path, cb){
	if (VERBOSE){ 
		console.log("generate "+path)
	}
	var basePath = PATH+'/language/'+path
	fs.mkdir(PATH+'/language/'+path, function (err) {
		if (err) {
			console.error(err);
		} 
		for (var x = 0; x < config.languages.length; x++) { 
			var lang = config.languages[x]
			jsonfile.writeFile(basePath+"/"+lang+'.json', {path: basePath+"/"+lang+'.json'}, err => {
				if (err) return console.error(err)
				if (VERBOSE){ 
					console.log('success! '+basePath+" for language: "+lang)
				}
			})
		}
	})
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
		VERBOSE = (options.verbose != null)
		if (VERBOSE){
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
		}
		if (!config  || config.paths[0] == null || config.paths[0] == null || config.paths[0] == ""){
			console.log("ERROR: ./languagePaths.js must contain at leats one(1) languages in paths array")
			return;
		}
		generate(config.paths, function(err){
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
		VERBOSE = (options.verbose != null)
		if (VERBOSE){
			console.log("*********************************")
			console.log("*            Copydeck.js        *")
			console.log("*                               *")
			console.log("* Author: Jean-Philippe Beaudet *")
			console.log("* Version: 0.0.1                *")
			console.log("* License:GPL-3.0               *")
			console.log("*                               *")
			console.log("*  Adding new page structure    *")
			console.log("*                               *")
			console.log("*            Adding...          *")
			console.log("*                               *")
			console.log("*********************************")
		}
		if(!options.name  || options.name == ""){
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
	

	// parse the args
	/////////////////////////////////////////////////////////////////////////
	program.parse(process.argv);
