///<reference path="../globals.ts" />
/*/
all things memory
/*/

module TSOS {
  export class Memory{
    constructor(
      public memory = []
    ){

    }
    public init (){
      this.memory = [];
    }
    public static outofBounds(){
      if (_Memory.memory.length > 512){
        var mess = "Memory out of bounds";
        _Kernel.krnTrapError(mess);
      }
    }

  }
}
