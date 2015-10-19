var TSOS;
(function (TSOS) {
    var Memory = (function () {
        function Memory(memory, pid, pidint) {
            if (memory === void 0) { memory = []; }
            if (pid === void 0) { pid = []; }
            if (pidint === void 0) { pidint = 0; }
            this.memory = memory;
            this.pid = pid;
            this.pidint = pidint;
        }
        Memory.prototype.init = function () {
            this.memory = [];
            this.pidint = 0;
            this.pid = [];
        };
        Memory.prototype.memload = function (str) {
            var i = 0;
            var j = 0;
            while (i < str.length) {
                if (str.charAt(i) == ",") {
                    j++;
                    i++;
                }
                else {
                    this.memory[j] += str.charAt(i);
                    i++;
                }
            }
            _ProcessControlBlock = new TSOS.PCB();
            _StdOut.putText("Program loaded at PID:" + _ProcessControlBlock.pid);
            _ProcessControlBlock.newPCB(this.memory);
        };
        return Memory;
    })();
    TSOS.Memory = Memory;
})(TSOS || (TSOS = {}));
