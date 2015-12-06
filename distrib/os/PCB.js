var TSOS;
(function (TSOS) {
    var PCB = (function () {
        function PCB(pid, xreg, yreg, zflag, progCounter, accumulater, base, limit, partition, proccessState, priority, location) {
            if (pid === void 0) { pid = 0; }
            if (xreg === void 0) { xreg = 0; }
            if (yreg === void 0) { yreg = 0; }
            if (zflag === void 0) { zflag = 0; }
            if (progCounter === void 0) { progCounter = 0; }
            if (accumulater === void 0) { accumulater = 0; }
            if (base === void 0) { base = null; }
            if (limit === void 0) { limit = null; }
            if (partition === void 0) { partition = null; }
            if (proccessState === void 0) { proccessState = 'new'; }
            if (priority === void 0) { priority = null; }
            if (location === void 0) { location = null; }
            this.pid = pid;
            this.xreg = xreg;
            this.yreg = yreg;
            this.zflag = zflag;
            this.progCounter = progCounter;
            this.accumulater = accumulater;
            this.base = base;
            this.limit = limit;
            this.partition = partition;
            this.proccessState = proccessState;
            this.priority = priority;
            this.location = location;
            this.init();
        }
        PCB.prototype.init = function () {
            this.pid = PCB.pidint;
            PCB.pidint++;
        };
        PCB.prototype.incerPC = function () {
            this.progCounter++;
            _CPU.PC++;
            if (this.progCounter > this.limit) {
                this.progCounter = this.base;
                _CPU.PC = this.base;
            }
            TSOS.MemoryManager.outofBounds(_currentPCB);
        };
        PCB.prototype.updatePCB = function () {
            this.progCounter = _CPU.PC;
            this.accumulater = _CPU.Acc;
            this.xreg = _CPU.Xreg;
            this.yreg = _CPU.Yreg;
            this.zflag = _CPU.Zflag;
        };
        PCB.prototype.setPart = function (args) {
            this.partition = args;
            this.base = args * mem_size;
            this.limit = (args + 1) * mem_size - 1;
            this.progCounter = this.base;
        };
        PCB.pidint = 0;
        return PCB;
    })();
    TSOS.PCB = PCB;
})(TSOS || (TSOS = {}));
