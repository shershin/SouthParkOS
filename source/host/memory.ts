///<reference path="../globals.ts" />
/*/
all things memory
/*/

module TSOS {
  export class Memory{
    constructor(
      public memory = []
    ){

    }
    public init (){
      this.memory = [];
    }
  }
}
