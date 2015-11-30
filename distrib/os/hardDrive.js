var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TSOS;
(function (TSOS) {
    var HardDrive = (function (_super) {
        __extends(HardDrive, _super);
        function HardDrive() {
            _super.call(this, this.init);
        }
        HardDrive.prototype.init = function () {
        };
        return HardDrive;
    })(TSOS.DeviceDriver);
    TSOS.HardDrive = HardDrive;
})(TSOS || (TSOS = {}));
