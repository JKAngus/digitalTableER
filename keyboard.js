function keyboard() {
    this.caps = false;
    this.hyphen = false;
    this.enter = false;
    this.space = false;
    this.backspace = false;
    this.n1 = false;
    this.n2 = false;
    this.n3 = false;
    this.n4 = false;
    this.n5 = false;
    this.n6 = false;
    this.n7 = false;
    this.n8 = false;
    this.n9 = false;
    this.n0 = false;
    this.a = false;
    this.b = false;
    this.c = false;
    this.d = false;
    this.e = false;
    this.f = false;
    this.g = false;
    this.h = false;
    this.i = false;
    this.j = false;
    this.k = false;
    this.l = false;
    this.m = false;
    this.n = false;
    this.o = false;
    this.p = false;
    this.q = false;
    this.r = false;
    this.s = false;
    this.t = false;
    this.u = false;
    this.v = false;
    this.w = false;
    this.x = false;
    this.y = false;
    this.z = false;

    this.capped = false;

    this.isWithin = function (x, y) {
        return ((x > -165 &&
            x < 165 &&
            y > 50 &&
            y < 170));
    }

    this.highlight = function (x, y) {
        //dbg("keyboard select");
        this.reset();
        //this.space = true;
        //return " ";
        if (y < 80) {
            if (x < -135) {
                this.n1 = true;
            }
            else if (x < -105) {
                this.n2 = true;
            }
            else if (x < -75) {
                this.n3 = true;
            }
            else if (x < -45) {
                this.n4 = true;
            }
            else if (x < -15) {
                this.n5 = true;
            }
            else if (x < 15) {
                this.n6 = true;
            }
            else if (x < 45) {
                this.n7 = true;
            }
            else if (x < 75) {
                this.n8 = true;
            }
            else if (x < 105) {
                this.n9 = true;
            }
            else if (x < 135) {
                this.n0 = true;
            }
            else if (x < 165) {
                this.backspace = true;
            }
        }
        else if (y < 110) {
            if (x < -120) {
                this.q = true;
            }
            else if (x < -90) {
                this.w = true;
            }
            else if (x < -60) {
                this.e = true;
            }
            else if (x < -30) {
                this.r = true;
            }
            else if (x < 0) {
                this.t = true;
            }
            else if (x < 30) {
                this.y = true;
            }
            else if (x < 60) {
                this.u = true;
            }
            else if (x < 90) {
                this.i = true;
            }
            else if (x < 120) {
                this.o = true;
            }
            else if (x < 150) {
                this.p = true;
            }
        }
        else if (y < 140) {
            if (x < -135) {
                this.caps = true;
            }
            else if (x < -105) {
                this.a = true;
            }
            else if (x < -75) {
                this.s = true;
            }
            else if (x < -45) {
                this.d = true;
            }
            else if (x < -15) {
                this.f = true;
            }
            else if (x < 15) {
                this.g = true;
            }
            else if (x < 45) {
                this.h = true;
            }
            else if (x < 75) {
                this.j = true;
            }
            else if (x < 105) {
                this.k = true;
            }
            else if (x < 135) {
                this.l = true;
            }
            else if (x < 165) {
                this.enter = true;
            }
        }
        else if (y < 170) {
            if (x < -120) {
                this.hyphen = true;
            }
            else if (x < -90) {
                this.z = true;
            }
            else if (x < -60) {
                this.x = true;
            }
            else if (x < -30) {
                this.c = true;
            }
            else if (x < 0) {
                this.v = true;
            }
            else if (x < 30) {
                this.b = true;
            }
            else if (x < 60) {
                this.n = true;
            }
            else if (x < 90) {
                this.m = true;
            }
            else if (x < 165) {
                this.space = true;
            }
        }
    }

    this.select = function (x, y) {
        //dbg("keyboard select");
        this.reset();
        //this.space = true;
        //return " ";
        if (y < 80) {
            if (x < -135) {
                this.n1 = true;
                if (this.capped == true)
                    return "!";
                else
                    return "1";
            }
            else if (x < -105) {
                this.n2 = true;
                if (this.capped == true)
                    return "@";
                else
                    return "2";
            }
            else if (x < -75) {
                this.n3 = true;
                if (this.capped == true)
                    return "#";
                else
                    return "3";
            }
            else if (x < -45) {
                this.n4 = true;
                if (this.capped == true)
                    return "$";
                else
                    return "4";
            }
            else if (x < -15) {
                this.n5 = true;
                if (this.capped == true)
                    return "%";
                else
                    return "5";
            }
            else if (x < 15) {
                this.n6 = true;
                if (this.capped == true)
                    return "^";
                else
                    return "6";
            }
            else if (x < 45) {
                this.n7 = true;
                if (this.capped == true)
                    return "&";
                else
                    return "7";
            }
            else if (x < 75) {
                this.n8 = true;
                if (this.capped == true)
                    return "*";
                else
                    return "8";
            }
            else if (x < 105) {
                this.n9 = true;
                if (this.capped == true)
                    return "(";
                else
                    return "9";
            }
            else if (x < 135) {
                this.n0 = true;
                if (this.capped == true)
                    return ")";
                else
                    return "0";
            }
            else if (x < 165) {
                this.backspace = true;
                return "backspace";
            }
        }
        else if (y < 110) {
            if (x < -120) {
                this.q = true;
                if (this.capped == true)
                    return "Q";
                else
                    return "q";
            }
            else if (x < -90) {
                this.w = true;
                if (this.capped == true)
                    return "W";
                else
                    return "w";
            }
            else if (x < -60) {
                this.e = true;
                if (this.capped == true)
                    return "E";
                else
                    return "e";
            }
            else if (x < -30) {
                this.r = true;
                if (this.capped == true)
                    return "R";
                else
                    return "r";
            }
            else if (x < 0) {
                this.t = true;
                if (this.capped == true)
                    return "T";
                else
                    return "t";
            }
            else if (x < 30) {
                this.y = true;
                if (this.capped == true)
                    return "Y";
                else
                    return "y";
            }
            else if (x < 60) {
                this.u = true;
                if (this.capped == true)
                    return "U";
                else
                    return "u";
            }
            else if (x < 90) {
                this.i = true;
                if (this.capped == true)
                    return "I";
                else
                    return "i";
            }
            else if (x < 120) {
                this.o = true;
                if (this.capped == true)
                    return "O";
                else
                    return "o";
            }
            else if (x < 150) {
                this.p = true;
                if (this.capped == true)
                    return "P";
                else
                    return "p";
            }
        }
        else if (y < 140) {
            if (x < -135) {
                this.caps = true;
                this.capped = !this.capped;
                return "caps";
            }
            else if (x < -105) {
                this.a = true;
                if (this.capped == true)
                    return "A";
                else
                    return "a";
            }
            else if (x < -75) {
                this.s = true;
                if (this.capped == true)
                    return "S";
                else
                    return "s";
            }
            else if (x < -45) {
                this.d = true;
                if (this.capped == true)
                    return "D";
                else
                    return "d";
            }
            else if (x < -15) {
                this.f = true;
                if (this.capped == true)
                    return "F";
                else
                    return "f";
            }
            else if (x < 15) {
                this.g = true;
                if (this.capped == true)
                    return "G";
                else
                    return "g";
            }
            else if (x < 45) {
                this.h = true;
                if (this.capped == true)
                    return "H";
                else
                    return "h";
            }
            else if (x < 75) {
                this.j = true;
                if (this.capped == true)
                    return "J";
                else
                    return "j";
            }
            else if (x < 105) {
                this.k = true;
                if (this.capped == true)
                    return "K";
                else
                    return "k";
            }
            else if (x < 135) {
                this.l = true;
                if (this.capped == true)
                    return "L";
                else
                    return "l";
            }
            else if (x < 165) {
                this.enter = true;
                return "enter";
            }
        }
        else if (y < 170) {
            if (x < -120) {
                this.hyphen = true;
                if (this.capped == true)
                    return "_";
                else
                    return "-";
            }
            else if (x < -90) {
                this.z = true;
                if (this.capped == true)
                    return "Z";
                else
                    return "z";
            }
            else if (x < -60) {
                this.x = true;
                if (this.capped == true)
                    return "X";
                else
                    return "x";
            }
            else if (x < -30) {
                this.c = true;
                if (this.capped == true)
                    return "C";
                else
                    return "c";
            }
            else if (x < 0) {
                this.v = true;
                if (this.capped == true)
                    return "V";
                else
                    return "v";
            }
            else if (x < 30) {
                this.b = true;
                if (this.capped == true)
                    return "B";
                else
                    return "b";
            }
            else if (x < 60) {
                this.n = true;
                if (this.capped == true)
                    return "N";
                else
                    return "n";
            }
            else if (x < 90) {
                this.m = true;
                if (this.capped == true)
                    return "M";
                else
                    return "m";
            }
            else if (x < 165) {
                this.space = true;
                return " ";
            }
        }
    }

    this.init = function(){
        this.capped = false;
    }

    this.reset = function () {
        this.caps = false;
        this.hyphen = false;
        this.enter = false;
        this.space = false;
        this.backspace = false;
        this.n1 = false;
        this.n2 = false;
        this.n3 = false;
        this.n4 = false;
        this.n5 = false;
        this.n6 = false;
        this.n7 = false;
        this.n8 = false;
        this.n9 = false;
        this.n0 = false;
        this.a = false;
        this.b = false;
        this.c = false;
        this.d = false;
        this.e = false;
        this.f = false;
        this.g = false;
        this.h = false;
        this.i = false;
        this.j = false;
        this.k = false;
        this.l = false;
        this.m = false;
        this.n = false;
        this.o = false;
        this.p = false;
        this.q = false;
        this.r = false;
        this.s = false;
        this.t = false;
        this.u = false;
        this.v = false;
        this.w = false;
        this.x = false;
        this.y = false;
        this.z = false;
    }
}

keyboard.prototype.render = function () {
    fill(256);
    stroke(0);
    rect(0, 110, 330, 120);

    textSize(25);
    if (this.n1 == true) {
        fill(200);
    } else {
        fill(256);
    }
    rect(-150, 65, 30, 30);
    fill(0);
    if (this.capped == true)
        text("!", -155, 74);
    else
        text("1", -157, 74);

    if (this.n2 == true) {
        fill(200);
    } else {
        fill(256);
    }
    rect(-120, 65, 30, 30);
    fill(0);
    if (this.capped == true)
        text("@", -131, 74);
    else
        text("2", -127, 74);

    if (this.n3 == true) {
        fill(200);
    } else {
        fill(256);
    }
    rect(-90, 65, 30, 30);
    fill(0);
    if (this.capped == true)
        text("#", -97, 74);
    else
        text("3", -97, 74);

    if (this.n4 == true) {
        fill(200);
    } else {
        fill(256);
    }
    rect(-60, 65, 30, 30);
    fill(0);
    if (this.capped == true)
        text("$", -67, 74);
    else
        text("4", -67, 74);

    if (this.n5 == true) {
        fill(200);
    } else {
        fill(256);
    }
    rect(-30, 65, 30, 30);
    fill(0);
    if (this.capped == true)
        text("%", -39, 74);
    else
        text("5", -37, 74);

    if (this.n6 == true) {
        fill(200);
    } else {
        fill(256);
    }
    rect(0, 65, 30, 30);
    fill(0);
    if (this.capped == true)
        text("^", -7, 74);
    else
        text("6", -7, 74);

    if (this.n7 == true) {
        fill(200);
    } else {
        fill(256);
    }
    rect(30, 65, 30, 30);
    fill(0);
    if (this.capped == true)
        text("&", 23, 74);
    else
        text("7", 23, 74);

    if (this.n8 == true) {
        fill(200);
    } else {
        fill(256);
    }
    rect(60, 65, 30, 30);
    fill(0);
    if (this.capped == true)
        text("*", 53, 74);
    else
        text("8", 53, 74);

    if (this.n9 == true) {
        fill(200);
    } else {
        fill(256);
    }
    rect(90, 65, 30, 30);
    fill(0);
    if (this.capped == true)
        text("(", 83, 74);
    else
        text("9", 83, 74);

    if (this.n0 == true) {
        fill(200);
    } else {
        fill(256);
    }
    rect(120, 65, 30, 30);
    fill(0);
    if (this.capped == true)
        text(")", 113, 74);
    else
        text("0", 113, 74);

    textSize(12);
    if (this.backspace == true) {
        fill(200);
    } else {
        fill(256);
    }
    rect(150, 65, 30, 30);
    fill(0);
    text("back", 138, 70);

    textSize(25);
    if (this.q == true) {
        fill(200);
    } else {
        fill(256);
    }
    rect(-135, 95, 30, 30);
    fill(0);
    if (this.capped == true)
        text("Q", -144, 104);
    else
        text("q", -142, 104);

    if (this.w == true) {
        fill(200);
    } else {
        fill(256);
    }
    rect(-105, 95, 30, 30);
    fill(0);
    if (this.capped == true)
        text("W", -115, 104);
    else
        text("w", -113, 104);

    if (this.e == true) {
        fill(200);
    } else {
        fill(256);
    }
    rect(-75, 95, 30, 30);
    fill(0);
    if (this.capped == true)
        text("E", -82, 104);
    else
        text("e", -82, 104);

    if (this.r == true) {
        fill(200);
    } else {
        fill(256);
    }
    rect(-45, 95, 30, 30);
    fill(0);
    if (this.capped == true)
        text("R", -50, 104);
    else
        text("r", -50, 104);

    if (this.t == true) {
        fill(200);
    } else {
        fill(256);
    }
    rect(-15, 95, 30, 30);
    fill(0);
    if (this.capped == true)
        text("T", -20, 104);
    else
        text("t", -18, 104);

    if (this.y == true) {
        fill(200);
    } else {
        fill(256);
    }
    rect(15, 95, 30, 30);
    fill(0);
    if (this.capped == true)
        text("Y", 8, 104);
    else
        text("y", 8, 104);

    if (this.u == true) {
        fill(200);
    } else {
        fill(256);
    }
    rect(45, 95, 30, 30);
    fill(0);
    if (this.capped == true)
        text("U", 38, 104);
    else
        text("u", 38, 104);

    if (this.i == true) {
        fill(200);
    } else {
        fill(256);
    }
    rect(75, 95, 30, 30);
    fill(0);
    if (this.capped == true)
        text("I", 72, 104);
    else
        text("i", 72, 104);

    if (this.o == true) {
        fill(200);
    } else {
        fill(256);
    }
    rect(105, 95, 30, 30);
    fill(0);
    if (this.capped == true)
        text("O", 98, 104);
    else
        text("o", 98, 104);

    if (this.p == true) {
        fill(200);
    } else {
        fill(256);
    }
    rect(135, 95, 30, 30);
    fill(0);
    if (this.capped == true)
        text("P", 128, 104);
    else
        text("p", 128, 104);

    textSize(12);
    if (this.caps == true) {
        fill(200);
    } else {
        fill(256);
    }
    rect(-150, 125, 30, 30);
    fill(0);
    text("caps", -162, 130);

    textSize(25);
    if (this.a == true) {
        fill(200);
    } else {
        fill(256);
    }
    rect(-120, 125, 30, 30);
    fill(0);
    if (this.capped == true)
        text("A", -127, 134);
    else
        text("a", -127, 134);

    if (this.s == true) {
        fill(200);
    } else {
        fill(256);
    }
    rect(-90, 125, 30, 30);
    fill(0);
    if (this.capped == true)
        text("S", -97, 134);
    else
        text("s", -97, 134);

    if (this.d == true) {
        fill(200);
    } else {
        fill(256);
    }
    rect(-60, 125, 30, 30);
    fill(0);
    if (this.capped == true)
        text("D", -67, 134);
    else
        text("d", -67, 134);

    if (this.f == true) {
        fill(200);
    } else {
        fill(256);
    }
    rect(-30, 125, 30, 30);
    fill(0);
    if (this.capped == true)
        text("F", -34, 134);
    else
        text("f", -34, 134);

    if (this.g == true) {
        fill(200);
    } else {
        fill(256);
    }
    rect(0, 125, 30, 30);
    fill(0);
    if (this.capped == true)
        text("G", -9, 134);
    else
        text("g", -7, 134);

    if (this.h == true) {
        fill(200);
    } else {
        fill(256);
    }
    rect(30, 125, 30, 30);
    fill(0);
    if (this.capped == true)
        text("H", 23, 134);
    else
        text("h", 23, 134);

    if (this.j == true) {
        fill(200);
    } else {
        fill(256);
    }
    rect(60, 125, 30, 30);
    fill(0);
    if (this.capped == true)
        text("J", 55, 134);
    else
        text("j", 57, 134);

    if (this.k == true) {
        fill(200);
    } else {
        fill(256);
    }
    rect(90, 125, 30, 30);
    fill(0);
    if (this.capped == true)
        text("K", 83, 134);
    else
        text("k", 83, 134);

    if (this.l == true) {
        fill(200);
    } else {
        fill(256);
    }
    rect(120, 125, 30, 30);
    fill(0);
    if (this.capped == true)
        text("L", 115, 134);
    else
        text("l", 117, 134);

    textSize(12);
    if (this.enter == true) {
        fill(200);
    } else {
        fill(256);
    }
    stroke(256);
    rect(150, 125, 28, 28);
    stroke(0);
    fill(0);
    text("enter", 136, 130);
    textSize(25);

    if (this.hyphen == true) {
        fill(200);
    } else {
        fill(256);
    }
    rect(-142, 155, 45, 30);
    fill(0);
    textSize(12);
    if (this.capped == true)
        text("_", -143, 160);
    else
        text("-", -143, 160);
    textSize(25);

    if (this.z == true) {
        fill(200);
    } else {
        fill(256);
    }
    rect(-105, 155, 30, 30);
    fill(0);
    if (this.capped == true)
        text("Z", -113, 164);
    else
        text("z", -113, 164);

    if (this.x == true) {
        fill(200);
    } else {
        fill(256);
    }
    rect(-75, 155, 30, 30);
    fill(0);
    if (this.capped == true)
        text("X", -82, 164);
    else
        text("x", -82, 164);

    if (this.c == true) {
        fill(200);
    } else {
        fill(256);
    }
    rect(-45, 155, 30, 30);
    fill(0);
    if (this.capped == true)
        text("C", -52, 164);
    else
        text("c", -52, 164);

    if (this.v == true) {
        fill(200);
    } else {
        fill(256);
    }
    rect(-15, 155, 30, 30);
    fill(0);
    if (this.capped == true)
        text("V", -22, 164);
    else
        text("v", -22, 164);

    if (this.b == true) {
        fill(200);
    } else {
        fill(256);
    }
    rect(15, 155, 30, 30);
    fill(0);
    if (this.capped == true)
        text("B", 8, 164);
    else
        text("b", 8, 164);

    if (this.n == true) {
        fill(200);
    } else {
        fill(256);
    }
    rect(45, 155, 30, 30);
    fill(0);
    if (this.capped == true)
        text("N", 38, 164);
    else
        text("n", 38, 164);

    if (this.m == true) {
        fill(200);
    } else {
        fill(256);
    }
    rect(75, 155, 30, 30);
    fill(0);
    if (this.capped == true)
        text("M", 66, 164);
    else
        text("m", 66, 164);

    textSize(16);
    if (this.space == true) {
        fill(200);
    } else {
        fill(256);
    }
    rect(128, 155, 75, 30);
    fill(0);
    text("space", 108, 160);
}