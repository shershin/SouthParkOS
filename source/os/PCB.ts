module TSOS {
  export class PCB {

    public static pidint = 0;

    constructor(
      public pid : number= 0,
      public xreg : number = 0,
      public yreg : number= 0,
      public zflag: number = 0,
      public progCounter = 0,
      public accumulater = 0,
      public base : number = 0,
      public limit : number = 0,
      public partition : number = null,
      public priority : number = null,
      public proccessState : string = 'new',
      public loc : string = null,
      public codes = []
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
          if(this.progCounter > this.limit){
            this.progCounter = this.base;
            _CPU.PC = this.base;
          }
          MemoryManager.outofBounds(_currentPCB);
        }
  public updatePCB(){
    this.progCounter = _CPU.PC;
    this.accumulater = _CPU.Acc;
    this.xreg = _CPU.Xreg;
    this.yreg = _CPU.Yreg;
    this.zflag = _CPU.Zflag;
  }

  public setPart(args: number){
      this.partition = args;
      this.base = args * mem_size;
      this.limit = (args + 1) * mem_size - 1;
      this.progCounter = this.base;
  }
 }
}
