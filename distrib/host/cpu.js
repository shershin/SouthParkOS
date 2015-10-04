var TSOS;
(function (TSOS) {
    var Cpu = (function () {
        function Cpu(PC, Acc, Xreg, Yreg, Zflag, isExecuting) {
            if (PC === void 0) { PC = 0; }
            if (Acc === void 0) { Acc = 0; }
            if (Xreg === void 0) { Xreg = 0; }
            if (Yreg === void 0) { Yreg = 0; }
            if (Zflag === void 0) { Zflag = 0; }
            if (isExecuting === void 0) { isExecuting = false; }
            this.PC = PC;
            this.Acc = Acc;
            this.Xreg = Xreg;
            this.Yreg = Yreg;
            this.Zflag = Zflag;
            this.isExecuting = isExecuting;
        }
        Cpu.prototype.init = function () {
            this.PC = 0;
            this.Acc = 0;
            this.Xreg = 0;
            this.Yreg = 0;
            this.Zflag = 0;
            this.isExecuting = false;
        };
        Cpu.prototype.cycle = function () {
            _Kernel.krnTrace('CPU cycle');
        };
        Cpu.prototype.memoryLoad = function (args) {
            var i = 0;
            var j = 0;
            var x = 0;
            while (i < args.length) {
                while (j < 4) {
                    _OsShell.memory[_OsShell.pidInt] = [];
                    while (x < 2) {
                        var con1 = args.charAt(i);
                        var con2 = args.charAt(i + 1);
                        _OsShell.memory[_OsShell.pidInt][j] = con1.concat(con2);
                        i = i + 2;
                    }
                    j = j + 1;
                }
                _OsShell.pidInt = _OsShell.pidInt + 1;
            }
            _StdOut.putText("Program loaded.");
        };
        return Cpu;
    })();
    TSOS.Cpu = Cpu;
})(TSOS || (TSOS = {}));
