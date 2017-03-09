var modules = new Array();
var links = new Array();
var toolboxes = new Array();
var users = 0;

function setup() {
    createCanvas(er_canvas_width, er_canvas_height);
    frameRate(30);
    er_websocket_host = "localhost";
    er_websocket_port = "3334";

    er_focus = true;
    er_tuio_connected = false;

    window.addEventListener('focus', windowFocus);
    window.addEventListener('blur', windowBlur);

    angleMode(RADIANS);
    rectMode(CENTER);

    // everything event driven is now set up, so establish the two
    // intervals that drive the rest of the program:  the socket connection
    // check, and the render loop
    //er_render_interval = setInterval(renderLoop, 1000/g_frame_rate);
    er_socket_interval = setInterval(socketCheck, 1000);
}

function draw() {
    background(255);
    touchAnalyse();

    for (var a = 0; a < toolboxes.length; a++) {
        //var a = 0;
        for (var b = 0; b < toolboxes.length; b++) {
            if (a != b) {
                var m = (toolboxes[a].myY - toolboxes[b].myY) / (toolboxes[a].myX - toolboxes[b].myX);
                var m2 = -1 / m;
                var midX = (toolboxes[a].myX + toolboxes[b].myX) / 2;
                var midY = (toolboxes[a].myY + toolboxes[b].myY) / 2;
                stroke(230);
                //line((-midY + m2 * midX) / m2, 0, (1080 - midY + m2 * midX) / m2, 1080);

                var minY = 0;
                var maxY = 1080;
                var minMax = "min";
                var check = 0;
                for (var y = 0; y < 1080; y++) {
                    check = 0;
                    for (var c = 0; c < toolboxes.length; c++) {
                        if (c != a && c != b) {
                            var d2 = toolboxes[c].distanceTo((y - midY + m2 * midX) / m2, y);
                            var d1 = toolboxes[a].distanceTo((y - midY + m2 * midX) / m2, y);
                            if (d2 < d1) {
                                check++;
                            }
                        }
                    }
                    if (check > 0 && minMax == "min") {
                        minY = y;
                    } else if (check > 0 && minMax == "max") {
                        maxY = y;
                        y = 1080;
                    } else {
                        minMax = "max";
                    }
                }
                stroke(150);
                if (minY <= maxY)
                    line((minY - midY + m2 * midX) / m2, minY, (maxY - midY + m2 * midX) / m2, maxY);

            }
        }
    }

    for (var i = 0; i < links.length; i++) {
        links[i].render();
    }
    for (var i = 0; i < modules.length; i++) {
        modules[i].render();
    }
    for (var i = 0; i < toolboxes.length; i++) {
        if (toolboxes[i].keyboardActivate == true) {
            push();
            translate(toolboxes[i].myX, toolboxes[i].myY);
            rotate(toolboxes[i].rotation);
            toolboxes[i].keyboard.render();
            pop();
        }
    }
    for (var i = 0; i < toolboxes.length; i++) {
        fill(200);
        stroke(0);
        toolboxes[i].render();
    }

    for (var i = 0; i < er_cursors.length; i++) {
        er_cursors[i].render();
    }
}

function dbg(msg, level) {
    if (level == undefined || level == null)
        console.log(msg);
    else if (level == 1)
        console.warn(msg);
    else
        console.error(msg);
}