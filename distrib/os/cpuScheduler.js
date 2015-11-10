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
            else if (_currentPCB.proccessState === 'terminated') {
                this.switch();
            }
        };
        CPU_Scheduler.prototype.switch = function () {
            _currentPCB.updatePCB();
            if (!_Queue.isEmpty()) {
                if (_currentPCB.proccessState === 'terminated') {
                    _currentPCB = _Queue.dequeue();
                    _currentPCB.proccessState = 'running';
                }
                else {
                    _currentPCB.proccessState = 'waiting';
                    _Queue.enqueue(_currentPCB);
                    _currentPCB = _Queue.dequeue();
                    if (_currentPCB.proccessState === 'terminated') {
                        this.switch();
                    }
                    _currentPCB.proccessState = 'running';
                }
            }
            _CPU.setCPU(_currentPCB);
            this.cpuCycle = 0;
            this.finished();
        };
        CPU_Scheduler.prototype.finished = function () {
            if (_Queue.isEmpty() && _currentPCB.proccessState === 'terminated') {
                _CPU.isExecuting = false;
                _currentPCB = null;
                console.log("finished running");
            }
        };
        return CPU_Scheduler;
    })();
    TSOS.CPU_Scheduler = CPU_Scheduler;
})(TSOS || (TSOS = {}));
