var TSOS;
(function (TSOS) {
    var residentList = (function () {
        function residentList(pcblist, pcbint) {
            if (pcblist === void 0) { pcblist = []; }
            if (pcbint === void 0) { pcbint = 0; }
            this.pcblist = pcblist;
            this.pcbint = pcbint;
            this.init();
        }
        residentList.prototype.init = function () {
        };
        residentList.prototype.addtoList = function (arg) {
            this.pcblist.push(arg);
            this.pcbint++;
        };
        residentList.prototype.removefromList = function (arg) {
            console.log(arg);
            var spot = this.pcblist.indexOf(arg.pid);
            this.pcblist.splice(spot, 1);
            this.pcbint--;
            console.log(this.pcbint);
        };
        residentList.prototype.getID = function (arg) {
            for (var i = 0; i < this.pcbint; i++) {
                console.log("pcb " + this.pcbint + " i " + i);
                if (this.pcblist[i].pid === arg) {
                    return this.pcblist[i];
                }
            }
            console.log("da fuck is this showing " + this.pcbint);
            _StdOut.putText("Hey Buddy, What you talking aboot.");
            return null;
        };
        residentList.prototype.getAllID = function (arg) {
            for (var i = 0; i < this.pcbint; i++) {
                console.log("allpcb " + this.pcbint + " i " + i);
                if (this.pcblist[i].pid === arg) {
                    return this.pcblist[i];
                }
            }
        };
        residentList.prototype.clearParts = function () {
            var i = 0;
            while (i < this.pcbint) {
                this.removefromList(i);
            }
        };
        return residentList;
    })();
    TSOS.residentList = residentList;
})(TSOS || (TSOS = {}));
