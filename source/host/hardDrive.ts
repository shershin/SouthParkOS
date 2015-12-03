///<reference path="../globals.ts" />
/*/
all things memory
/*/

module TSOS {
  export class hardDrive{
    constructor(
      public memory = []
    ){

    }
    public init (){
      this.memory = [];
    }
  }
}
