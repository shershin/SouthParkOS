var TSOS;
(function (TSOS) {
    var hardDrive = (function () {
        function hardDrive(hardDriveMem, hDMeta) {
            if (hardDriveMem === void 0) { hardDriveMem = []; }
            if (hDMeta === void 0) { hDMeta = []; }
            this.hardDriveMem = hardDriveMem;
            this.hDMeta = hDMeta;
        }
        hardDrive.prototype.init = function () {
            this.hardDriveMem = [];
            this.hDMeta = [];
        };
        return hardDrive;
    })();
    TSOS.hardDrive = hardDrive;
})(TSOS || (TSOS = {}));
