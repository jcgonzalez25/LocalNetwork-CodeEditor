var _ignoredelta = false;

/**
 * uuidv4() from: "broofa":
 * https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
 */
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

var uuid = uuidv4();
let wsUrl = "ws://"+LOCAL_SERVER_IP+":"+PORT+"/";
var _conn = new WebSocket(wsUrl, "test");

var _editor = new ace.edit("editor");
_editor.setTheme("ace/theme/tomorrow");
_editor.session.setMode("ace/mode/c_cpp");
_editor.$blockScrolling = Infinity;
var _edoc = _editor.env.document.getDocument();

_editor.env.document.getDocument().on("change", function(e) {
  if (_ignoredelta) {
    _ignoredelta = false;
    return;
  }
  _conn.send(JSON.stringify({uuid: uuid, type: 1, delta: e}));
});

/**
 * Dynamic marker code from "a user":
 * https://stackoverflow.com/questions/24807066/multiple-cursors-in-ace-editor
 */
var marker = {}

marker.cursors = [{row: 0, column: 0}];
marker.update = function(html, markerLayer, session, config) {
  var start = config.firstRow, end = config.lastRow;
  var cursors = this.cursors
  for (var i = 0; i < cursors.length; i++) {
    var pos = this.cursors[i];
    if (pos.row < start) {
      continue
    } else if (pos.row > end) {
      break
    } else {
      // compute cursor position on screen
      // this code is based on ace/layer/marker.js
      var screenPos = session.documentToScreenPosition(pos)

      var height = config.lineHeight;
      var width = config.characterWidth;
      var top = markerLayer.$getTop(screenPos.row, config);
      var left = markerLayer.$padding + screenPos.column * width;
      // can add any html here
      html.push(
        "<div class='MyCursorClass' style='",
        "height:", height, "px;",
        "top:", top, "px;",
        "left:", left, "px; width:", width, "px'></div>"
      );
    }
  }
}

marker.redraw = function() {
  this.session._signal("changeFrontMarker");
}

marker.addCursor = function() {
  // add to this cursors
  // ....
  // trigger redraw
  marker.redraw()
}

marker.session = _editor.session;
marker.session.addDynamicMarker(marker, true)

// call marker.session.removeMarker(marker.id) to remove it
// call marker.redraw after changing one of cursors

_conn.onmessage = function(mev) {
  console.log(mev,"got message");
  var data = JSON.parse(mev.data);
  if (data.uuid == uuid) return;
  switch(data.type) {
    case 1:
      _ignoredelta = true;
      _edoc.applyDelta(data.delta);
      break;
    case 2:
      marker.cursors[0] = data.cpos;
      marker.redraw();
      break;
    case 3:
      console.log("Type 3 request");
      var value = _editor.getValue();
      _conn.send(JSON.stringify({uuid: uuid, type: 4, value: value}));
      break;
    case 4:
      console.log("Type 4 received");
      _editor.setValue(data.value,{row:0, column:0});
      break;
  }
}

var _prevcp = null;
setInterval(function() {
  var pos = _editor.getCursorPosition();
  if (_prevcp == null) _prevcp = pos;
  if (pos != _prevcp) _conn.send(JSON.stringify({uuid: uuid, type: 2, cpos: pos}));
  _prevcp = pos;
}, 10);
