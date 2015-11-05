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
      if (this.cpuCycle >= schedulerTime -1){
        this.switch();
      }
    }
    public switch(){
    }
  }
}
