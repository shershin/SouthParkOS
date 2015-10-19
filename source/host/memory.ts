///<reference path="../globals.ts" />
/*/
all things memory
/*/

module TSOS {
  export class Memory{
    constructor(
      public memory = [],
      public pid = [],
      public pidint = 0
    ){

    }
    public init (){
      this.memory = [];
      this.pidint = 0;
      this.pid = [];
    }
    public memload (str: String){
      var i = 0;
      var j = 0;
      while (i < str.length){
        if (str.charAt(i) == ","){
          j++;
          i++;
        }else{
          this.memory[j] += str.charAt(i);
          i++;
        }
      }
      _ProcessControlBlock = new PCB();
      _StdOut.putText("Program loaded at PID:" + _ProcessControlBlock.pid);
      _ProcessControlBlock.newPCB(this.memory);
    }

  }
}
