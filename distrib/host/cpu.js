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
        Cpu.prototype.execute = function (args) {
            var exe = args;
            var i = 0;
            while (i < exe.length) {
                switch (exe[i]) {
                    case "A9":
                        break;
                    case "AD":
                        break;
                    case "8D":
                        break;
                    case "6D":
                        break;
                    case "A2":
                        break;
                    case "AE":
                        break;
                    case "A0":
                        break;
                    case "AC":
                        break;
                    case "EA":
                        break;
                    case "00":
                        break;
                    case "EC":
                        break;
                    case "D0":
                        break;
                    case "EE":
                        break;
                    case "FF":
                        break;
                }
                i++;
            }
        };
        return Cpu;
    })();
    TSOS.Cpu = Cpu;
})(TSOS || (TSOS = {}));
