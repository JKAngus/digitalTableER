function link(s) {
    this.startModule = s;
    this.endModule = null;
    this.tempX = s.myX;
    this.tempY = s.myY;

    this.setTemp = function (x, y) {
        this.tempX = x;
        this.tempY = y;
    }

    this.setEndModule = function (x) {
        this.endModule = x;
    }

    this.distanceTo = function (x, y) {
        var x1 = this.startModule.myX;
        var y1 = this.startModule.myY;
        var x2 = this.endModule.myX;
        var y2 = this.endModule.myY;
        //dbg("x1:" + x1 + " y1:" + y1 + " x2:" + x2 + " y2:" + y2 + " x:" + x + " y:" + y);
        var a = Math.abs((y2 - y1) * x - (x2 - x1) * y + x2 * y1 - y2 * x1);
        var b = Math.sqrt((y2 - y1) * (y2 - y1) + (x2 - x1) * (x2 - x1));
        //dbg("Distance to link: " + a + "/" + b + "=" + a / b);
        return a / b;
    }

    this.inLine = function (x, y) {
        var midX;
        var midY;
        var length;
        if (this.endModule == null) {
            return false;
        } else {
            line(this.startModule.myX, this.startModule.myY, this.endModule.myX, this.endModule.myY);
            midX = (this.endModule.myX + this.startModule.myX) / 2;
            midY = (this.endModule.myY + this.startModule.myY) / 2;
            length = Math.sqrt((this.endModule.myY - this.startModule.myY) * (this.endModule.myY - this.startModule.myY)
                + (this.endModule.myX - this.startModule.myX) * (this.endModule.myX - this.startModule.myX));
        }
        return Math.sqrt((y - midY) * (y - midY) + (x - midX) * (x - midX)) < length / 2;
    }

    this.removeLink = function () {
        var freshLink = new Array();
        for (var i = 0; i < links.length; i++) {
            if (links[i] != this) {
                freshLink.push(links[i]);
            }
        }
        links = null;
        links = freshLink;
    }
}

link.prototype.render = function () {
    stroke(0);
    fill(0);
    textSize(20);
    var midX;
    var midY;
    if (this.endModule == null) {
        line(this.startModule.myX, this.startModule.myY, this.tempX, this.tempY);
        midX = (this.tempX + this.startModule.myX) / 2;
        midY = (this.tempY + this.startModule.myY) / 2;
    } else {
        line(this.startModule.myX, this.startModule.myY, this.endModule.myX, this.endModule.myY);
        midX = (this.endModule.myX + this.startModule.myX) / 2;
        midY = (this.endModule.myY + this.startModule.myY) / 2;
    }

    push();
    translate(midX, midY);
    rotate(Math.atan2(midX - this.startModule.myX, this.startModule.myY - midY));
    rotate(-Math.PI / 2);
    text(">", -7, 7);
    pop();
}

function linkModule(l, x, y) {
    dbg("Linking module");
    l.setTemp(x, y);
}

function linkEndModule(l, m) {
    dbg("Linking End module");

    l.setEndModule(m);
}