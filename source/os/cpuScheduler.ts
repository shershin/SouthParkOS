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
      //console.log("Cycle: " + this.cpuCycle + " time: " + schedulerTime);
      if (this.cpuCycle >= schedulerTime && (schedule === "fcfs" || schedule === "rr")){
        this.quantumSwitch();
      } else if (_currentPCB.proccessState === 'terminated' && (schedule === "fcfs" || schedule === "rr")){
        this.quantumSwitch();
      }
      if (this.cpuCycle >= schedulerTime && (schedule === "priority")){
        this.prioSwitch();
      } else if (_currentPCB.proccessState === 'terminated'&& (schedule === "priority")){
        this.prioSwitch();
      }
    }
    public quantumSwitch(){
      _currentPCB.updatePCB();
      //console.log("changer " + _currentPCB.pid + " " + _currentPCB.proccessState);
      if (!_Queue.isEmpty()){
        if (_hdDriver.pgmFinder()){
          //console.log("entering the hard drive");
          var base  = _currentPCB.base;
          var limit = _currentPCB.limit;
          var part = _currentPCB.partition;
          //
          var oldpgm = _MemoryManager.readFromMem(_currentPCB);
          //
          var pid = Utils.stripper(hdPgm);
          var str = sessionStorage.getItem(hdPgm);
          var resPcb = _resList.getID(pid);
          //
          Utils.pcFix(resPcb);
          resPcb.base = base;
          resPcb.limit = limit;
          resPcb.partition = part;
          resPcb.loc = "memory";
          resPcb.proccessState = "waiting";
          _MemoryManager.memload(str, part);
          console.log("str " + str + " oldpgm " + oldpgm);
          _Queue.enqueue(resPcb);
          _hdDriver.deletePgm(hdPgm);
          if (_currentPCB.proccessState === 'terminated'){
            _currentPCB = _Queue.dequeue();
            _currentPCB.proccessState = 'running';
          } else {
            _currentPCB.proccessState = 'waiting';
            _hdDriver.createPgm("pid"+_currentPCB.pid, oldpgm);
            _currentPCB.loc = "harddrive";
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
      if (!_Queue.isEmpty()){
        if (_hdDriver.pgmFinder()){
          var stripper = Utils.stripper(hdPgm);
          var resPcb = _resList.getID(stripper);
          var peekPcb = _Queue.peek(0);
          if (_currentPCB.priority > resPcb.priority){
            //change this to the current pcb
          } else if (_currentPCB.proccessState === 'terminated'){
            //need to roll the program in to the queue
            var base  = _currentPCB.base;
            var limit = _currentPCB.limit;
            var part = _currentPCB.partition;
            //console.log("hdPgm " + hdPgm);
            var pid = Utils.stripper(hdPgm);
            //_MemoryManager.readFromMem(_currentPCB);
            var str = sessionStorage.getItem(hdPgm);
            var clean = str.replace(/,/g, "");
            var resPcb = _resList.getID(pid);
            //console.log(_currentPCB.pid + " Switching " + resPcb.pid);
            Utils.pcFix(resPcb);
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
          } else if (_currentPCB.priority > peekPcb.priority){
            _currentPCB.proccessState = 'waiting';
            _Queue.enqueue(_currentPCB);
            _currentPCB = _Queue.dequeue();
          }
        } else {
          if (_currentPCB.proccessState === 'terminated'){
            _currentPCB = _Queue.dequeue();
            _currentPCB.proccessState = 'running';
          } else if (_currentPCB.priority > peekPcb.priority){
            _currentPCB.proccessState = 'waiting';
            _Queue.enqueue(_currentPCB);
            _currentPCB = _Queue.dequeue();
          }
        }

      }
      _CPU.setCPU(_currentPCB);
      this.cpuCycle = 0;
      this.finished();
      }

    public finished(){
      if (_Queue.isEmpty() && _currentPCB.proccessState === 'terminated'){
        _CPU.isExecuting = false;
        //_currentPCB = null;
        //console.log("finished running");
      }
    }
  }
}
