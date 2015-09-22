///<reference path="../globals.ts" />
///<reference path="deviceDriver.ts" />

/* ----------------------------------
   DeviceDriverKeyboard.ts

   Requires deviceDriver.ts

   The Kernel Keyboard Device Driver.
   ---------------------------------- */

module TSOS {

    // Extends DeviceDriver
    export class DeviceDriverKeyboard extends DeviceDriver {

        constructor() {
            // Override the base method pointers.
            super(this.krnKbdDriverEntry, this.krnKbdDispatchKeyPress);
        }

        public krnKbdDriverEntry() {
            // Initialization routine for this, the kernel-mode Keyboard Device Driver.
            this.status = "loaded";
            // More?
        }

        public krnKbdDispatchKeyPress(params) {
            // Parse the params.    TODO: Check that the params are valid and osTrapError if not.
            var keyCode = params[0];
            var isShifted = params[1];
            _Kernel.krnTrace("Key code:" + keyCode + " shifted:" + isShifted);
            var chr = "";
            // Check to see if we even want to deal with the key that was pressed.
            if (((keyCode >= 65) && (keyCode <= 90)) ||   // A..Z
                ((keyCode >= 97) && (keyCode <= 123))) {  // a..z {
                // Determine the character we want to display.
                // Assume it's lowercase...
                chr = String.fromCharCode(keyCode + 32);
                // ... then check the shift key and re-adjust if necessary.
                if (isShifted) {
                    chr = String.fromCharCode(keyCode);
                }
                // TODO: Check for caps-lock and handle as shifted if so.
                _KernelInputQueue.enqueue(chr);
            } else if (((keyCode >= 48) && (keyCode <= 57)) ||   // digits
                        (keyCode == 32)                     ||   // space
                        (keyCode == 13)                     ||   // enter
                        (keyCode == 8)                      ||   // backspace
                        (keyCode == 9)                      ||   // tab
                        (keyCode == 38)                     ||   // uparrow
                        (keyCode == 40)) {                       // downarrow
                chr = String.fromCharCode(keyCode);
                _KernelInputQueue.enqueue(chr);
            } else { //special characters
              switch (keyCode){
                case 186:
                chr = ";";
                if (isShifted){
                  chr = ":";
                }
                break;
                case 187:
                chr = "=";
                if (isShifted){
                  chr = "+";
                }
                break;
                case 188:
                chr = ",";
                if (isShifted){
                  chr = "<";
                }
                break;
                case 189:
                chr = "-";
                if (isShifted){
                  chr = "_";
                }
                break;
                case 190:
                chr = ".";
                if (isShifted){
                  chr = ">";
                }
                break;
                case 191:
                chr = "/";
                if (isShifted){
                  chr = "?";
                }
                break;
                case 192:
                chr = "``";
                if (isShifted){
                  chr = "~";
                }
                break;
                case 219:
                chr = "[";
                if (isShifted){
                  chr = "{";
                }
                break;
                case 220:
                chr = "\\";
                if (isShifted){
                  chr = "|";
                }
                break;
                case 221:
                chr = "]";
                if (isShifted){
                  chr = "}";
                }
                break;
                case 222:
                chr = "\'";
                if (isShifted){
                  chr = "\"";
                }
                break;
              }
              _KernelInputQueue.enqueue(chr);
            }
        }
    }
}
