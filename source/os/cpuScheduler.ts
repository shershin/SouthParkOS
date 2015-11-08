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
      if (!_Queue.isEmpty()){
        if (_currentPCB.terminated){
          _currentPCB.updatePCB();
          _currentPCB = _Queue.dequeue();
          _CPU.setCPU(_currentPCB);
        } else {
          _currentPCB.updatePCB();
          _Queue.enqueue(_currentPCB);
          _currentPCB = _Queue.dequeue();
          _CPU.setCPU(_currentPCB);
        }
      }
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
