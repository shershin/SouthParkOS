var TSOS;
(function (TSOS) {
    var hardDriveDriver = (function () {
        function hardDriveDriver() {
        }
        hardDriveDriver.prototype.isEmpty = function () {
            var i = 0;
            while (i < mem_size) {
                if (_hardDrive.hDMeta[i] === null ||
                    _hardDrive.hDMeta[i] === undefined ||
                    _hardDrive.hDMeta[i] === "0000") {
                    return true;
                }
                i++;
            }
            return false;
        };
        hardDriveDriver.prototype.nameCheck = function (arg) {
            var i = 0;
            var tester = TSOS.Utils.strToHex(arg);
            console.log("hex test " + tester + " = " + arg);
            while (i < mem_size) {
                if (_hardDrive.hardDriveMem[i] === tester) {
                    console.log(_hardDrive.hardDriveMem[i]);
                    return true;
                }
                i++;
            }
            console.log(_hardDrive.hardDriveMem[0]);
        };
        hardDriveDriver.prototype.hdMemClear = function () {
            var i = 0;
            while (i < mem_size) {
                _hardDrive.hDMeta[i] = "0000";
                _hardDrive.hardDriveMem[i] = "";
                i++;
            }
        };
        hardDriveDriver.prototype.fileLoc = function (arg) {
            var i = 0;
            var loc = null;
            var tester = TSOS.Utils.strToHex(arg);
            console.log("hex test " + tester + " = " + arg);
            while (i < mem_size) {
                if (_hardDrive.hardDriveMem[i] === tester) {
                    console.log(_hardDrive.hardDriveMem[i]);
                    return loc = i;
                }
                i++;
            }
        };
        hardDriveDriver.prototype.openSpot = function () {
            var openSpot = null;
            var i = 0;
            while (i < mem_size) {
                if (_hardDrive.hDMeta[i] === "0000" ||
                    _hardDrive.hDMeta[i] === null ||
                    _hardDrive.hDMeta[i] === undefined) {
                    return openSpot = i;
                }
                i++;
            }
        };
        hardDriveDriver.prototype.createFile = function (arg) {
            console.log("creating file");
            var loc = this.openSpot();
            if (loc === null || loc === undefined) {
                _StdOut.putText("Ran into an error please throw computer against wall to fix");
            }
            else {
                var hex = TSOS.Utils.strToHex(arg);
                console.log("creating " + arg + " " + hex + " in loc " + loc);
                _hardDrive.hardDriveMem[loc] = hex;
                _hardDrive.hDMeta[loc] = "1000";
            }
        };
        hardDriveDriver.prototype.deleteFile = function (arg) {
            var loc = this.fileLoc(arg);
            console.log(loc);
            _hardDrive.hardDriveMem[loc] = "";
            _hardDrive.hDMeta[loc] = "0000";
        };
        hardDriveDriver.prototype.createPgm = function (arg, pgm) {
            console.log("creating file");
            var loc = this.openSpot();
            if (loc === null || loc === undefined) {
                _StdOut.putText("Ran into an error please throw computer against wall to fix");
            }
            else {
                var hex = TSOS.Utils.strToHex(arg);
                console.log("creating " + arg + " " + hex + " in loc " + loc);
                _hardDrive.hardDriveMem[loc] = hex;
                _hardDrive.hDMeta[loc] = "1100";
                sessionStorage.setItem(arg, pgm);
            }
        };
        hardDriveDriver.prototype.deletePgm = function (arg) {
            var loc = this.fileLoc(arg);
            console.log(loc);
            _hardDrive.hardDriveMem[loc] = "";
            _hardDrive.hDMeta[loc] = "0000";
            sessionStorage.removeItem(arg);
        };
        hardDriveDriver.prototype.pgmFinder = function () {
            var re = /([0-9])/g;
            this.nameCheck("pid" + re);
            console.log("this works");
        };
        return hardDriveDriver;
    })();
    TSOS.hardDriveDriver = hardDriveDriver;
})(TSOS || (TSOS = {}));
