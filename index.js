#!/usr/bin/env node

var child_process = require('child_process');
var subl = '/Applications/Sublime Text.app/Contents/SharedSupport/bin/subl';

var argv = process.argv;
argv.shift();

var file_path = __dirname;
var current_path = process.cwd();

var server_port = 3000;

if ( argv.length > 1 ) {
  var first_arg = argv[0];
  if ( first_arg == '-h' || first_arg == '--help' ) {
 
  }else{
    server_port = (first_arg + '').trim();
  }
}

var script = 'lsof -i:' + server_port +'|xargs killall';

console.log(script);


// execFile: executes a file with the specified arguments
child_process.exec(script,
  function (error, stdout, stderr) {
    if (error !== null) {
      console.log('kp exec error: ' + error);
    }else{
      console.log("kp exeute sucess!")
    }
});