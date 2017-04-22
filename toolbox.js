function toolbox(x, y) {
    this.user = users;
    this.myX = x;
    this.myY = y;
    this.rotation = 0;
    this.moduleR = 0;
    this.myWidth = 200;
    this.myHeight = 70;
    this.focus = null;
    this.function = "add";
    this.keyboardActivate = false;
    this.keyboard = new keyboard();
    this.alive = true;

    //check if in toolbox
    this.isWithin = function (x, y) {
        push();
        translate(this.myX, this.myY);
        rotate(this.rotation);
        rx = x - this.myX;
        ry = y - this.myY;
        tempx = rx * Math.cos(-this.rotation) - ry * Math.sin(-this.rotation);
        tempy = ry * Math.cos(-this.rotation) + rx * Math.sin(-this.rotation);
        //dbg("rx" + rx + ", ry" + ry);
        //dbg("tempx: " + tempx + ", tempy: " + tempy);
        var temp = ((tempx > - this.myWidth / 2 &&
            tempx < this.myWidth / 2 &&
            tempy > - this.myHeight / 2 &&
            tempy < this.myHeight / 2));
        //!this.isMoveHelper(tempx, tempy));
        //dbg(temp);
        pop();
        return temp;
    }

    //check if in keyboard
    this.isWithinKeyboard = function (x, y) {
        push();
        translate(this.myX, this.myY);
        rotate(this.rotation);
        rx = x - this.myX;
        ry = y - this.myY;
        tempx = rx * Math.cos(-this.rotation) - ry * Math.sin(-this.rotation);
        tempy = ry * Math.cos(-this.rotation) + rx * Math.sin(-this.rotation);
        var temp = false;
        if (this.keyboardActivate) {
            var temp = this.keyboard.isWithin(tempx, tempy);
        }
        pop();
        return temp;
    }

    //check if in taskbar
    this.isMove = function (x, y) {
        push();
        translate(this.myX, this.myY);
        rotate(this.rotation);
        rx = x - this.myX;
        ry = y - this.myY;
        tempx = rx * Math.cos(-this.rotation) - ry * Math.sin(-this.rotation);
        tempy = ry * Math.cos(-this.rotation) + rx * Math.sin(-this.rotation);
        var temp = this.isMoveHelper(tempx, tempy);
        pop();
        return temp;
    }

    this.isMoveHelper = function (x, y) {
        return (x > - this.myWidth / 2 &&
            x < + this.myWidth / 2 - 20 &&
            y > - this.myHeight / 2 &&
            y < - this.myHeight / 2 + 20);
    }

    //update position of toolbox to point.  Also set the rotation of modules based on position
    this.updatePosition = function (x, y) {
        this.myX = x;
        this.myY = y;
        var top = this.distanceTo(960, 0);
        var bottom = this.distanceTo(960, 1080);
        var left = this.distanceTo(0, 540);
        var right = this.distanceTo(1920, 540);
        switch (Math.min(top, bottom, left, right)) {
            case top:
                this.moduleR = Math.PI;
                break;
            case bottom:
                this.moduleR = 0;
                break;
            case left:
                this.moduleR = Math.PI / 2;
                break;
            case right:
                this.moduleR = 3 * Math.PI / 2;
                break;
            default:
                this.moduleR = 0;
        }
    }

    this.distanceTo = function (x, y) {
        //dbg(Math.sqrt((y - this.myY) * (y - this.myY) + (x - this.myX) * (x - this.myX)));
        return Math.sqrt((y - this.myY) * (y - this.myY) + (x - this.myX) * (x - this.myX));
    }

    //set function of the toolbox
    this.select = function (x, y) {
        push();
        translate(this.myX, this.myY);
        rotate(this.rotation);
        rx = x - this.myX;
        ry = y - this.myY;
        tempx = rx * Math.cos(-this.rotation) - ry * Math.sin(-this.rotation);
        tempy = ry * Math.cos(-this.rotation) + rx * Math.sin(-this.rotation);
        if (tempy < this.myHeight / 2) {
            if (tempy < - this.myHeight / 2 + 20 && tempx > + this.myWidth / 2 - 20)
                this.removeToolbox();
            if (tempx < - 50 && tempy > - this.myHeight / 2 + 20) {
                this.function = "add";
                this.keyboardActivate = false;
                this.defocus();
            }
            else if (tempx < 0 && tempy > - this.myHeight / 2 + 20) {
                this.function = "link";
                this.keyboardActivate = false;
                this.defocus();
            }
            else if (tempx > + 50 && tempy > - this.myHeight / 2 + 20) {
                this.function = "remove";
                this.keyboardActivate = false;
                this.defocus();
            }
            else if (tempx > 0 && tempy > - this.myHeight / 2 + 20) {
                this.function = "edit";
                this.keyboard.init();
                this.keyboardActivate = true;
            }
        }
        pop();
    }

    //converts global coordinate to local coordinate and call keyboard's select
    this.selectKeyboard = function (x, y) {
        push();
        translate(this.myX, this.myY);
        rotate(this.rotation);
        rx = x - this.myX;
        ry = y - this.myY;
        tempx = rx * Math.cos(-this.rotation) - ry * Math.sin(-this.rotation);
        tempy = ry * Math.cos(-this.rotation) + rx * Math.sin(-this.rotation);
        var r = this.keyboard.select(tempx, tempy);
        pop();
        return r;
    }

    //converts global coordinate to local coordinate and call keyboard's highlight
    this.highlightKeyboard = function (x, y) {
        push();
        translate(this.myX, this.myY);
        rotate(this.rotation);
        rx = x - this.myX;
        ry = y - this.myY;
        tempx = rx * Math.cos(-this.rotation) - ry * Math.sin(-this.rotation);
        tempy = ry * Math.cos(-this.rotation) + rx * Math.sin(-this.rotation);
        var r = this.keyboard.highlight(tempx, tempy);
        pop();
        return r;
    }

    //rotates to r and move toward point
    this.towardTarget = function (x, y, r) {
        var tempx;
        var tempy;
        tempy = 5 * (y - this.myY) / this.distanceTo(x, y);
        tempx = 5 * (x - this.myX) / this.distanceTo(x, y);

        if (Math.abs(r - this.rotation) > Math.PI / 18)
            if ((0 < r - this.rotation && r - this.rotation < Math.PI) ||
                (0 < r - (this.rotation - 2 * Math.PI) && r - (this.rotation - 2 * Math.PI) < Math.PI))
                this.rotation += Math.PI / 90;
            else
                this.rotation -= Math.PI / 90;
        if (this.rotation > Math.PI)
            this.rotation -= 2 * Math.PI;
        if (this.rotation < -Math.PI)
            this.rotation += 2 * Math.PI;

        //this.rotation = r;
        //dbg(tempx + ", " + tempy);
        this.updatePosition(this.myX + tempx, this.myY + tempy);
    }

    //set the focus of the toolbox to the module and changes focus accordingly
    this.toggleFocus = function (m) {
        if (!this.alive)
            return;
        dbg("Toolbox focus");
        if (this.focus == null) {
            this.focus = m;
            m.toggleFocus(true);
        }
        else if (this.focus == m) {
            this.focus.toggleFocus(false);
            this.focus = null;
        }
        else {
            this.focus.toggleFocus(false);
            this.focus = m;
            m.toggleFocus(true);
        }

        dbg("toolbox focus: " + this.focus);
    }

    //cancels the focus on the module
    this.defocus = function () {
        if (this.focus != null) {
            this.focus.toggleFocus(false);
            this.focus = null;
        }
    }

    //remove the current toolbox and defocus current focus
    this.removeToolbox = function () {
        dbg("RemoveToolbox");
        var freshToolbox = new Array();
        for (var i = 0; i < toolboxes.length; i++) {
            if (toolboxes[i] != this) {
                freshToolbox.push(toolboxes[i]);
            }
        }
        toolboxes = null;
        toolboxes = freshToolbox;
        this.defocus();
        this.alive = false;
    }
}

toolbox.prototype.render = function () {
    push();
    translate(this.myX, this.myY);
    rotate(this.rotation);
    stroke(0);
    fill(200);
    rect(0, 0, this.myWidth, this.myHeight);
    if (this.function == "add")
        fill(200);
    else
        fill(256);
    rect(0 - 75, 10, 50, 50);
    if (this.function == "link")
        fill(200);
    else
        fill(256);
    rect(-25, 10, 50, 50);
    if (this.function == "edit")
        fill(200);
    else
        fill(256);
    rect(25, 10, 50, 50);
    if (this.function == "remove")
        fill(200);
    else
        fill(256);
    rect(75, 10, 50, 50);

    //if (this.keyboardActivate == true) {
    //    this.keyboard.render();
    //}

    fill(0);
    textSize(12);
    text("Toolbox " + this.user, -100, -20);
    text("Add/\nMove", -95, 0);
    text("Link", -45, 0);
    text("Edit", 5, 0);
    text("Remove", 55, 0);
    text("X", 90, -21);
    //text("rotation " + this.rotation / Math.PI, -100, -40);
    pop();
}

function addToolbox(x, y) {
    dbg("Added new toolbox");
    var newToolbox = new toolbox(x, y);
    var top = newToolbox.distanceTo(960, 0);
    var bottom = newToolbox.distanceTo(960, 1080);
    var left = newToolbox.distanceTo(0, 540);
    var right = newToolbox.distanceTo(1920, 540);
    switch (Math.min(top, bottom, left, right)) {
        case top:
            newToolbox.moduleR = Math.PI;
            break;
        case bottom:
            newToolbox.moduleR = 0;
            break;
        case left:
            newToolbox.moduleR = Math.PI / 2;
            break;
        case right:
            newToolbox.moduleR = 3 * Math.PI / 2;
            break;
        default:
            newToolbox.moduleR = 0;
    }
    toolboxes.push(newToolbox);
}

function dragToolbox(object, x, y) {
    dbg("Dragging toolbox");
    object.updatePosition(x, y);
}