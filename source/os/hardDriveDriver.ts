///<reference path="../globals.ts" />
///<reference path="deviceDriver.ts" />

/* ----------------------------------
   DeviceDriverKeyboard.ts

   Requires deviceDriver.ts

   The Kernel Keyboard Device Driver.
   ---------------------------------- */

module TSOS {

    // Extends DeviceDriver
    export class hardDriveDriver extends DeviceDriver {

        constructor() {
            // Override the base method pointers.
            super(this.hDDriverEntry);
        }

        public hDDriverEntry() {
            // Initialization routine for this, the kernel-mode Keyboard Device Driver.
            this.status = "loaded";
            // More?
        }

        public isEmpty(): boolean{
          var i = 0;
          while (i < mem_size){
            if (_hardDrive.hDMeta[i] === null ||
                _hardDrive.hDMeta[i] === undefined ||
                _hardDrive.hDMeta[i] === "0000"){
                  return true;
                }
                i++;
          }
          return false;
        }

        public nameCheck(arg):boolean{
          var i = 0;
          while (i < mem_size){
            var tester = Utils.fromHex(_hardDrive.hardDriveMem[i]);
            if (tester === arg){
              return true;
            }
          }
          return false;
        }

        public hdMemClear(){
          var i = 0;
          while (i < mem_size){
            _hardDrive.hDMeta[i] = "0000";
            _hardDrive.hardDriveMem[i] = "";
            i++;
          }

        }
      }
}
