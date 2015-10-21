var TSOS;
(function (TSOS) {
    var Memory = (function () {
        function Memory(memory) {
            if (memory === void 0) { memory = []; }
            this.memory = memory;
        }
        Memory.prototype.init = function () {
            this.memory = [];
        };
        Memory.outofBounds = function () {
            if (_Memory.memory.length > 512) {
                var mess = "Memory out of bounds";
                _Kernel.krnTrapError(mess);
            }
        };
        return Memory;
    })();
    TSOS.Memory = Memory;
})(TSOS || (TSOS = {}));
