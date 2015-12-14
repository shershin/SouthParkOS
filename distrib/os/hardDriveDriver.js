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
            while (i < mem_size) {
                if (_hardDrive.hardDriveMem[i] === tester) {
                    return true;
                }
                i++;
            }
        };
        hardDriveDriver.prototype.hdMemClear = function () {
            var i = 0;
            while (i < mem_size) {
                _hardDrive.hDMeta[i] = "0000";
                _hardDrive.hardDriveMem[i] = "";
                i++;
            }
            TSOS.Control.hdTable();
        };
        hardDriveDriver.prototype.fileLoc = function (arg) {
            var i = 0;
            var loc = null;
            var tester = TSOS.Utils.strToHex(arg);
            while (i < mem_size) {
                if (_hardDrive.hardDriveMem[i] === tester) {
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
            var loc = this.openSpot();
            if (loc === null || loc === undefined) {
                _StdOut.putText("Ran into an error please throw computer against wall to fix");
            }
            else {
                var hex = TSOS.Utils.strToHex(arg);
                _hardDrive.hardDriveMem[loc] = hex;
                _hardDrive.hDMeta[loc] = "1000";
            }
            TSOS.Control.hdTable();
        };
        hardDriveDriver.prototype.deleteFile = function (arg) {
            var loc = this.fileLoc(arg);
            _hardDrive.hardDriveMem[loc] = "";
            _hardDrive.hDMeta[loc] = "0000";
            TSOS.Control.hdTable();
        };
        hardDriveDriver.prototype.createPgm = function (arg, pgm) {
            var loc = this.openSpot();
            if (loc === null || loc === undefined) {
                _StdOut.putText("Ran into an error please throw computer against wall to fix");
            }
            else {
                var hex = TSOS.Utils.strToHex(arg);
                _hardDrive.hardDriveMem[loc] = hex;
                _hardDrive.hDMeta[loc] = "1100";
                sessionStorage.setItem(arg, pgm);
            }
            TSOS.Control.hdTable();
        };
        hardDriveDriver.prototype.deletePgm = function (arg) {
            var loc = this.fileLoc(arg);
            _hardDrive.hardDriveMem[loc] = "";
            _hardDrive.hDMeta[loc] = "0000";
            sessionStorage.removeItem(arg);
            TSOS.Control.hdTable();
        };
        hardDriveDriver.prototype.pgmFinder = function () {
            var re = /pid[0-9]/g;
            var i = 0;
            while (i < mem_size) {
                if (_hardDrive.hardDriveMem[i] === "" ||
                    _hardDrive.hardDriveMem[i] === undefined ||
                    _hardDrive.hardDriveMem[i] === null) {
                }
                else {
                    var str = TSOS.Utils.hexToStr(_hardDrive.hardDriveMem[i]);
                    if (re.test(str)) {
                        hdPgm = str;
                        return true;
                    }
                }
                i++;
            }
        };
        return hardDriveDriver;
    })();
    TSOS.hardDriveDriver = hardDriveDriver;
})(TSOS || (TSOS = {}));
