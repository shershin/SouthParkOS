module TSOS {
  export class PCB {

    public static pidint = 0;

    constructor(
      public pid = 0,
      public xreg : number = 0,
      public yreg : number= 0,
      public zflag: number = 0,
      public progCounter = 0,
      public accumulater = 0
    ){
      this.init();
    }
    public init(){
      this.pid = PCB.pidint;
      PCB.pidint++;
    }
 }
}
