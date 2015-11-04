var TSOS;
(function (TSOS) {
    var MemoryManager = (function () {
        function MemoryManager() {
            this.part = [];
        }
        MemoryManager.prototype.memload = function (str) {
            this.clearMem();
            var currByte = "";
            var memLoc = 0;
            for (var i = 0; i < str.length; i++) {
                currByte = currByte + str[i];
                if (currByte.length > 1) {
                    _Memory.memory[memLoc] = currByte;
                    memLoc++;
                    currByte = "";
                }
            }
            TSOS.Control.memoryTable();
            _StdOut.putText("Program loaded at PID: " + _ProcessControlBlock.pid);
            this.memPart();
        };
        MemoryManager.prototype.clearMem = function () {
            _Memory.memory = [];
        };
        MemoryManager.outofBounds = function (args, base, limit) {
            if (_ProcessControlBlock.progCounter < base || _ProcessControlBlock.progCounter > limit) {
                var mess = "Memory out of bounds";
                _Kernel.krnTrapError(mess);
            }
        };
        MemoryManager.prototype.memPart = function () {
            var i = 0;
            while (i < 4) {
                if (this.part[i] != null) {
                    i++;
                }
                else {
                    this.part[i] = _ProcessControlBlock.pid;
                }
            }
        };
        return MemoryManager;
    })();
    TSOS.MemoryManager = MemoryManager;
})(TSOS || (TSOS = {}));
