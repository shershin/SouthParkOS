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
            _ProcessControlBlock.newPCB(_Memory.memory);
        };
        return MemoryManager;
    })();
    TSOS.MemoryManager = MemoryManager;
})(TSOS || (TSOS = {}));
