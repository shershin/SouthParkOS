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
      this.pcblist[this.pcbint] = arg;
      this.pcbint++;
    }

    public removefromList(arg){
      var spot = this.pcblist.indexOf(arg);
      this.pcblist.splice(spot, 1);
    }

    public getID(arg){
      return this.pcblist.indexOf(arg);
    }
  }
}