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
      console.log(args + " " + base + " " + limit + " out of bounds");
      if (_ProcessControlBlock.progCounter < base || _ProcessControlBlock.progCounter > limit){
        var mess = "Memory out of bounds";
        _Kernel.krnTrapError(mess);
      }
    }
    public memPart(){
      for (var i = 0; i < 3; i++){
        if (this.part[i] === null || this.part[i] === undefined){
          this.part[i] = _ProcessControlBlock.pid;
          switch (i){
            case 0:
              _ProcessControlBlock.base = 0;
              _ProcessControlBlock.limit = 255;
              break;
            case 1:
              _ProcessControlBlock.base = 256;
              _ProcessControlBlock.limit = 511;
              break;
            case 2:
              _ProcessControlBlock.base = 512;
              _ProcessControlBlock.limit = 767;
              break;
          }
          return;
        } 
      }
    }
  }
}
