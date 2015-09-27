var net = require('net');
var url = require('url');
var client = new net.Socket();

var SERVER_PORT = process.env.NET_SERVER_PORT;

function connect() {

  console.log('connecting ...');

  client.on('error', function(e) {
    console.log(e);
    process.exit(1);
  });

  client.on('data', function(d) {
    console.log(d.toString('utf-8'));
  });

  client.on('close', function() {
    console.log('Client disconnected from ' + SERVER_PORT);
  });

  // Socket.connect() does not take docker-formatted port urls. need to parse and use as options
  var serverPort = url.parse(SERVER_PORT);

  client.connect({port: serverPort.port, host: serverPort.hostname}, function() {
    console.log('Client connected to ' + process.env.NET_SERVER_PORT);
    // can't write an object directly, need to be a string
    client.write(JSON.stringify({
      message: 'hello!'
    }));
  });

}

function disconnect() {
  console.log('disconnecting');
  client.destroy();
}
process.on('SIGINT', disconnect);

connect();
// disconnect(); // should not be immediately disconnecting
