function touchAnalyse() {
    for (var i = 0; i < toolboxes.length; i++) {
        toolboxes[i].keyboard.reset();
    }
    for (var i = 0; i < er_cursors.length; i++) {

        //choose on touching toolbox
        if (er_cursors[i].myObject != null &&
            isToolboxes(er_cursors[i].myObject) &&
            er_cursors[i].myPurpose != "dragToolbox" &&
            er_cursors[i].myPurpose != "attractToolbox" &&
            er_cursors[i].myPurpose != "createToolbox") {
            if (er_cursors[i].myObject.isMove(er_cursors[i].myX, er_cursors[i].myY)) {
                er_cursors[i].myPurpose = "dragToolbox";
            } else {
                dbg("select function in toolbox" + er_cursors[i].myObject.user);
                if (er_cursors[i].myObject.isWithin(er_cursors[i].myX, er_cursors[i].myY))
                    er_cursors[i].myObject.select(er_cursors[i].myX, er_cursors[i].myY);
                if (er_cursors[i].myObject.isWithinKeyboard(er_cursors[i].myX, er_cursors[i].myY)) {
                    er_cursors[i].myObject.highlightKeyboard(er_cursors[i].myX, er_cursors[i].myY)
                    if (er_cursors[i].myToolbox.focus != null &&
                        (Date.now() - er_cursors[i].myTime < 500 ||
                            Date.now() - er_cursors[i].myTime > 1500)) {
                        er_cursors[i].myToolbox.focus.keyInput(er_cursors[i].myObject.selectKeyboard(er_cursors[i].myX, er_cursors[i].myY));
                        er_cursors[i].myTime -= 500;
                    }
                }
            }
        } else if (er_cursors[i].myPurpose == "dragToolbox") {
            //drag toolbox
            dragToolbox(er_cursors[i].myObject, er_cursors[i].myX, er_cursors[i].myY);
        } else if (er_cursors[i] != null &&
            er_cursors[i].myPurpose == "add" &&
            isModules(er_cursors[i].myObject) ||
            er_cursors[i].myPurpose == "dragModule") {
            //drag module
            er_cursors[i].myPurpose = "dragModule";
            dragModule(er_cursors[i].myObject, er_cursors[i].myX, er_cursors[i].myY);
        } else if (er_cursors[i].myObject != null &&
            isModules(er_cursors[i].myObject) &&
            er_cursors[i].myPurpose == "link" ||
            er_cursors[i].myPurpose == "linking") {
            //link modules
            if (er_cursors[i].myLink == null) {
                //Create new link
                er_cursors[i].myLink = new link(er_cursors[i].myObject);
                dbg("Create new link");
                er_cursors[i].myPurpose = "linking";
                links.push(er_cursors[i].myLink);
            } else {
                //update link
                linkModule(er_cursors[i].myLink, er_cursors[i].myX, er_cursors[i].myY);
            }
        } else if (Date.now() - er_cursors[i].myTime > 500 &&
            er_cursors[i].myPurpose != "createToolbox") {
            //toolbox operations
            var count = 0;
            var createToolboxCursor = new Array();
            for (var j = 0; j < er_cursors.length; ++j) {
                if (Date.now() - er_cursors[j].myTime > 500 &&
                    er_cursors[i].distanceTo(er_cursors[j].myX, er_cursors[j].myY) < 120 &&
                    er_cursors[j].myPurpose != "createToolbox" &&
                    er_cursors[j].myPurpose != "linking" &&
                    er_cursors[j].myPurpose != "dragToolbox") {
                    count++;
                    createToolboxCursor.push(er_cursors[j]);
                }
            }
            //dbg("count =" + count);
            if (count == 3) {

                dbg("Create new toolbox");
                for (var j = 0; j < createToolboxCursor.length; ++j) {
                    createToolboxCursor[j].myPurpose = "createToolbox";
                }
                if (toolboxes.length < 5) {
                    users++;
                    addToolbox(er_cursors[i].myX, er_cursors[i].myY);
                } else {
                    dbg("Max toolboxes reached");
                }
            }
            if (count == 2 && createToolboxCursor[0].myToolbox != null && createToolboxCursor[1].myToolbox != null) {
                dbg("Attract toolbox");
                for (var j = 0; j < createToolboxCursor.length; ++j) {
                    createToolboxCursor[j].myPurpose = "attractToolbox";
                }
                r = Math.atan2(createToolboxCursor[1].myY - createToolboxCursor[0].myY, createToolboxCursor[1].myX - createToolboxCursor[0].myX);
                createToolboxCursor[0].myToolbox.towardTarget(createToolboxCursor[0].myX, createToolboxCursor[0].myY, r);
            }
        }
    }
}

function removeTouch(id) {
    var freshCursors = new Array();
    for (var i = 0; i < er_cursors.length; i++) {
        if (er_cursors[i].myId != id) {
            freshCursors.push(er_cursors[i]);
        }
        else {
            var temptime = er_cursors[i].myTime;
            var tempx = er_cursors[i].myX;
            var tempy = er_cursors[i].myY;
            var templink = er_cursors[i].myLink;
            var temppurpose = er_cursors[i].myPurpose;
            var tempobject = er_cursors[i].myObject;
            var tempToolbox = er_cursors[i].myToolbox;
            if (Date.now() - temptime < 500 &&
                tempobject == null &&
                temppurpose == "add") {
                dbg("touchRemove adding module at " + tempx + "," + tempy);
                addModule(tempx, tempy, tempToolbox.rotation);
            }
            if (temppurpose == "linking" && templink != null) {
                dbg("touchRemove link end module at " + tempx + "," + tempy);

                var tempModule = inModules(tempx, tempy);
                if (tempModule == null) {
                    dbg("End Module not found");
                    templink.removeLink();
                } else {
                    dbg("End Module found");
                    linkEndModule(templink, tempModule);
                }

            }
            if (temppurpose == "edit" &&
                tempobject != null &&
                !isToolboxes(tempobject)) {
                dbg("Focus on module");
                tempToolbox.toggleFocus(tempobject);
            }
            if (temppurpose == "remove" &&
                Date.now() - temptime < 500 &&
                tempobject != null &&
                isModules(tempobject)) {
                dbg("Remove module");
                tempobject.removeModule();
            } else if (temppurpose == "remove" &&
                Date.now() - temptime < 500 &&
                tempobject == null) {
                dbg("Remove link at " + tempx + ", " + tempy);
                var temp = inLink(tempx, tempy);
                if (temp != null)
                    temp.removeLink();
            }
        }
    }
    er_cursors = null;
    er_cursors = freshCursors;
}

function isToolboxes(object) {
    if (object == null)
        return false;
    for (var j = 0; j < toolboxes.length; j++) {
        if (object == toolboxes[j]) {
            return true;
        }
    }
    return false;
}

function isModules(object) {
    if (object == null)
        return false;
    for (var j = 0; j < modules.length; j++) {
        if (object == modules[j]) {
            return true;
        }
    }
    return false;
}

function inModules(x, y) {
    for (var i = 0; i < modules.length; i++) {
        if (modules[i].isWithin(x, y)) {
            return modules[i];
        }
    }
    return null;
}

function inToolboxes(x, y) {
    for (var i = 0; i < toolboxes.length; i++) {
        if (toolboxes[i].isWithin(x, y) || toolboxes[i].isWithinKeyboard(x, y)) {
            return toolboxes[i];
        }
    }
    return null;
}

function inLink(x, y) {
    //dbg("Number of links: "+links.length)
    for (var i = 0; i < links.length; i++) {
        //dbg("Finding link");
        if (links[i].inLine(x,y) && links[i].distanceTo(x, y) < 20)
            return links[i];
    }
    return null;
}