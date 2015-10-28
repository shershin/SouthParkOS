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
            this.execute(_Memory.memory[_ProcessControlBlock.progCounter]);
            TSOS.Control.cpuTable();
            TSOS.Control.memoryTable();
        };
        Cpu.prototype.execute = function (args) {
            console.log(_ProcessControlBlock.progCounter + " " + _Memory.memory[_ProcessControlBlock.progCounter]);
            _ProcessControlBlock.incerPC();
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
                    this.ldyCon();
                    break;
                case "AC":
                    this.ldyMem();
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
                    this.isExecuting = false;
            }
        };
        Cpu.prototype.ldaCon = function () {
            var spot = _ProcessControlBlock.progCounter;
            var grab = TSOS.Utils.grabberOne(spot);
            var dec = TSOS.Utils.fromHex(grab);
            this.Acc = dec;
            _ProcessControlBlock.incerPC();
        };
        Cpu.prototype.ldaMem = function () {
            var grab2 = TSOS.Utils.grabberTwo();
            var dec = TSOS.Utils.fromHex(grab2);
            var grab = TSOS.Utils.grabberOne(dec);
            var decGrab = TSOS.Utils.fromHex(grab);
            this.Acc = decGrab;
            _ProcessControlBlock.incerPC();
            _ProcessControlBlock.incerPC();
        };
        Cpu.prototype.staMem = function () {
            var grab2 = TSOS.Utils.grabberTwo();
            var dec = TSOS.Utils.fromHex(grab2);
            var hex = TSOS.Utils.toHex(this.Acc);
            _Memory.memory[dec] = hex;
            _ProcessControlBlock.incerPC();
            _ProcessControlBlock.incerPC();
        };
        Cpu.prototype.adc = function () {
            var grab2 = TSOS.Utils.grabberTwo();
            var dec = TSOS.Utils.fromHex(grab2);
            var grab = TSOS.Utils.grabberOne(dec);
            var decGrab = TSOS.Utils.fromHex(grab);
            this.Acc += decGrab;
            _ProcessControlBlock.incerPC();
            _ProcessControlBlock.incerPC();
        };
        Cpu.prototype.ldxCon = function () {
            var spot = _ProcessControlBlock.progCounter;
            var grab = TSOS.Utils.grabberOne(spot);
            var dec = TSOS.Utils.fromHex(grab);
            this.Xreg = dec;
            _ProcessControlBlock.incerPC();
        };
        Cpu.prototype.ldxMem = function () {
            var grab2 = TSOS.Utils.grabberTwo();
            var dec = TSOS.Utils.fromHex(grab2);
            var grab = TSOS.Utils.grabberOne(dec);
            var decGrab = TSOS.Utils.fromHex(grab);
            this.Xreg = decGrab;
            _ProcessControlBlock.incerPC();
            _ProcessControlBlock.incerPC();
        };
        Cpu.prototype.ldyCon = function () {
            var spot = _ProcessControlBlock.progCounter;
            var grab = TSOS.Utils.grabberOne(spot);
            var dec = TSOS.Utils.fromHex(grab);
            this.Yreg = dec;
            _ProcessControlBlock.incerPC();
        };
        Cpu.prototype.ldyMem = function () {
            var grab2 = TSOS.Utils.grabberTwo();
            var dec = TSOS.Utils.fromHex(grab2);
            var grab = TSOS.Utils.grabberOne(dec);
            var decGrab = TSOS.Utils.fromHex(grab);
            this.Yreg = decGrab;
            _ProcessControlBlock.incerPC();
            _ProcessControlBlock.incerPC();
        };
        Cpu.prototype.nop = function () {
            _ProcessControlBlock.incerPC();
        };
        Cpu.prototype.brk = function () {
            this.isExecuting = false;
        };
        Cpu.prototype.cpx = function () {
            var grab2 = TSOS.Utils.grabberTwo();
            var dec = TSOS.Utils.fromHex(grab2);
            var grab = TSOS.Utils.grabberOne(dec);
            var decGrab = TSOS.Utils.fromHex(grab);
            if (decGrab === this.Xreg) {
                this.Zflag = 1;
            }
            else {
                this.Zflag = 0;
            }
            _ProcessControlBlock.incerPC();
            _ProcessControlBlock.incerPC();
        };
        Cpu.prototype.bne = function () {
            var spot = _ProcessControlBlock.progCounter;
            var grab = TSOS.Utils.grabberOne(spot);
            var dec = TSOS.Utils.fromHex(grab);
            var i = 0;
            if (this.Zflag === 0) {
                while (i < dec) {
                    _ProcessControlBlock.incerPC();
                    i++;
                }
            }
            _ProcessControlBlock.incerPC();
        };
        Cpu.prototype.inc = function () {
            var grab2 = TSOS.Utils.grabberTwo();
            var dec = TSOS.Utils.fromHex(grab2);
            var grab = TSOS.Utils.grabberOne(dec);
            var decGrab = TSOS.Utils.fromHex(grab);
            var final = decGrab + 1;
            var hex = TSOS.Utils.toHex(final);
            _Memory.memory[dec] = hex;
            _ProcessControlBlock.incerPC();
            _ProcessControlBlock.incerPC();
        };
        Cpu.prototype.sys = function () {
            if (this.Xreg === 1) {
                _StdOut.putText("" + this.Yreg);
            }
            else if (this.Xreg === 2) {
                var loc = this.Yreg;
                var hex = _Memory.memory[loc];
                var str = "";
                var value = loc;
                while (value !== 0) {
                    str += TSOS.Utils.stringHex(TSOS.Utils.fromHex(_Memory.memory[loc]));
                    loc++;
                    value = TSOS.Utils.fromHex(_Memory.memory[loc]);
                }
                _StdOut.putText(str);
            }
            else {
                console.log("no means no");
            }
        };
        return Cpu;
    })();
    TSOS.Cpu = Cpu;
})(TSOS || (TSOS = {}));
