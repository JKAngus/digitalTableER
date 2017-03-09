
// web socket
var er_webSocket = null;
var er_websocket_host;
var er_websocket_port;
var er_socket_interval;

// some flags
var er_focus;
var er_tuio_connected;

var er_canvas_width = 1920;
var er_canvas_height = 1080;

//----------------------------------------------------------------
// Check the status of the WebSocket. If the socket is not connected
// and the app has focus, connect the web socket. This function is
// on a one second timer, set up earlier in main()
//----------------------------------------------------------------
function socketCheck() {
    if ((er_webSocket == null) && er_focus) {
        var wsloc = "ws://" + er_websocket_host + ":" + er_websocket_port;
        er_webSocket = new WebSocket(wsloc);

        er_webSocket.onopen = sockopen;
        er_webSocket.onclose = sockclose;
        er_webSocket.onmessage = sockmsg;
        er_webSocket.onerror = sockerr;
    }
}

function sockopen(evt) {
    er_tuio_connected = true;
    dbg("Web socket connected.");
}

function sockclose(evt) {
    dbg("Web socket disconnected.", 1);
    er_webSocket = null;
    er_tuio_connected = false;
}

function sockerr(evt) {
    dbg("Web socket error, killing connection.", 2);
    er_webSocket = null;
    er_tuio_connected = false;
}

function sockmsg(evt) {
    // incoming message is ID,OPERATION,X,Y
    // where operation is A,R,U  for add,remove,update
    var xyarr = evt.data.split(",");

    var id = xyarr[0];
    var op = xyarr[1];

    var x = parseFloat(xyarr[2]);
    var y = parseFloat(xyarr[3]);

    x *= er_canvas_width;
    y *= er_canvas_height;

    if (op == "A")
        touchAdd(id, Math.round(x), Math.round(y));
    else if (op == "R")
        touchRemove(id);
    else if (op == "U")
        touchUpdate(id, Math.round(x), Math.round(y));
}

function windowFocus() {
    er_focus = true;
}

function windowBlur() {
    er_focus = false;
    if (er_webSocket != null) {
        er_webSocket.close();
        er_webSocket = null;
    }
}