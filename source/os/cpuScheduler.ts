module TSOS{
  export class CPU_Scheduler{
    constructor(
      public cpuCycle : number = 0
    ){
      this.init();
    }
    public init(){
      this.cpuCycle = 0;
    }
    public cycle(){
      //check to see if the current cycle is greater than
      //quantum aka schedulerTime and if it is then change program
      console.log("Cycle: " + this.cpuCycle + " time: " + schedulerTime);
      if (this.cpuCycle >= schedulerTime && (schedule === "fcfs" || schedule === "rr")){
        this.quantumSwitch();
      } else if (_currentPCB.proccessState === 'terminated'){
        this.quantumSwitch();
      }
      if (this.cpuCycle >= schedulerTime && (schedule === "priority")){
        this.prioSwitch();
      } else if (_currentPCB.proccessState === 'terminated'){
        this.prioSwitch();
      }
    }
    public quantumSwitch(){
      _currentPCB.updatePCB();

      var re = /[0-9]/g;
      if (!_Queue.isEmpty()){
        if (_hdDriver.pgmFinder("pid"+re)){
          this.rollMem();
          if (_currentPCB.proccessState === 'terminated'){
            _currentPCB = _Queue.dequeue();
            _currentPCB.proccessState = 'running';
          } else {
            _currentPCB.proccessState = 'waiting';
            _hdDriver.createPgm("pid"+_currentPCB.pid, _currentPCB.codes);
            _currentPCB = _Queue.dequeue();
            if (_currentPCB.proccessState === 'terminated'){
              this.quantumSwitch();
            }
            _currentPCB.proccessState = 'running';
          }
        } else {
          //if there is no program in the hard drive
          if (_currentPCB.proccessState === 'terminated'){
            _currentPCB = _Queue.dequeue();
            _currentPCB.proccessState = 'running';
          } else {
            _currentPCB.proccessState = 'waiting';
            _Queue.enqueue(_currentPCB);
            _currentPCB = _Queue.dequeue();
            if (_currentPCB.proccessState === 'terminated'){
              this.quantumSwitch();
            }
            _currentPCB.proccessState = 'running';
          }
        }
      }
      _CPU.setCPU(_currentPCB);
      this.cpuCycle = 0;
      this.finished();
    }

    public prioSwitch(){


    }

    public rollMem(){
      var base  = _currentPCB.base;
      var limit = _currentPCB.limit;
      var part = _currentPCB.partition;

      var pid = Utils.stripper(hdPgm);
      _currentPCB.codes = _MemoryManager.readFromMem(_currentPCB);
      var resPcb = _resList.getID(pid);
      resPcb.base = base;
      resPcb.limit = limit;
      resPcb.partition = part;
      resPcb.codes = sessionStorage.getItem(hdPgm);
      resPcb.proccessState = "waiting";
      _Queue.enqueue(resPcb);
      _hdDriver.deletePgm(hdPgm);
    }

    public finished(){
      if (_Queue.isEmpty() && _currentPCB.proccessState === 'terminated'){
        _CPU.isExecuting = false;
        _currentPCB = null;
        console.log("finished running");
      }
    }
  }
}
