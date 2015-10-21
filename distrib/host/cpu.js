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
        };
        Cpu.prototype.execute = function (args) {
            console.log(_ProcessControlBlock.progCounter + " " + _Memory.memory[_ProcessControlBlock.progCounter]);
            _ProcessControlBlock.incerPC();
            var caps = args;
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
            var dec = TSOS.Utils.fromHex(_Memory.memory[_ProcessControlBlock.progCounter]);
            TSOS.Control.hostLog("lda " + _Memory.memory[_ProcessControlBlock.progCounter]);
            _ProcessControlBlock.accumulater = dec;
            _ProcessControlBlock.incerPC();
        };
        Cpu.prototype.ldaMem = function () {
            var spot1 = _Memory.memory[_ProcessControlBlock.progCounter];
            var spot2 = _Memory.memory[_ProcessControlBlock.progCounter + 1];
            TSOS.Control.hostLog("lda" + " " + spot1 + " " + spot2);
            var swap = TSOS.Utils.littleE(spot1, spot2);
            var dec = TSOS.Utils.fromHex(swap);
            _ProcessControlBlock.accumulater = _Memory.memory[dec];
            _ProcessControlBlock.incerPC();
            _ProcessControlBlock.incerPC();
        };
        Cpu.prototype.staMem = function () {
            var spot1 = _Memory.memory[_ProcessControlBlock.progCounter];
            var spot2 = _Memory.memory[_ProcessControlBlock.progCounter + 1];
            TSOS.Control.hostLog("sta" + " " + spot1 + " " + spot2);
            var swap = TSOS.Utils.littleE(spot1, spot2);
            var dec = TSOS.Utils.fromHex(swap);
            _Memory.memory[dec] = _ProcessControlBlock.accumulater;
            _ProcessControlBlock.incerPC();
            _ProcessControlBlock.incerPC();
        };
        Cpu.prototype.adc = function () {
            var spot1 = _Memory.memory[_ProcessControlBlock.progCounter];
            var spot2 = _Memory.memory[_ProcessControlBlock.progCounter + 1];
            TSOS.Control.hostLog("adc" + " " + spot1 + " " + spot2);
            var swap = TSOS.Utils.littleE(spot1, spot2);
            var dec = TSOS.Utils.fromHex(swap);
            _ProcessControlBlock.accumulater += dec;
            _ProcessControlBlock.incerPC();
            _ProcessControlBlock.incerPC();
        };
        Cpu.prototype.ldxCon = function () {
            var dec = TSOS.Utils.fromHex(_Memory.memory[_ProcessControlBlock.progCounter]);
            TSOS.Control.hostLog("ldx " + _Memory.memory[_ProcessControlBlock.progCounter]);
            this.Xreg = dec;
            _ProcessControlBlock.incerPC();
        };
        Cpu.prototype.ldxMem = function () {
            var spot1 = _Memory.memory[_ProcessControlBlock.progCounter];
            var spot2 = _Memory.memory[_ProcessControlBlock.progCounter + 1];
            TSOS.Control.hostLog("ldx" + " " + spot1 + " " + spot2);
            var swap = TSOS.Utils.littleE(spot1, spot2);
            var dec = TSOS.Utils.fromHex(swap);
            this.Xreg = _Memory.memory[dec];
            _ProcessControlBlock.incerPC();
            _ProcessControlBlock.incerPC();
        };
        Cpu.prototype.ldyCon = function () {
            var dec = TSOS.Utils.fromHex(_Memory.memory[_ProcessControlBlock.progCounter]);
            TSOS.Control.hostLog("ldy " + _Memory.memory[_ProcessControlBlock.progCounter]);
            this.Yreg = dec;
            _ProcessControlBlock.incerPC();
        };
        Cpu.prototype.ldyMem = function () {
            var spot1 = _Memory.memory[_ProcessControlBlock.progCounter];
            var spot2 = _Memory.memory[_ProcessControlBlock.progCounter + 1];
            TSOS.Control.hostLog("ldy" + " " + spot1 + " " + spot2);
            var swap = TSOS.Utils.littleE(spot1, spot2);
            var dec = TSOS.Utils.fromHex(swap);
            this.Yreg = _Memory.memory[dec];
            _ProcessControlBlock.incerPC();
            _ProcessControlBlock.incerPC();
            console.log(swap + " " + dec);
        };
        Cpu.prototype.nop = function () {
            TSOS.Control.hostLog("no operation");
        };
        Cpu.prototype.brk = function () {
            _ProcessControlBlock.xreg = this.Xreg;
            _ProcessControlBlock.yreg = this.Yreg;
            _ProcessControlBlock.zflag = this.Zflag;
            _ProcessControlBlock.accumulater = this.Acc;
            TSOS.Control.pcbTable(_ProcessControlBlock.pid);
            TSOS.Control.hostLog("coffee break");
            this.isExecuting = false;
        };
        Cpu.prototype.cpx = function () {
            var spot1 = _Memory.memory[_ProcessControlBlock.progCounter];
            var spot2 = _Memory.memory[_ProcessControlBlock.progCounter + 1];
            TSOS.Control.hostLog("cpx" + " " + spot1 + " " + spot2);
            var swap = TSOS.Utils.littleE(spot1, spot2);
            var dec = TSOS.Utils.fromHex(swap);
            if (dec > (mem_size - 1)) {
                dec = dec - mem_size;
            }
            var dec2 = TSOS.Utils.fromHex(_Memory.memory[dec]);
            if (this.Xreg === dec2) {
                this.Zflag = 1;
            }
            else {
                this.Zflag = 0;
            }
            console.log(this.Xreg + " " + dec2 + " " + _ProcessControlBlock.progCounter);
            _ProcessControlBlock.incerPC();
            _ProcessControlBlock.incerPC();
        };
        Cpu.prototype.bne = function () {
            console.log("bne" + this.Zflag);
            var spot1 = _Memory.memory[_ProcessControlBlock.progCounter];
            var dec = TSOS.Utils.fromHex(spot1);
            TSOS.Control.hostLog("bne" + " " + spot1);
            if (this.Zflag === 0) {
                console.log("works " + dec + " " + spot1);
                var i = 0;
                while (i < dec) {
                    _ProcessControlBlock.incerPC();
                    i++;
                }
            }
            _ProcessControlBlock.incerPC();
        };
        Cpu.prototype.inc = function () {
            var spot1 = _Memory.memory[_ProcessControlBlock.progCounter];
            var spot2 = _Memory.memory[_ProcessControlBlock.progCounter + 1];
            TSOS.Control.hostLog("inc" + " " + spot1 + " " + spot2);
            var swap = TSOS.Utils.littleE(spot1, spot2);
            var dec = TSOS.Utils.fromHex(swap);
            var out = _Memory.memory[dec];
            var dec2 = TSOS.Utils.fromHex(out);
            dec2 = dec2 + 1;
            var hex = TSOS.Utils.toHex(dec2);
            _Memory.memory[dec] = hex;
            _ProcessControlBlock.incerPC();
            _ProcessControlBlock.incerPC();
        };
        Cpu.prototype.sys = function () {
            console.log("sys: " + this.Xreg + " " + this.Yreg);
            if (this.Xreg === 1) {
                _StdOut.putText("" + this.Yreg);
                console.log(this.Yreg + "this works mother fucker");
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
                    console.log(str + " " + value + " " + _Memory.memory[loc - 1]);
                }
                _StdOut.putText(str);
                console.log("" + str);
            }
            else {
                console.log("no means no");
            }
        };
        return Cpu;
    })();
    TSOS.Cpu = Cpu;
})(TSOS || (TSOS = {}));
