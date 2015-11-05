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
            return this.pcblist.indexOf(arg);
        };
        return residentList;
    })();
    TSOS.residentList = residentList;
})(TSOS || (TSOS = {}));
