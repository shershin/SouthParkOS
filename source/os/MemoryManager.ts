/*/
manage that memory
/*/
module TSOS {
  export class MemoryManager{
    public memload (str: String){
      var i = 0;
      var j = 0;
      while (i < str.length){
        if (str.charAt(i) == ","){
          j++;
          i++;
        }else{
          _Memory.memory[j] += str.charAt(i);
          i++;
        }
      }
      _ProcessControlBlock = new PCB();
      _StdOut.putText("Program loaded at PID:" + _ProcessControlBlock.pid);
      _ProcessControlBlock.newPCB(_Memory.memory);
    }
  }
}
