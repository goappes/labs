#!/usr/bin/env node
 
//this hook installs all your plugins
 
// add your plugins to this list--either 
// the identifier, the filesystem location 
// or the URL


var pluginlist = {
    "com.ionic.keyboard": null,
    "com.phonegap.plugins.PushPlugin": null,
    "org.apache.cordova.device": null,
    "org.apache.cordova.geolocation": null,
    "org.apache.cordova.network-information": null,
    "org.apache.cordova.splashscreen": null,
	"https://github.com/Wizcorp/phonegap-facebook-plugin.git": {
		params: [ '--variable APP_ID="123456789"', '--variable APP_NAME="Dumba"' ]
	}
};
 
// no need to configure below
 
var fs = require('fs');
var path = require('path');
var sys = require('sys')
var exec = require('child_process').exec;

String.prototype.supplant = function (o) {
    return this.replace(/{([^{}]*)}/g,
        function (a, b) {
            var r = o[b];
            return typeof r === 'string' || typeof r === 'number' ? r : a;
        }
    );
};
 
function puts(error, stdout, stderr) {
    sys.puts(stdout)
}

for (var plug in pluginlist) {
	var params = pluginlist[plug] && pluginlist[plug].params.join(" ") || "";
	var cli = "cordova plugin add {plug} {params}".supplant({plug: plug, params: params});
	exec(cli, puts);
}
