var TSOS;
(function (TSOS) {
    var MemoryManager = (function () {
        function MemoryManager() {
        }
        MemoryManager.prototype.memload = function (str) {
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
        };
        MemoryManager.prototype.printMemory = function (arry) {
            var inpt = document.getElementById('taMemLog');
            var str = arry.toString();
            var reString = str.replace(/,/g, " ");
            inpt.value = str;
        };
        return MemoryManager;
    })();
    TSOS.MemoryManager = MemoryManager;
})(TSOS || (TSOS = {}));
