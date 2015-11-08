var TSOS;
(function (TSOS) {
    var CPU_Scheduler = (function () {
        function CPU_Scheduler(cpuCycle) {
            if (cpuCycle === void 0) { cpuCycle = 0; }
            this.cpuCycle = cpuCycle;
            this.init();
        }
        CPU_Scheduler.prototype.init = function () {
            this.cpuCycle = 0;
        };
        CPU_Scheduler.prototype.cycle = function () {
            if (this.cpuCycle >= schedulerTime - 1) {
                this.switch();
            }
        };
        CPU_Scheduler.prototype.switch = function () {
        };
        CPU_Scheduler.prototype.finished = function () {
            if (_Queue.isEmpty() && _currentPCB.terminated) {
                _CPU.isExecuting = false;
            }
        };
        return CPU_Scheduler;
    })();
    TSOS.CPU_Scheduler = CPU_Scheduler;
})(TSOS || (TSOS = {}));
