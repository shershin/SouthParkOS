/*/
manage that memory
/*/
module TSOS {
  export class MemoryManager{
    public part = [];
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
            this.memPart();
        }
    public clearMem(){
      _Memory.memory = [];
    }
    public static outofBounds(args, base, limit){
      if (_ProcessControlBlock.progCounter < base || _ProcessControlBlock.progCounter > limit){
        var mess = "Memory out of bounds";
        _Kernel.krnTrapError(mess);
      }
    }
    public memPart(){
      var i : number = 0;
      while (i < 4){
        if (this.part[i] != null){
          i++;
        } else {
          this.part[i] = _ProcessControlBlock.pid;
        }
      }
    }
  }
}
