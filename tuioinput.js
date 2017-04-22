
// this holds all the touch events currently being tracked
var er_cursors = new Array();

// this is the object type held in the g_cursors array
function Cursor(id, ix, iy, itime) {
    this.myX = ix;
    this.myY = iy;
    this.myId = id;
    this.myTime = itime;
    this.myObject = null;
    this.myLink = null;
    this.myPurpose = "new";
    this.myToolbox = null;

    this.distanceTo = function (x, y) {
        return Math.sqrt((y - this.myY) * (y - this.myY) + (x - this.myX) * (x - this.myX));
    }
}

Cursor.prototype.render = function () {
    stroke(0);
    fill(0);
    ellipse(this.myX, this.myY, 20, 20);
    textSize(12);
    /*
    if (this.myToolbox != null)
        text(
            this.myX + "," +
            this.myY + "," +
            //this.myTime + "," +
            this.myPurpose + "," +
            "Toolbox " + this.myToolbox.user + "," +
            this.myObject + "," +
            this.myLink,
            this.myX,
            this.myY - 25
        );
    else
        text(
            this.myX + "," +
            this.myY + "," +
            //this.myTime + "," +
            this.myPurpose +
            this.myObject + "," +
            this.myLink,
            this.myX,
            this.myY - 25
        );
        */
}

// calls when new touches are added
function touchAdd(id, x, y) {
    var newCursor = new Cursor(id, x, y, Date.now());

    //find nearest toolbox and set in cursor
    var closestToolbox = null;
    for (var i = 0; i < toolboxes.length; i++) {
        if (closestToolbox == null || toolboxes[i].distanceTo(x, y) < closestToolbox.distanceTo(x, y)) {
            closestToolbox = toolboxes[i];
        }
    }
    newCursor.myToolbox = closestToolbox;
    if (closestToolbox != null) {
        newCursor.myPurpose = closestToolbox.function;
    }

    //check and set if cursor is in module
    newCursor.myObject = inModules(x, y);
    //check and set if cursor is in toolbox, overrides module
    if (inToolboxes(x, y) != null) {
        for (var i = 0; i < toolboxes.length; i++) {
            if (toolboxes[i].isWithin(x, y) || toolboxes[i].isWithinKeyboard(x, y)) {
                newCursor.myObject = toolboxes[i];
                if (toolboxes[i] == newCursor.myToolbox)
                    i = toolboxes.length;
            }
        }
    }

    er_cursors.push(newCursor);
}

//update cursor position
function touchUpdate(id, x, y) {
    for (var i = 0; i < er_cursors.length; i++) {
        if (er_cursors[i].myId == id) {
            er_cursors[i].myX = x;
            er_cursors[i].myY = y;
        }
    }
}

//remove cursor
function touchRemove(id) {
    removeTouch(id);
}