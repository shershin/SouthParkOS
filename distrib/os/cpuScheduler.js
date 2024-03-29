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
            if (this.cpuCycle >= schedulerTime && (schedule === "fcfs" || schedule === "rr")) {
                this.quantumSwitch();
            }
            else if (_currentPCB.proccessState === 'terminated' && (schedule === "fcfs" || schedule === "rr")) {
                this.quantumSwitch();
            }
            if (this.cpuCycle >= schedulerTime && (schedule === "priority")) {
                this.prioSwitch();
            }
            else if (_currentPCB.proccessState === 'terminated' && (schedule === "priority")) {
                this.prioSwitch();
            }
        };
        CPU_Scheduler.prototype.quantumSwitch = function () {
            _currentPCB.updatePCB();
            if (!_Queue.isEmpty()) {
                if (_hdDriver.pgmFinder()) {
                    var base = _currentPCB.base;
                    var limit = _currentPCB.limit;
                    var part = _currentPCB.partition;
                    var oldpgm = _MemoryManager.readFromMem(_currentPCB);
                    var pid = TSOS.Utils.stripper(hdPgm);
                    var str = sessionStorage.getItem(hdPgm);
                    var resPcb = _resList.getID(pid);
                    TSOS.Utils.pcFix(resPcb);
                    resPcb.base = base;
                    resPcb.limit = limit;
                    resPcb.partition = part;
                    resPcb.loc = "memory";
                    resPcb.proccessState = "waiting";
                    _MemoryManager.memload(str, part);
                    console.log("str " + str + " oldpgm " + oldpgm);
                    _Queue.enqueue(resPcb);
                    _hdDriver.deletePgm(hdPgm);
                    if (_currentPCB.proccessState === 'terminated') {
                        _currentPCB = _Queue.dequeue();
                        _currentPCB.proccessState = 'running';
                    }
                    else {
                        _currentPCB.proccessState = 'waiting';
                        _hdDriver.createPgm("pid" + _currentPCB.pid, oldpgm);
                        _currentPCB.loc = "harddrive";
                        _currentPCB = _Queue.dequeue();
                        if (_currentPCB.proccessState === 'terminated') {
                            this.quantumSwitch();
                        }
                        _currentPCB.proccessState = 'running';
                    }
                }
                else {
                    if (_currentPCB.proccessState === 'terminated') {
                        _currentPCB = _Queue.dequeue();
                        _currentPCB.proccessState = 'running';
                    }
                    else {
                        _currentPCB.proccessState = 'waiting';
                        _Queue.enqueue(_currentPCB);
                        _currentPCB = _Queue.dequeue();
                        if (_currentPCB.proccessState === 'terminated') {
                            this.quantumSwitch();
                        }
                        _currentPCB.proccessState = 'running';
                    }
                }
            }
            _CPU.setCPU(_currentPCB);
            this.cpuCycle = 0;
            this.finished();
        };
        CPU_Scheduler.prototype.prioSwitch = function () {
            if (!_Queue.isEmpty()) {
                if (_hdDriver.pgmFinder()) {
                    var stripper = TSOS.Utils.stripper(hdPgm);
                    var resPcb = _resList.getID(stripper);
                    var peekPcb = _Queue.peek(0);
                    if (_currentPCB.priority > resPcb.priority) {
                    }
                    else if (_currentPCB.proccessState === 'terminated') {
                        var base = _currentPCB.base;
                        var limit = _currentPCB.limit;
                        var part = _currentPCB.partition;
                        var pid = TSOS.Utils.stripper(hdPgm);
                        var str = sessionStorage.getItem(hdPgm);
                        var clean = str.replace(/,/g, "");
                        var resPcb = _resList.getID(pid);
                        TSOS.Utils.pcFix(resPcb);
                        resPcb.base = base;
                        resPcb.limit = limit;
                        resPcb.partition = part;
                        resPcb.loc = "memory";
                        console.log(sessionStorage.getItem(hdPgm));
                        resPcb.proccessState = "waiting";
                        _MemoryManager.memload(clean, part);
                        _Queue.enqueue(resPcb);
                        _hdDriver.deletePgm(hdPgm);
                        _currentPCB = _Queue.dequeue();
                        _currentPCB.proccessState = 'running';
                    }
                    else if (_currentPCB.priority > peekPcb.priority) {
                        _currentPCB.proccessState = 'waiting';
                        _Queue.enqueue(_currentPCB);
                        _currentPCB = _Queue.dequeue();
                    }
                }
                else {
                    if (_currentPCB.proccessState === 'terminated') {
                        _currentPCB = _Queue.dequeue();
                        _currentPCB.proccessState = 'running';
                    }
                    else if (_currentPCB.priority > peekPcb.priority) {
                        _currentPCB.proccessState = 'waiting';
                        _Queue.enqueue(_currentPCB);
                        _currentPCB = _Queue.dequeue();
                    }
                }
            }
            _CPU.setCPU(_currentPCB);
            this.cpuCycle = 0;
            this.finished();
        };
        CPU_Scheduler.prototype.finished = function () {
            if (_Queue.isEmpty() && _currentPCB.proccessState === 'terminated') {
                _CPU.isExecuting = false;
            }
        };
        return CPU_Scheduler;
    })();
    TSOS.CPU_Scheduler = CPU_Scheduler;
})(TSOS || (TSOS = {}));
