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
        };
        hardDriveDriver.prototype.nameCheck = function () {
        };
        return hardDriveDriver;
    })(TSOS.DeviceDriver);
    TSOS.hardDriveDriver = hardDriveDriver;
})(TSOS || (TSOS = {}));
