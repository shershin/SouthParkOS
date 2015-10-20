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
        }else if (_Memory.memory[j].length === 2){
          j++;
        }else{
          _Memory.memory[j] += str.charAt(i);
          i++;
        }
      }
      _ProcessControlBlock = new PCB();
      _StdOut.putText("Program loaded at PID:" + _ProcessControlBlock.pid);
      this.printMemory(_Memory.memory);
    }
    public printMemory(arry){
      var inpt = <HTMLInputElement>document.getElementById('taMemLog');
      var str = arry.toString();
      var reString = str.replace(/,/g, " ");
      inpt.value = reString;
    }
  }
}
