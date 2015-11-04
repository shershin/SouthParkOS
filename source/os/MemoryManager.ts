/*/
manage that memory
/*/
module TSOS {
  export class MemoryManager{
    public static part = [];
    public memload (str : String){
      var partnum = this.getNextPart();
      if (this.validPart(partnum)){
        var currByte : String = "";
        var memLoc = (mem_size * partnum);
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
        this.setPart(partnum);
      } else {
        _StdOut.putText("Please clear out a partition");
      }
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
    public setPart(arg){
      if (this.validPart(arg)){
        MemoryManager.part[arg] = false;
        _ProcessControlBlock.setPart(arg);
      }
    }
    public validPart(part){
      if(part < 0 || part > 3){
        return false;
      } else {
        return true;
      }
    }
    public getNextPart(){
      for(var i = 0; i < 3; i++){
        if (MemoryManager.part[i] === true || MemoryManager.part[i] === undefined){
          return i;
        }
      }
    }
    }
  }
