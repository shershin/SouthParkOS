var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TSOS;
(function (TSOS) {
    var hardDriveDriver = (function (_super) {
        __extends(hardDriveDriver, _super);
        function hardDriveDriver() {
            _super.call(this, this.hDDriverEntry);
        }
        hardDriveDriver.prototype.hDDriverEntry = function () {
            this.status = "loaded";
        };
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
            while (i < mem_size) {
                var tester = TSOS.Utils.stringHex(_hardDrive.hardDriveMem[i]);
                if (tester === arg) {
                    return true;
                }
            }
            return false;
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
            while (i < mem_size) {
                var tester = TSOS.Utils.stringHex(_hardDrive.hardDriveMem[i]);
                if (tester === arg) {
                    return loc = i;
                }
            }
        };
        hardDriveDriver.prototype.openSpot = function () {
            var openSpot = null;
            var i = 0;
            while (i < mem_size) {
                if (_hardDrive.hDMeta[i] === "0000") {
                    return openSpot = i;
                }
                i++;
            }
        };
        hardDriveDriver.prototype.createFile = function (arg) {
            var loc = this.openSpot();
            var hex = TSOS.Utils.toHex(arg);
            var hexStr = this.addZero(hex);
            _hardDrive.hardDriveMem[loc] = hexStr;
            _hardDrive.hDMeta[loc] = "1000";
        };
        hardDriveDriver.prototype.deleteFile = function (arg) {
            var loc = this.fileLoc(arg);
            var str = this.addZero("");
            _hardDrive.hardDriveMem[loc] = str;
            _hardDrive.hDMeta[loc] = "0000";
        };
        hardDriveDriver.prototype.addZero = function (arg) {
            var i = arg.length;
            var str = arg;
            while (i < 63) {
                str += "0";
                i++;
            }
            return str;
        };
        return hardDriveDriver;
    })(TSOS.DeviceDriver);
    TSOS.hardDriveDriver = hardDriveDriver;
})(TSOS || (TSOS = {}));
