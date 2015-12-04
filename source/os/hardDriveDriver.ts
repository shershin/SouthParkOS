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
            var tester = Utils.stringHex(_hardDrive.hardDriveMem[i]);
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
        public fileLoc(arg): number{
          var i = 0;
          var loc = null;
          while (i < mem_size){
            var tester = Utils.stringHex(_hardDrive.hardDriveMem[i]);
            if (tester === arg){
              return loc = i;
            }
          }
        }
        public openSpot(): number {
          var openSpot = null;
          var i = 0;
          while (i < mem_size){
            if (_hardDrive.hDMeta[i] === "0000"){
              return openSpot = i;
            }
            i++;
          }
        }
        public createFile(arg){
          var loc = this.openSpot();
          var hex = Utils.toHex(arg);
          var hexStr = this.addZero(hex);
          _hardDrive.hardDriveMem[loc] = hexStr;
          _hardDrive.hDMeta[loc] = "1000";
        }
        public deleteFile(arg){
          var loc = this.fileLoc(arg);
          var str = this.addZero("");
          _hardDrive.hardDriveMem[loc] = str;
          _hardDrive.hDMeta[loc] = "0000";
        }
        public addZero(arg): string{
          var i = arg.length;
          var str = arg;
          while (i < 63){
            str += "0";
            i++;
          }
          return str;
        }
      }
}
