///<reference path="../globals.ts" />
/*/
all things memory
/*/

module TSOS {
  export class hardDrive{
    constructor(
      public hardDriveMem = [] ,
      public hDMeta = []
    ){

    }
    public init (){
      this.hardDriveMem = [];
      this.hDMeta = [];
    }
  }
}
