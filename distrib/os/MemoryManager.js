var TSOS;
(function (TSOS) {
    var MemoryManager = (function () {
        function MemoryManager() {
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
        };
        MemoryManager.prototype.clearMem = function () {
            _Memory.memory = [];
        };
        return MemoryManager;
    })();
    TSOS.MemoryManager = MemoryManager;
})(TSOS || (TSOS = {}));
