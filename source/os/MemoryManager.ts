/*/
manage that memory
/*/
module TSOS {
  export class MemoryManager{
    public memload (str){
            var currByte = "";
            var memLoc = 0;
            for (var i = 0; i < str.length; i++) {
                currByte = currByte + str[i];
                if (currByte.length > 1) {
                    _Memory.memory[memLoc] = currByte;
                    memLoc++;
                    currByte = "";
                }
            }
        }
      }
      _ProcessControlBlock = new PCB();
      _StdOut.putText("Program loaded at PID:" + _ProcessControlBlock.pid);
      this.printMemory(_Memory.memory.toString());
    }
    public printMemory(arry){
      var inpt = <HTMLInputElement>document.getElementById('taMemLog');
      var str = arry.toString();
      var reString = str.replace(/,/g, " ");
      inpt.value = reString;
    }
  }
}
