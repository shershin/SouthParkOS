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
      }
      if (_currentPCB.terminated){
        this.switch();
      }
    }
    public switch(){
      _currentPCB.updatePCB();
      if (!_Queue.isEmpty()){
        if (_currentPCB.terminated){
          console.log("terminated");
          console.log("old pid: " + _currentPCB.pid);
          _currentPCB = _Queue.dequeue();
          console.log("new pid: " + _currentPCB.pid);
        } else {
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
    }
    public finished(){
      if (_Queue.isEmpty() && _currentPCB.terminated){
        _CPU.isExecuting = false;
        _currentPCB = null;
      }
    }
  }
}
