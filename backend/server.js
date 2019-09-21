#!/usr/local/bin/node

//https://github.com/websockets/ws
var WebSocket = require("ws");
var wss = new WebSocket.Server({port:60000});

var clients = 0, newclients = false;
var master = null;




function heartbeat() {
  this.isAlive = true;
  if (master == null) master = this;
}

const interval = setInterval(function ping() {
  wss.clients.forEach(function each(ws) {
    if (ws.isAlive === false) {
      clients--;
      if (master == ws) master = null;
      return ws.terminate();
    }

    ws.isAlive = false;
    ws.ping('', false, true);
    if (ws == master && newclients) {
      try {
        master.send(JSON.stringify({uuid: "na", type: 3}));
      } catch(e) {
	      ws.terminate();
	      master = null;
      }
    }
  });
}, 30000);

function broadcast(sender, data) {
  wss.clients.forEach(function(client) {
    if (client !== sender && client.readyState === WebSocket.OPEN) {
      try { client.send(data); } catch(e) { /* Do nothing here */ }
    }
  });
}

/**
 * Message types:
 * 1) Normal update
 * 2) Cursor movement?
 * 3) Request/broadcast full update (send entire document to new members)
 */
wss.on("connection", function(ws) {
  ws.needsUpdate = false;
  ws.isAlive = true;
  ws.on('pong', heartbeat);
  ws.on("message", function(message) {
    var msg = JSON.parse(message);
    switch (msg.type) {
      case 1:
      case 2:
        broadcast(ws, message);
	      break;
      case 4:
	      wss.clients.forEach(function(client) {
	      if (client.needsUpdate == true && client.readyState == WebSocket.OPEN) {
	        client.send(message);
	        client.needsUpdate = false;
	      }});
	      newclients = false;
	      break;
    }
  });
  if (clients++ == 0) master = ws;
  else {
    newclients = true;
    ws.needsUpdate = true;
    if (master.isAlive){
      try {
	      master.send(JSON.stringify({uuid: "na", type: 3}));
      } catch(e) {}
    }else master = null;
  }
});
