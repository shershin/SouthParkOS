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
                var tester = TSOS.Utils.fromHex(_hardDrive.hardDriveMem[i]);
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
        return hardDriveDriver;
    })(TSOS.DeviceDriver);
    TSOS.hardDriveDriver = hardDriveDriver;
})(TSOS || (TSOS = {}));
