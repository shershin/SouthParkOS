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
        };
        Cpu.prototype.execute = function (args) {
            console.log(_ProcessControlBlock.progCounter + " " + _Memory.memory[_ProcessControlBlock.progCounter]);
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
                    this.isExecuting = false;
            }
        };
        Cpu.prototype.ldaCon = function () {
            TSOS.Control.hostLog("lda " + _Memory.memory[_ProcessControlBlock.progCounter]);
            _ProcessControlBlock.progCounter++;
            _ProcessControlBlock.accumulater = _Memory.memory[_ProcessControlBlock.progCounter];
        };
        Cpu.prototype.ldaMem = function () {
            var spot1 = _Memory.memory[_ProcessControlBlock.progCounter];
            var spot2 = _Memory.memory[_ProcessControlBlock.progCounter + 1];
            TSOS.Control.hostLog("lda" + " " + spot1 + " " + spot2);
            var swap = TSOS.Utils.littleE(spot1, spot2);
            var dec = TSOS.Utils.fromHex(swap);
            _ProcessControlBlock.accumulater = _Memory.memory[dec];
            _ProcessControlBlock.progCounter++;
            _ProcessControlBlock.progCounter++;
        };
        Cpu.prototype.staMem = function () {
            var spot1 = _Memory.memory[_ProcessControlBlock.progCounter];
            var spot2 = _Memory.memory[_ProcessControlBlock.progCounter + 1];
            TSOS.Control.hostLog("sta" + " " + spot1 + " " + spot2);
            var swap = TSOS.Utils.littleE(spot1, spot2);
            var dec = TSOS.Utils.fromHex(swap);
            _Memory.memory[dec] = _ProcessControlBlock.accumulater;
            _ProcessControlBlock.progCounter++;
            _ProcessControlBlock.progCounter++;
        };
        Cpu.prototype.adc = function () {
            var spot1 = _Memory.memory[_ProcessControlBlock.progCounter];
            var spot2 = _Memory.memory[_ProcessControlBlock.progCounter + 1];
            TSOS.Control.hostLog("adc" + " " + spot1 + " " + spot2);
            var swap = TSOS.Utils.littleE(spot1, spot2);
            var dec = TSOS.Utils.fromHex(swap);
            _ProcessControlBlock.accumulater += dec;
            _ProcessControlBlock.progCounter++;
            _ProcessControlBlock.progCounter++;
        };
        Cpu.prototype.ldxCon = function () {
            TSOS.Control.hostLog("ldx " + _Memory.memory[_ProcessControlBlock.progCounter]);
            _ProcessControlBlock.progCounter++;
            _ProcessControlBlock.xreg = _Memory.memory[_ProcessControlBlock.progCounter];
        };
        Cpu.prototype.ldxMem = function () {
            var spot1 = _Memory.memory[_ProcessControlBlock.progCounter];
            var spot2 = _Memory.memory[_ProcessControlBlock.progCounter + 1];
            TSOS.Control.hostLog("ldx" + " " + spot1 + " " + spot2);
            var swap = TSOS.Utils.littleE(spot1, spot2);
            var dec = TSOS.Utils.fromHex(swap);
            _ProcessControlBlock.xreg = _Memory.memory[dec];
            _ProcessControlBlock.progCounter++;
            _ProcessControlBlock.progCounter++;
        };
        Cpu.prototype.ldyCon = function () {
            TSOS.Control.hostLog("ldy " + _Memory.memory[_ProcessControlBlock.progCounter]);
            _ProcessControlBlock.progCounter++;
            _ProcessControlBlock.yreg = _Memory.memory[_ProcessControlBlock.progCounter];
        };
        Cpu.prototype.ldyMem = function () {
            var spot1 = _Memory.memory[_ProcessControlBlock.progCounter];
            var spot2 = _Memory.memory[_ProcessControlBlock.progCounter + 1];
            TSOS.Control.hostLog("ldy" + " " + spot1 + " " + spot2);
            var swap = TSOS.Utils.littleE(spot1, spot2);
            var dec = TSOS.Utils.fromHex(swap);
            _ProcessControlBlock.yreg = _Memory.memory[dec];
            _ProcessControlBlock.progCounter++;
            _ProcessControlBlock.progCounter++;
        };
        Cpu.prototype.nop = function () {
            TSOS.Control.hostLog("no operation");
        };
        Cpu.prototype.brk = function () {
            TSOS.Control.hostLog("coffee break");
            this.isExecuting = false;
        };
        Cpu.prototype.cpx = function () {
            var spot1 = _Memory.memory[_ProcessControlBlock.progCounter];
            var spot2 = _Memory.memory[_ProcessControlBlock.progCounter + 1];
            TSOS.Control.hostLog("cpx" + " " + spot1 + " " + spot2);
            var swap = TSOS.Utils.littleE(spot1, spot2);
            var dec = TSOS.Utils.fromHex(swap);
            if (_ProcessControlBlock.xreg === _Memory.memory[dec]) {
                _ProcessControlBlock.zflag = 0;
            }
            else {
                _ProcessControlBlock.zflag = 1;
            }
            _ProcessControlBlock.progCounter++;
            _ProcessControlBlock.progCounter++;
        };
        Cpu.prototype.bne = function () {
            var spot1 = _Memory.memory[_ProcessControlBlock.progCounter];
            TSOS.Control.hostLog("bne" + " " + spot1);
            if (_ProcessControlBlock.zflag === 0) {
                _ProcessControlBlock.progCounter = spot1;
            }
            else {
                _ProcessControlBlock.progCounter++;
            }
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
            _ProcessControlBlock.progCounter++;
            _ProcessControlBlock.progCounter++;
        };
        Cpu.prototype.sys = function () {
            if (_ProcessControlBlock.xreg === 1) {
                _StdOut.putText(_ProcessControlBlock.yreg);
                console.log(_ProcessControlBlock.yreg);
            }
            else if (_ProcessControlBlock.xreg === 2) {
                var loc = _ProcessControlBlock.yreg;
                var hex = _Memory.memory[loc];
                var str = TSOS.Utils.stringHex(str);
                _StdOut.putText(str);
                console.log(str);
            }
        };
        return Cpu;
    })();
    TSOS.Cpu = Cpu;
})(TSOS || (TSOS = {}));
