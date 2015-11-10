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
      var spot = this.pcblist.indexOf(arg);
      this.pcblist.splice(spot, 1);
      this.pcbint--;
    }

    public getID(arg): PCB{
      for (var i = 0; i<this.pcbint; i++){
        if (this.pcblist[i].pid === arg){
          return this.pcblist[i];
        }
      }
      console.log("da fuck is this showwing" + this.pcbint);
      _StdOut.putText("Hey Buddy, What you talking aboot.");
      return null;
    }
  }
}
