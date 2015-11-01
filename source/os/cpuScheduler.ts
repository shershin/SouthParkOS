module TSOS{
  export class CPU_Scheduler{
    public cpuCycle: number = 0;
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
