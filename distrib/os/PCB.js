var TSOS;
(function (TSOS) {
    var PCB = (function () {
        function PCB() {
            this.pid = 0;
            this.xreg = 0;
            this.yreg = 0;
            this.zflag = 0;
            this.progCounter = 0;
            this.pidArray = [];
            this.accumulater = 0;
            this.pidToRun = 0;
        }
        PCB.prototype.newPCB = function (arry) {
            this.pidArray[this.pid] = arry;
            this.pid++;
        };
        return PCB;
    })();
    TSOS.PCB = PCB;
})(TSOS || (TSOS = {}));
