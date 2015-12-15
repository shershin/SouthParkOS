var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TSOS;
(function (TSOS) {
    var HardDriveDriver = (function (_super) {
        __extends(HardDriveDriver, _super);
        function HardDriveDriver() {
            _super.call(this, this.hDDriverEntry);
        }
        HardDriveDriver.prototype.hDDriverEntry = function () {
            this.status = "loaded";
        };
        return HardDriveDriver;
    })(TSOS.DeviceDriver);
    TSOS.HardDriveDriver = HardDriveDriver;
})(TSOS || (TSOS = {}));
