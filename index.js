#!/usr/bin/env node

var child_process = require('child_process');

var argv = process.argv;
argv.shift();

var file_path = __dirname;
var current_path = process.cwd();

var server_port = 3000;

if ( argv.length > 1 ) {
  // console.log(argv)
  var first_arg = argv[0];
  if ( first_arg == '-h' || first_arg == '--help' ) {
    console.log('kp is a tool for kill process by server port. only use for mac\nkp or kp 3002');
  }else{
    server_port = (argv[1] + '').trim();
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