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
                    console.log(currByte);
                    memLoc++;
                    currByte = "";
                }
            }
            _MemoryManager.printMemory(_Memory.memory.toString());
            _StdOut.putText("Program loaded at PID: " + _ProcessControlBlock.pid);
        };
        MemoryManager.prototype.printMemory = function (arry) {
            var inpt = document.getElementById('taMemLog');
            var str = arry.toString();
            var reString = str.replace(/,/g, " ");
            inpt.value = str;
        };
        MemoryManager.prototype.clearMem = function () {
            _Memory.memory = [];
        };
        return MemoryManager;
    })();
    TSOS.MemoryManager = MemoryManager;
})(TSOS || (TSOS = {}));
