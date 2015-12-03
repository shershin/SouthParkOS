var TSOS;
(function (TSOS) {
    var hardDrive = (function () {
        function hardDrive(memory) {
            if (memory === void 0) { memory = []; }
            this.memory = memory;
        }
        hardDrive.prototype.init = function () {
            this.memory = [];
        };
        return hardDrive;
    })();
    TSOS.hardDrive = hardDrive;
})(TSOS || (TSOS = {}));
