module TSOS {
  export class PCB {
    public pid = 0;
    public xreg = 0;
    public yreg = 0;
    public zflag = 0;
    public progCounter = 0;
    public pidArray = [];
    public accumulater = 0;
    public pidToRun = 0;

  public newPCB(arry){
    this.pidArray[this.pid] = arry;
    this.pid++;
  }
 }
}
