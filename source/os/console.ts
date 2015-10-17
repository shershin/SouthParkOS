///<reference path="../globals.ts" />

/* ------------
     Console.ts

     Requires globals.ts

     The OS Console - stdIn and stdOut by default.
     Note: This is not the Shell. The Shell is the "command line interface" (CLI) or interpreter for this console.
     ------------ */

module TSOS {
var past = [];
var arrayInt = 0;
var holderInt = 0;
    export class Console {

        constructor(public currentFont = _DefaultFontFamily,
                    public currentFontSize = _DefaultFontSize,
                    public currentXPosition = 0,
                    public currentYPosition = _DefaultFontSize,
                    public buffer = "") {
        }

        public init(): void {
            this.clearScreen();
            this.resetXY();
        }

        private clearScreen(): void {
            _DrawingContext.clearRect(0, 0, _Canvas.width, _Canvas.height);
        }

        private resetXY(): void {
            this.currentXPosition = 0;
            this.currentYPosition = this.currentFontSize;
        }

        public handleInput(): void {
            while (_KernelInputQueue.getSize() > 0) {
                // Get the next character from the kernel input queue.
                var chr = _KernelInputQueue.dequeue();
                // Check to see if it's "special" (enter or ctrl-c) or "normal" (anything else that the keyboard device driver gave us).
                if (chr === String.fromCharCode(13)) { //     Enter key
                    // The enter key marks the end of a console command, so ...
                    //put the buffer into the array
                    past[arrayInt] = this.buffer;
                    // ... tell the shell ...
                    _OsShell.handleInput(this.buffer);
                    //incerment the holder
                    arrayInt++;
                    holderInt = arrayInt;
                    // ... and reset our buffer.
                    this.buffer = "";
                }else if (chr === String.fromCharCode(8)){
                  //backspace
                  this.removeLine(this.buffer);
                  var back = this.buffer.slice(0,-1);
                  this.buffer = back;
                  this.putText(this.buffer);
                } else if (chr === String.fromCharCode(9)){
                  //tab
                  for (var i in _OsShell.commandList) {
                    if (!_OsShell.commandList[i].command.indexOf(this.buffer)){
                      this.removeLine(this.buffer);
                      this.putText(_OsShell.commandList[i].command.toString());
                      this.buffer = _OsShell.commandList[i].command.toString();
                    }
                  }
                } else {
                    // This is a "normal" character, so ...
                    // ... draw it on the screen...
                    if (chr != String.fromCharCode(38)    &&
                        chr != String.fromCharCode(40)){
                          this.putText(chr);
                          // ... and add it to our buffer.
                          this.buffer += chr;
                        }
                }
                // TODO: Write a case for Ctrl-C.
            }
            if (chr === String.fromCharCode(38)) {
             //up arrow
             holderInt--;
             if (holderInt < 0){
               holderInt = 0;
             }
             this.removeLine(this.buffer);
             this.putText(past[holderInt].toString());
             this.buffer = past[holderInt].toString();
           }else if (chr === String.fromCharCode(40)){
               //down arrow
               holderInt++;
               if (holderInt >= arrayInt){
                 holderInt = arrayInt - 1;
               }
               this.removeLine(this.buffer);
               this.putText(past[holderInt].toString());
               this.buffer = past[holderInt].toString();

            }
        }

        public putText(text): void {
            // My first inclination here was to write two functions: putChar() and putString().
            // Then I remembered that JavaScript is (sadly) untyped and it won't differentiate
            // between the two.  So rather than be like PHP and write two (or more) functions that
            // do the same thing, thereby encouraging confusion and decreasing readability, I
            // decided to write one function and use the term "text" to connote string or char.
            //
            // UPDATE: Even though we are now working in TypeScript, char and string remain undistinguished.
            //         Consider fixing that.
            if (text !== "") {
                // Move the current X position.
                var offset = _DrawingContext.measureText(this.currentFont, this.currentFontSize, text);
                if ((this.currentXPosition + offset) > _Canvas.width){
                  if(text.length > 1){
                    // Draw the text at the current X and Y coordinates.
                    _DrawingContext.drawText(this.currentFont, this.currentFontSize, this.currentXPosition, this.currentYPosition, text);
                  }else {
                    this.advanceLine();
                  }
                }
                _DrawingContext.drawText(this.currentFont, this.currentFontSize, this.currentXPosition, this.currentYPosition, text);
                this.currentXPosition = this.currentXPosition + offset;
              }
       }

        public advanceLine(): void {
            this.currentXPosition = 0;
            /*
             * Font size measures from the baseline to the highest point in the font.
             * Font descent measures from the baseline to the lowest point in the font.
             * Font height margin is extra spacing between the lines.
             */
             this.currentYPosition += _DefaultFontSize +
                                      _DrawingContext.fontDescent(this.currentFont, this.currentFontSize) +
                                      _FontHeightMargin;

            // TODO: Handle scrolling. (iProject 1)
            if(this.currentYPosition > _Canvas.height){
              var img = _DrawingContext.getImageData(0, 20, _Canvas.width, _Canvas.height);
              _DrawingContext.putImageData(img, 0, 0);
              this.currentYPosition = 495;
            }
      }
      public removeLine(text): void{
        if(text !== ""){
          //move the xposition
          var offset = _DrawingContext.measureText(this.currentFont, this.currentFontSize, text);
          this.currentXPosition = this.currentXPosition - offset;

          //blank out text
          _DrawingContext.clearRect(this.currentXPosition, this.currentYPosition - this.currentFontSize - 1,
                                    offset, this.currentFontSize * 2);
        }
      }
    }
 }
