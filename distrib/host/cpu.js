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
            this.execute(_ProcessControlBlock.pidArray[_ProcessControlBlock.pidToRun], _Memory.memory[_ProcessControlBlock.progCounter].toString());
        };
        Cpu.prototype.execute = function (arry, args) {
            _ProcessControlBlock.progCounter++;
            var caps = args.toUpperCase();
            switch (caps) {
                case "A9":
                    this.ldaCon();
                    break;
                case "AD":
                    this.ldaMem();
                    break;
                case "8D":
                    this.staMem();
                    break;
                case "6D":
                    this.adc();
                    break;
                case "A2":
                    this.ldxCon();
                    break;
                case "AE":
                    this.ldxMem();
                    break;
                case "A0":
                    this.ldaCon();
                    break;
                case "AC":
                    this.ldaMem();
                    break;
                case "EA":
                    this.nop();
                    break;
                case "00":
                    this.brk();
                    break;
                case "EC":
                    this.cpx();
                    break;
                case "D0":
                    this.bne();
                    break;
                case "EE":
                    this.inc();
                    break;
                case "FF":
                    this.sys();
                    break;
                default:
                    _StdOut.putText("Ummmm this is weird....now what do we do");
            }
        };
        Cpu.prototype.ldaCon = function () {
            TSOS.Control.hostLog("lda");
            _ProcessControlBlock.progCounter++;
            _ProcessControlBlock.accumulater = _Memory.memory[_ProcessControlBlock.progCounter];
        };
        Cpu.prototype.ldaMem = function () {
        };
        Cpu.prototype.staMem = function () {
        };
        Cpu.prototype.adc = function () {
        };
        Cpu.prototype.ldxCon = function () {
        };
        Cpu.prototype.ldxMem = function () {
        };
        Cpu.prototype.ldyCon = function () {
        };
        Cpu.prototype.ldyMem = function () {
        };
        Cpu.prototype.nop = function () {
        };
        Cpu.prototype.brk = function () {
        };
        Cpu.prototype.cpx = function () {
        };
        Cpu.prototype.bne = function () {
        };
        Cpu.prototype.inc = function () {
        };
        Cpu.prototype.sys = function () {
        };
        return Cpu;
    })();
    TSOS.Cpu = Cpu;
})(TSOS || (TSOS = {}));
