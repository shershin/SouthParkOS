var TSOS;
(function (TSOS) {
    var MemoryManager = (function () {
        function MemoryManager() {
        }
        MemoryManager.prototype.memload = function (str) {
            var partnum = this.getNextPart();
            if (this.validPart(partnum)) {
                var currByte = "";
                var memLoc = (mem_size * partnum);
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
                this.setPart(partnum);
            }
            else {
                _StdOut.putText("Please clear out a partition");
            }
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
        MemoryManager.prototype.setPart = function (arg) {
            if (this.validPart(arg)) {
                MemoryManager.part[arg] = false;
                _ProcessControlBlock.setPart(arg);
            }
        };
        MemoryManager.prototype.validPart = function (part) {
            if (part < 0 || part > 3) {
                return false;
            }
            else {
                return true;
            }
        };
        MemoryManager.prototype.getNextPart = function () {
            for (var i = 0; i < 3; i++) {
                if (MemoryManager.part[i] === true || MemoryManager.part[i] === undefined) {
                    return i;
                }
            }
        };
        MemoryManager.part = [];
        return MemoryManager;
    })();
    TSOS.MemoryManager = MemoryManager;
})(TSOS || (TSOS = {}));
