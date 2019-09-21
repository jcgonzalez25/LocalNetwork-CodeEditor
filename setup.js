'use strict';
var os = require('os');
var ifaces = os.networkInterfaces();
var fs = require('fs');
function getIP(){
    return new Promise(res=>{
        Object.keys(ifaces).forEach(function (ifname) {
            var alias = 0;
            var ip;
            ifaces[ifname].forEach(function (iface) {
              if ('IPv4' !== iface.family || iface.internal !== false) {
                // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
                return;
              }
          
              if (alias >= 1) {
                // this single interface has multiple ipv4 addresses
                console.log(ifname + ':' + alias, iface.address);
              } else {
                // this interface has only one ipv4 adress
                ip = iface.address;
                res(ip)
              }
              ++alias;
            });
          
          });
    
    })
}
getIP().then(IP=>{
    fs.writeFile('src/client_config.js',
    `const LOCAL_SERVER_IP = \"${IP}\";\nconst PORT=\"6000\";`,
    (err)=>console.log(err)
    )
})

