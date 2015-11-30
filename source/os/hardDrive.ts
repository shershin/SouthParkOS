///<reference path="../globals.ts" />
///<reference path="deviceDriver.ts" />

/* ----------------------------------
   DeviceDriverKeyboard.ts

   Requires deviceDriver.ts

   The Kernel Keyboard Device Driver.
   ---------------------------------- */
module TSOS {
  export class HardDrive extends DeviceDriver {
    constructor() {
                  super(this.init);
    }
    public init(){
      //this.hardMemory;
      //this.hardDriveInt;
    }
  }
}
