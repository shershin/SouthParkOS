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
      if (this.cpuCycle >= schedulerTime){
        this.switch();
      } else if (_currentPCB.proccessState === 'terminated'){
        this.switch();
      }
    }
    public switch(){
      _currentPCB.updatePCB();
      if (!_Queue.isEmpty()){
        if (_currentPCB.proccessState === 'terminated'){
          console.log("terminated");
          console.log("old pid: " + _currentPCB.pid);
          _currentPCB = _Queue.dequeue();
          _currentPCB.proccessState = 'running';
          console.log("new pid: " + _currentPCB.pid);
        } else {
          console.log("not terminated");
          console.log("old pid: " + _currentPCB.pid);
          _currentPCB.proccessState = 'waiting';
          _Queue.enqueue(_currentPCB);
          _currentPCB = _Queue.dequeue();
          _currentPCB.proccessState = 'running';
          console.log("new pid: " + _currentPCB.pid);
        }
      }
      _CPU.setCPU(_currentPCB);
      this.cpuCycle = 0;
      this.finished();
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
