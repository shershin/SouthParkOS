var TSOS;
(function (TSOS) {
    var CPU_Scheduler = (function () {
        function CPU_Scheduler() {
            this.cpuCycle = 0;
        }
        CPU_Scheduler.prototype.cycle = function () {
            if (this.cpuCycle >= schedulerTime - 1) {
                this.switch();
            }
        };
        CPU_Scheduler.prototype.switch = function () {
        };
        return CPU_Scheduler;
    })();
    TSOS.CPU_Scheduler = CPU_Scheduler;
})(TSOS || (TSOS = {}));
