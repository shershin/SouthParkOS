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
            var spot = this.pcblist.indexOf(arg);
            this.pcblist.splice(spot, 1);
        };
        residentList.prototype.getID = function (arg) {
            for (var i = 0; i < this.pcbint; i++) {
                console.log("PCB: " + this.pcblist[i].pid);
                if (this.pcblist[i].pid === arg) {
                    return this.pcblist[i];
                }
            }
            console.log("da fuck is this showwing" + this.pcbint);
            _StdOut.putText("Hey Buddy, What you talking aboot.");
            return null;
        };
        return residentList;
    })();
    TSOS.residentList = residentList;
})(TSOS || (TSOS = {}));
