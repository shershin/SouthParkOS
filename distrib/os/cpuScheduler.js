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
            console.log("Cycle: " + this.cpuCycle + " time: " + schedulerTime);
            if (this.cpuCycle >= schedulerTime) {
                this.switch();
            }
            if (_currentPCB.terminated) {
                this.switch();
            }
        };
        CPU_Scheduler.prototype.switch = function () {
            if (!_Queue.isEmpty()) {
                if (_currentPCB.terminated) {
                    _currentPCB.updatePCB();
                    _currentPCB = _Queue.dequeue();
                    _CPU.setCPU(_currentPCB);
                }
                else {
                    _currentPCB.updatePCB();
                    _Queue.enqueue(_currentPCB);
                    _currentPCB = _Queue.dequeue();
                    _CPU.setCPU(_currentPCB);
                }
            }
            this.cpuCycle = 0;
            this.finished();
        };
        CPU_Scheduler.prototype.finished = function () {
            if (_Queue.isEmpty() && _currentPCB.terminated) {
                _CPU.isExecuting = false;
                _currentPCB = null;
            }
        };
        return CPU_Scheduler;
    })();
    TSOS.CPU_Scheduler = CPU_Scheduler;
})(TSOS || (TSOS = {}));
