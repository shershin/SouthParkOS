/*/
manage that memory
/*/
module TSOS {
  export class MemoryManager{
    public memload (str : String){
      this.clearMem();
            var currByte : String = "";
            var memLoc = 0;
            for (var i = 0; i < str.length; i++) {
                currByte = currByte + str[i];
                if (currByte.length > 1) {
                    _Memory.memory[memLoc] = currByte;
                    memLoc++;
                    currByte = "";
                }
            }
            Control.memoryTable();
            _StdOut.putText("Program loaded at PID: " + _ProcessControlBlock.pid);
        }
    public clearMem(){
      _Memory.memory = [];
    }

  }
}
