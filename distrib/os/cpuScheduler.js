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
            _currentPCB.updatePCB();
            if (!_Queue.isEmpty()) {
                if (_currentPCB.terminated) {
                    console.log("terminated");
                    console.log("old pid: " + _currentPCB.pid);
                    _currentPCB = _Queue.dequeue();
                    console.log("new pid: " + _currentPCB.pid);
                }
                else {
                    console.log("not terminated");
                    console.log("old pid: " + _currentPCB.pid);
                    _Queue.enqueue(_currentPCB);
                    _currentPCB = _Queue.dequeue();
                    console.log("new pid: " + _currentPCB.pid);
                }
            }
            _CPU.setCPU();
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
