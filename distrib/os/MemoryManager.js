var TSOS;
(function (TSOS) {
    var MemoryManager = (function () {
        function MemoryManager() {
        }
        MemoryManager.prototype.memload = function (str) {
            var i = 0;
            var j = 0;
            while (i < str.length) {
                if (str.charAt(i) == ",") {
                    j++;
                    i++;
                }
                else {
                    _Memory.memory[j] += str.charAt(i);
                    i++;
                }
            }
            _ProcessControlBlock = new TSOS.PCB();
            _StdOut.putText("Program loaded at PID:" + _ProcessControlBlock.pid);
            this.printMemory(_Memory.memory);
        };
        MemoryManager.prototype.printMemory = function (arry) {
            var inpt = document.getElementById('taMemLog');
            var str = arry.toString();
            var reString = str.replace(/,/g, " ");
            inpt.value = reString;
        };
        return MemoryManager;
    })();
    TSOS.MemoryManager = MemoryManager;
})(TSOS || (TSOS = {}));
