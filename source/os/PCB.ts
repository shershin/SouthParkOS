module TSOS {
  export class PCB {

    public pidint = 0;

    constructor(
      public pid = 0,
      public xreg = 0,
      public yreg = 0,
      public zflag = 0,
      public progCounter = 0,
      public accumulater = 0
    ){
      this.init();
    }
    public init(){
      this.pid = this.pidint;
      this.pidint++;
    }
 }
}
