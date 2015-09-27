var net = require('net');
var HOST = '0.0.0.0'; // bind to all interfaces, not just loopback
var PORT = 4000;

net.createServer(function(sock) {
  console.log('CONNECTED - ' + sock.remoteAddress + ':' + sock.remotePort);

  sock.on('data', function(data) {
    console.log('DATA' + sock.remoteAddress + ':');
    console.log(data.toString('utf-8'));
    console.log();
    sock.write('Echo ' + data);
  });

  sock.on('close', function(data) {
    console.log('CLOSED');
  });

}).listen(PORT, HOST);

console.log('Server listening on ' + HOST + ':' + PORT);
