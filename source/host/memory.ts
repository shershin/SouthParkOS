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
      var x = 0
      while (i < str.length){
        if (x = 2){
          j++;
          x = 0;
        }
        if (str.charAt(i) == " "){
          j++;
          i++;
        }else{
          this.memory[j] += str.charAt(i);
          i++;
          x++;
        }
      }
      _StdOut.putText("Program loaded at PID:" + this.pidint);
      this.pid[this.pidint] = this.memory;
      this.pidint ++;

    }

  }
}
