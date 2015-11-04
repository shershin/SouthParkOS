var TSOS;
(function (TSOS) {
    var PCB = (function () {
        function PCB(pid, xreg, yreg, zflag, progCounter, accumulater, memStart, base, limit, memslot, isExec) {
            if (pid === void 0) { pid = 0; }
            if (xreg === void 0) { xreg = 0; }
            if (yreg === void 0) { yreg = 0; }
            if (zflag === void 0) { zflag = 0; }
            if (progCounter === void 0) { progCounter = 0; }
            if (accumulater === void 0) { accumulater = 0; }
            if (memStart === void 0) { memStart = 0; }
            if (base === void 0) { base = null; }
            if (limit === void 0) { limit = null; }
            if (memslot === void 0) { memslot = null; }
            if (isExec === void 0) { isExec = false; }
            this.pid = pid;
            this.xreg = xreg;
            this.yreg = yreg;
            this.zflag = zflag;
            this.progCounter = progCounter;
            this.accumulater = accumulater;
            this.memStart = memStart;
            this.base = base;
            this.limit = limit;
            this.memslot = memslot;
            this.isExec = isExec;
            this.init();
        }
        PCB.prototype.init = function () {
            this.pid = PCB.pidint;
            PCB.pidint++;
        };
        PCB.prototype.incerPC = function () {
            this.progCounter++;
            _CPU.PC++;
            if (this.progCounter > mem_size - 1) {
                this.progCounter = 0;
                _CPU.PC = 0;
            }
            TSOS.MemoryManager.outofBounds(this.pid, this.base, this.limit);
        };
        PCB.pidint = 0;
        return PCB;
    })();
    TSOS.PCB = PCB;
})(TSOS || (TSOS = {}));
