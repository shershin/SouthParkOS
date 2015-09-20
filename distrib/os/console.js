///<reference path="../globals.ts" />
var TSOS;
(function (TSOS) {
    var Console = (function () {
        function Console(currentFont, currentFontSize, currentXPosition, currentYPosition, buffer) {
            if (currentFont === void 0) { currentFont = _DefaultFontFamily; }
            if (currentFontSize === void 0) { currentFontSize = _DefaultFontSize; }
            if (currentXPosition === void 0) { currentXPosition = 0; }
            if (currentYPosition === void 0) { currentYPosition = _DefaultFontSize; }
            if (buffer === void 0) { buffer = ""; }
            this.currentFont = currentFont;
            this.currentFontSize = currentFontSize;
            this.currentXPosition = currentXPosition;
            this.currentYPosition = currentYPosition;
            this.buffer = buffer;
        }
        Console.prototype.init = function () {
            this.clearScreen();
            this.resetXY();
        };
        Console.prototype.clearScreen = function () {
            _DrawingContext.clearRect(0, 0, _Canvas.width, _Canvas.height);
        };
        Console.prototype.resetXY = function () {
            this.currentXPosition = 0;
            this.currentYPosition = this.currentFontSize;
        };
        Console.prototype.handleInput = function () {
            var charArray = new Array();
            var arrayInt = 0;
            while (_KernelInputQueue.getSize() > 0) {
                var chr = _KernelInputQueue.dequeue();
                if (chr === String.fromCharCode(13)) {
                    _OsShell.handleInput(this.buffer);
                    charArray[arrayInt] = this.buffer;
                    arrayInt++;
                    this.buffer = "";
                }
                else if (chr === String.fromCharCode(8)) {
                    var back = this.buffer.slice(0, -1);
                    this.buffer = back;
                    this.putText(" " + this.buffer);
                }
                else if (chr === String.fromCharCode(9)) {
                    var listInt = 0;
                    if (_OsShell.commandList[listInt].indexOf(this.buffer)) {
                        this.putText(_OsShell.commandList[listInt]);
                        this.buffer = _OsShell.commandList[listInt];
                        listInt++;
                    }
                }
                else {
                    this.putText(chr);
                    this.buffer += chr;
                }
            }
            if (chr === String.fromCharCode(38)) {
                this.putText(charArray[arrayInt - 1]);
                this.buffer = charArray[arrayInt - 1];
                if (chr === String.fromCharCode(40)) {
                    this.putText(charArray[arrayInt + 1]);
                    this.buffer = charArray[arrayInt + 1];
                }
            }
        };
        Console.prototype.putText = function (text) {
            if (text !== "") {
                _DrawingContext.drawText(this.currentFont, this.currentFontSize, this.currentXPosition, this.currentYPosition, text);
                var offset = _DrawingContext.measureText(this.currentFont, this.currentFontSize, text);
                this.currentXPosition = this.currentXPosition + offset;
            }
        };
        Console.prototype.advanceLine = function () {
            this.currentXPosition = 0;
            this.currentYPosition += _DefaultFontSize +
                _DrawingContext.fontDescent(this.currentFont, this.currentFontSize) +
                _FontHeightMargin;
            if (this.currentYPosition > _Canvas.height) {
                var context = _Canvas.getContext("2d");
                _Canvas.height = _Canvas.height + _Canvas.offsetHeight;
                console.log(context);
            }
            if (this.currentXPosition > _Canvas.width) {
                this.currentXPosition = 0;
                this.currentYPosition += _DefaultFontSize +
                    _DrawingContext.fontDescent(this.currentFont, this.currentFontSize) +
                    _FontHeightMargin;
            }
        };
        return Console;
    })();
    TSOS.Console = Console;
})(TSOS || (TSOS = {}));
