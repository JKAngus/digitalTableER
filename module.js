function module(x, y, r) {
    this.myX = x;
    this.myY = y;
    this.myWidth = 120;
    this.myHeight = 200;
    this.focus = false;
    this.text = "";
    this.cap = false;

    this.isWithin = function (x, y) {
        return (x > this.myX - this.myWidth / 2 &&
            x < this.myX + this.myWidth / 2 &&
            y > this.myY - this.myHeight / 2 &&
            y < this.myY + this.myHeight / 2);
    }

    this.isMove = function (x, y) {
        return (x > this.myX - this.myWidth / 2 &&
            x < this.myX + this.myWidth / 2 &&
            y > this.myY - this.myHeight / 2 &&
            y < this.myY + this.myHeight / 2);
    }

    this.updatePosition = function (x, y) {
        this.myX = x;
        this.myY = y;
    }

    this.toggleFocus = function (b) {
        this.focus = b;
    }

    this.keyInput = function (s) {
        //dbg("input into module text: " + s)
        switch (s) {
            case "backspace":
                this.text = this.text.slice(0, -1);
                break;
            case "enter":
                this.text += "\n";
                break;
            case "caps":
                break;
            default:
                this.text += s;
        }
    }

    this.removeModule = function () {
        var freshModule = new Array();
        for (var i = 0; i < modules.length; i++) {
            if (modules[i] != this) {
                freshModule.push(modules[i]);
            }
        }
        modules = null;
        modules = freshModule;

        var freshLink = new Array();
        for (var i = 0; i < links.length; i++) {
            if (links[i].startModule != this && links[i].endModule != this) {
                freshLink.push(links[i]);
            }
        }
        links = null;
        links = freshLink;
    }
}

module.prototype.render = function () {
    push();
    translate(this.myX, this.myY);
    var closestToolbox = null;
    for (var i = 0; i < toolboxes.length; i++) {
        if (closestToolbox == null || toolboxes[i].distanceTo(this.myX, this.myY) < closestToolbox.distanceTo(this.myX, this.myY)) {
            closestToolbox = toolboxes[i];
        }
    }
    if (closestToolbox != null) {
        //dbg(closestToolbox.moduleR);
        rotate(closestToolbox.moduleR);
    }
    fill(255);
    stroke(0);
    if (this.focus == true)
        strokeWeight(4);
    rect(0, 0, this.myWidth, this.myHeight);
    strokeWeight(1);
    fill(0);
    textSize(15);
    if (this.focus == true)
        text(this.text + "|", 0, 0, this.myWidth - 10, this.myHeight - 10);
    else
        text(this.text, 0, 0, this.myWidth - 10, this.myHeight - 10);
    //dbg(this.text);
    pop();
}

function addModule(x, y) {
    dbg("Added new module");
    var newModule = new module(x, y);
    modules.push(newModule);
}

function dragModule(object, x, y) {
    dbg("Dragging module");
    object.updatePosition(x, y);
}