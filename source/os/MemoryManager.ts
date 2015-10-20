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
                    console.log(currByte);
                    memLoc++;
                    currByte = "";
                }
            }
            _MemoryManager.printMemory(_Memory.memory.toString());
            _StdOut.putText("Program loaded at PID: " + _ProcessControlBlock.pid);
        }
    public printMemory(arry){
      var inpt = <HTMLInputElement>document.getElementById('taMemLog');
      var str = arry.toString();
      var reString = str.replace(/,/g, " ");
      inpt.value = str;
    }
    public clearMem(){
      _Memory.memory = [];
    }
  }
}
