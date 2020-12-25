var debug = require('debug')('kp');
var os = require('os');

function exec_kp(server_port, pre) {
  if (arguments.length == 1) {
    pre = "";
  }

  var child_process = require('child_process');
  var script = os.type() == 'Windows_NT' ? `netstat -ano | findstr ${server_port}` : pre + ' lsof -i:' + server_port + '|xargs killall';

  debug(script);

  // execFile: executes a file with the specified arguments
  child_process.exec(script,
    function (error, stdout, stderr) {
      if (error !== null) {
        console.log('Failed to kill process on port ' + server_port + ':' + error);
      } else {
        if (os.type() == 'Windows_NT') {
          stdout.split('\n').filter(function (line) {
            var p = line.trim().split(/\s+/);
            var address = p[1];
            if (address != undefined) {
              if (address.split(':')[1] == server_port) {
                child_process.exec('taskkill /F /pid ' + p[4], function (err, stdout, stderr) {
                  if (err) {
                    return console.log('Failed to kill process on port ' + server_port + ':' + error);
                  }
                  console.log('Killed process on port ' + server_port);
                });
              }
            }
          });
        }
        else {
          console.log('Killed process on port ' + server_port);
        }
      }
    })
}
module.exports = exec_kp;
