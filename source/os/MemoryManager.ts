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
    //clean that memory clean it out good
    public clearMem(){
      var totalmem = mem_size * 3;
      for (var i = 0; i<totalmem;i++){
        _Memory.memory[i] = "00";
      }
    }
    //how could this program go out of bounds
    public static outofBounds(pcb:PCB){
      if (pcb.progCounter < pcb.base || pcb.progCounter > pcb.limit){
        var mess = "Memory out of bounds";
        _Kernel.krnTrapError(mess);
      }
    }
    //we must set the partition like the homework demands
    public setPart(arg){
      if (this.validPart(arg)){
        MemoryManager.part[arg] = false;
        _ProcessControlBlock.setPart(arg);
      }
    }
    //i wonder if this is a vaild partition
    //--->insert meme here with fry thinking
    public validPart(part){
      if(part < 0 || part > 3){
        return false;
      } else {
        return true;
      }
    }
    //must find empty space
    //says all the marist students when commuting and trying to find a parking spot
    public getNextPart(){
      for(var i = 0; i < partsAllowed; i++){
        if (MemoryManager.part[i] === true || MemoryManager.part[i] === undefined){
          return i;
        }
      }
    }
    //delete the selected part
    public clearPart(args){
        if (this.validPart(args)){
          MemoryManager.part[args] = true;
          console.log("clearning");
        } else {
          console.log("nooooooo");
        }
    }

    public readFromMem(pcb: PCB) : string{
      var pgm = "";
      for (var i = pcb.base; i < mem_size; i++){
        if (_Memory.memory[i] === undefined){
          pgm += "00"
        }else {
          pgm += _Memory.memory[i];  
        }
      }
      console.log("readingMem " + pcb.pid + " base " +  pcb.base + " pgm " + pgm);
      return pgm;
    }

    public readToMem(pcb: PCB){
      console.log(pcb.pid);
      var currByte = "";
      var memLoc = pcb.base;
      for (var i = 0; i < mem_size; i++) {
          currByte = currByte + pcb.codes[i];
          if (currByte.length > 1) {
              _Memory.memory[memLoc] = currByte;
              memLoc++;
              console.log(currByte);
              currByte = "";
          }
      }
    }
    }
  }
