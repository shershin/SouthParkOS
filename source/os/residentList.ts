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

    public addtoList(arg){
      this.pcblist.push(arg);
      this.pcbint++;
    }

    public removefromList(arg){
      console.log(arg);
      var spot = this.pcblist.indexOf(arg.pid);
      this.pcblist.splice(spot, 1);
      this.pcbint--;
      console.log(this.pcbint);
    }

    public getID(arg): PCB{
      for (var i = 0; i<this.pcbint; i++){
        console.log("pcb " + this.pcbint + " i " + i);
        if (this.pcblist[i].pid === arg){
          return this.pcblist[i];
        }
      }
      console.log("da fuck is this showing " + this.pcbint);
      _StdOut.putText("Hey Buddy, What you talking aboot.");
      return null;
    }
    public getAllID(arg): PCB{
      for (var i = 0; i<this.pcbint; i++){
        console.log("allpcb " + this.pcbint + " i " + i);
        if (this.pcblist[i].pid === arg){
          return this.pcblist[i];
        }
      }
    }
    public clearParts(){
      var i = 0;
      while (i < this.pcbint){
        this.removefromList(i);
      }
    }
    }
}
