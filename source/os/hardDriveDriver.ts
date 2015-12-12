///<reference path="../globals.ts" />
///<reference path="deviceDriver.ts" />

/* ----------------------------------
   DeviceDriverKeyboard.ts

   Requires deviceDriver.ts

   The Kernel Keyboard Device Driver.
   ---------------------------------- */

module TSOS {
    // Extends DeviceDriver
    export class hardDriveDriver {//extends DeviceDriver {

        constructor() {
            // Override the base method pointers.
            //super(this.hDDriverEntry);
        }

      /*  public hDDriverEntry() {
            // Initialization routine for this, the kernel-mode Keyboard Device Driver.
            this.status = "loaded";
            // More?
        }*/

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
          var tester = Utils.strToHex(arg);
          console.log("hex test " + tester + " = " + arg);
          while (i < mem_size){
            if (_hardDrive.hardDriveMem[i] === tester){
              console.log(_hardDrive.hardDriveMem[i]);
              return true;
            }
            i++;
          }
          console.log(_hardDrive.hardDriveMem[0]);
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
          var tester = Utils.strToHex(arg);
          console.log("hex test " + tester + " = " + arg);
          while (i < mem_size){
            if (_hardDrive.hardDriveMem[i] === tester){
              console.log(_hardDrive.hardDriveMem[i]);
              return loc = i;
            }
            i++;
          }
        }
        public openSpot(): number {
          var openSpot = null;
          var i = 0;
          while (i < mem_size){
            if (_hardDrive.hDMeta[i] === "0000" ||
                _hardDrive.hDMeta[i] === null ||
                _hardDrive.hDMeta[i] === undefined){
              return openSpot = i;
            }
            i++;
          }
        }
        public createFile(arg){
          console.log("creating file");
          var loc = this.openSpot();
          if (loc === null || loc === undefined){
            _StdOut.putText("Ran into an error please throw computer against wall to fix");
          } else {
            var hex = Utils.strToHex(arg);
            console.log("creating " + arg + " " + hex + " in loc " + loc);
            _hardDrive.hardDriveMem[loc] = hex;
            _hardDrive.hDMeta[loc] = "1000";
          }
        }
        public deleteFile(arg){
          var loc = this.fileLoc(arg);
          console.log(loc);
          _hardDrive.hardDriveMem[loc] = "";
          _hardDrive.hDMeta[loc] = "0000";
        }
        public createPgm(arg, pgm){
          console.log("creating file");
          var loc = this.openSpot();
          if (loc === null || loc === undefined){
            _StdOut.putText("Ran into an error please throw computer against wall to fix");
          } else {
            var hex = Utils.strToHex(arg);
            console.log("creating " + arg + " " + hex + " in loc " + loc);
            _hardDrive.hardDriveMem[loc] = hex;
            _hardDrive.hDMeta[loc] = "1100";
            sessionStorage.setItem(arg, pgm);
          }
        }
        public deletePgm(arg){
          var loc = this.fileLoc(arg);
          console.log(loc);
          _hardDrive.hardDriveMem[loc] = "";
          _hardDrive.hDMeta[loc] = "0000";
          sessionStorage.removeItem(arg);
        }
        public pgmFinder(arg){
          var i = 0;
          var tester = Utils.strToHex(arg);
          console.log("hex test " + tester + " = " + arg);
          while (i < mem_size){
            if (_hardDrive.hardDriveMem[i] === tester){
              console.log(_hardDrive.hardDriveMem[i]);
              hdPgm = (Utils.fromHex(_hardDrive.hardDriveMem[i]) + "");
              return true;
            }
            i++;
          }
          console.log(_hardDrive.hardDriveMem[0]);
        }

      }
}
