# Live Editor On Local Network
## Usage
1. Run 
```
>git clone;
>cd live-class-editor
>npm install
>npm run setup
```
Setup Script changes client config.js globals
```
const LOCAL_SERVER_IP = "IP_TO_YOUR_LOCAL_COMPUT"
//this is for client websocket configuration
```
2. Start up server for websocket broadcasting
```
npm start 
```
3. Open up index.html or have any one visit the ip that your hosting the web page on. 

# Note
* Using golive on vscode is good enough to get the app going 
* Serving `index.html` will enable anybody to see live changes.
