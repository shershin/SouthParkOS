/*/
all things memory
/*/

module TSOS {
  export class Memory{
    public memory = [];
    public pid = [];
    public pidint = 0;
    public memload (str){
      var i = 0;
      var j = 0;
      while (i < str.length){
        if (this.memory[j].value == 2){
          j++;
        }
        if (str.charAt(i) == " "){
          j++;
          i++;
        }else{
          this.memory[j] += str.charAt(i);
          i++;
        }
        if (this.memory.length == 16){
          _StdOut.putText("Program loaded at PID:" + this.pid);
          this.pid[this.pidint] = this.memory;
          this.pidint ++;
        }
      }
    }

  }
}
