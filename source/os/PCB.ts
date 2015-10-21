module TSOS {
  export class PCB {

    public static pidint = 0;

    constructor(
      public pid : number= 0,
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
    public incerPC(): void{
          this.progCounter++;
          _CPU.PC++;
          //If PC excedes memory size, wrap-around to start of memory
          if(this.progCounter > mem_size - 1){
            this.progCounter = 0;
            _CPU.PC = 0;
          }
        }
 }
}
