///<reference path="../globals.ts" />

module TSOS {
  export class residentList{
    constructor(
                public pcblist = [],
                public pcbint = 0
              ){
                this.init();
              }
    public init(){

    }
    //adds the arg to the resident list
    public addtoList(arg){
      this.pcblist.push(arg);
      this.pcbint++;
    }
    //removes the arg from the resident list
    public removefromList(arg){
      console.log(arg);
      var spot = this.pcblist.indexOf(arg.pid);
      this.pcblist.splice(spot, 1);
      this.pcbint--;
      console.log(this.pcbint);
    }
    //quickly we must find the id search the list search it fast
    public getID(arg): PCB{
      var num = Number(arg);
      for (var i = 0; i<this.pcbint; i++){
        //console.log("pcb " + this.pcbint + " i " + i + " arg " + num);
        if (this.pcblist[i].pid === num){
          return this.pcblist[i];
        }
      }
      console.log("da fuck is this showing " + this.pcbint);
      _StdOut.putText("Hey Buddy, What you talking aboot.");
    }

    //clear out the parts in hope to be able to load again
    public clearParts(){
      this.pcbint = 0;
      this.pcblist = [];
    }
    }
}
