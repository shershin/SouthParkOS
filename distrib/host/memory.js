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
        return Memory;
    })();
    TSOS.Memory = Memory;
})(TSOS || (TSOS = {}));
