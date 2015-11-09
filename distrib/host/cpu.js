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
            _CpuSched.cycle();
            TSOS.Control.cpuTable();
            TSOS.Control.pcbTable();
            TSOS.Control.memoryTable();
            this.execute();
        };
        Cpu.prototype.execute = function () {
            var holder = _Memory.memory[_currentPCB.progCounter];
            console.log(_currentPCB.progCounter + " " + _Memory.memory[_currentPCB.progCounter]);
            _currentPCB.incerPC();
            _CpuSched.cpuCycle++;
            var caps = holder.toUpperCase();
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
            var spot = _currentPCB.progCounter;
            var grab = TSOS.Utils.grabberOne(spot);
            var dec = TSOS.Utils.fromHex(grab);
            this.Acc = dec;
            TSOS.Control.hostLog("lda " + grab);
            _currentPCB.incerPC();
        };
        Cpu.prototype.ldaMem = function () {
            var grab2 = TSOS.Utils.grabberTwo();
            var dec = TSOS.Utils.fromHex(grab2);
            var grab = TSOS.Utils.grabberOne(dec);
            var decGrab = TSOS.Utils.fromHex(grab);
            this.Acc = decGrab;
            TSOS.Control.hostLog("lda " + grab2);
            _currentPCB.incerPC();
            _currentPCB.incerPC();
        };
        Cpu.prototype.staMem = function () {
            var grab2 = TSOS.Utils.grabberTwo();
            var dec = TSOS.Utils.fromHex(grab2);
            var hex = TSOS.Utils.toHex(this.Acc);
            _Memory.memory[dec] = hex;
            TSOS.Control.hostLog("sta " + grab2);
            _currentPCB.incerPC();
            _currentPCB.incerPC();
        };
        Cpu.prototype.adc = function () {
            var grab2 = TSOS.Utils.grabberTwo();
            var dec = TSOS.Utils.fromHex(grab2);
            var grab = TSOS.Utils.grabberOne(dec);
            var decGrab = TSOS.Utils.fromHex(grab);
            this.Acc += decGrab;
            TSOS.Control.hostLog("adc " + grab2);
            _currentPCB.incerPC();
            _currentPCB.incerPC();
        };
        Cpu.prototype.ldxCon = function () {
            var spot = _currentPCB.progCounter;
            var grab = TSOS.Utils.grabberOne(spot);
            var dec = TSOS.Utils.fromHex(grab);
            this.Xreg = dec;
            TSOS.Control.hostLog("ldx " + grab);
            _currentPCB.incerPC();
        };
        Cpu.prototype.ldxMem = function () {
            var grab2 = TSOS.Utils.grabberTwo();
            var dec = TSOS.Utils.fromHex(grab2);
            var grab = TSOS.Utils.grabberOne(dec);
            var decGrab = TSOS.Utils.fromHex(grab);
            this.Xreg = decGrab;
            TSOS.Control.hostLog("ldx " + grab2);
            _currentPCB.incerPC();
            _currentPCB.incerPC();
        };
        Cpu.prototype.ldyCon = function () {
            var spot = _currentPCB.progCounter;
            var grab = TSOS.Utils.grabberOne(spot);
            var dec = TSOS.Utils.fromHex(grab);
            this.Yreg = dec;
            TSOS.Control.hostLog("ldy " + grab);
            _currentPCB.incerPC();
        };
        Cpu.prototype.ldyMem = function () {
            var grab2 = TSOS.Utils.grabberTwo();
            var dec = TSOS.Utils.fromHex(grab2);
            var grab = TSOS.Utils.grabberOne(dec);
            var decGrab = TSOS.Utils.fromHex(grab);
            this.Yreg = decGrab;
            TSOS.Control.hostLog("ldy " + grab2);
            _currentPCB.incerPC();
            _currentPCB.incerPC();
        };
        Cpu.prototype.nop = function () {
            TSOS.Control.hostLog("nope nope nope");
            _currentPCB.incerPC();
        };
        Cpu.prototype.brk = function () {
            TSOS.Control.hostLog("Coffee Break");
            _currentPCB.terminated = true;
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
            TSOS.Control.hostLog("cpx " + grab2);
            _currentPCB.incerPC();
            _currentPCB.incerPC();
        };
        Cpu.prototype.bne = function () {
            var spot = _currentPCB.progCounter;
            var grab = TSOS.Utils.grabberOne(spot);
            var dec = TSOS.Utils.fromHex(grab);
            var i = 0;
            if (this.Zflag === 0) {
                while (i < dec) {
                    _currentPCB.incerPC();
                    i++;
                }
            }
            TSOS.Control.hostLog("bne " + grab);
            _currentPCB.incerPC();
        };
        Cpu.prototype.inc = function () {
            var grab2 = TSOS.Utils.grabberTwo();
            var dec = TSOS.Utils.fromHex(grab2);
            var grab = TSOS.Utils.grabberOne(dec);
            var decGrab = TSOS.Utils.fromHex(grab);
            var final = decGrab + 1;
            var hex = TSOS.Utils.toHex(final);
            _Memory.memory[dec] = hex;
            TSOS.Control.hostLog("inc " + grab2);
            _currentPCB.incerPC();
            _currentPCB.incerPC();
        };
        Cpu.prototype.sys = function () {
            if (this.Xreg === 1) {
                _StdOut.putText("" + this.Yreg);
                console.log("print yreg " + this.Yreg);
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
                console.log("print string " + str);
            }
            else {
                console.log("no means no");
            }
        };
        Cpu.prototype.setCPU = function () {
            this.PC = _currentPCB.progCounter;
            this.Acc = _currentPCB.accumulater;
            this.Xreg = _currentPCB.xreg;
            this.Yreg = _currentPCB.yreg;
            this.Zflag = _currentPCB.zflag;
        };
        return Cpu;
    })();
    TSOS.Cpu = Cpu;
})(TSOS || (TSOS = {}));
