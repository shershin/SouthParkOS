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
            console.log(args + " " + base + " " + limit + " out of bounds");
            if (_ProcessControlBlock.progCounter < base || _ProcessControlBlock.progCounter > limit) {
                var mess = "Memory out of bounds";
                _Kernel.krnTrapError(mess);
            }
        };
        MemoryManager.prototype.memPart = function () {
            for (var i = 0; i < 3; i++) {
                if (this.part[i] === null || this.part[i] === undefined) {
                    this.part[i] = _ProcessControlBlock.pid;
                    switch (i) {
                        case 0:
                            _ProcessControlBlock.base = 0;
                            _ProcessControlBlock.limit = 255;
                            break;
                        case 1:
                            _ProcessControlBlock.base = 256;
                            _ProcessControlBlock.limit = 511;
                            break;
                        case 2:
                            _ProcessControlBlock.base = 512;
                            _ProcessControlBlock.limit = 767;
                            break;
                    }
                    return;
                }
            }
        };
        return MemoryManager;
    })();
    TSOS.MemoryManager = MemoryManager;
})(TSOS || (TSOS = {}));
