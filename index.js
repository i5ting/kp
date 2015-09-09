var debug = require('debug')('kp');

function exec_kp (server_port, pre) {
  if (arguments.length == 1) {
    pre = "";
  }
  
  var child_process = require('child_process');
  var script = pre + ' lsof -i:' + server_port +'|xargs killall';
  
  debug(script);
  
  // execFile: executes a file with the specified arguments
  child_process.exec(script,
    function (error, stdout, stderr) {
      if (error !== null) {
        console.log('kp exec error: ' + error);
      }else{
        console.log("kp exeute sucess!")
      }
  });
}

module.exports = exec_kp;
