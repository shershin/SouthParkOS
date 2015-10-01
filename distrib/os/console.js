var TSOS;
(function (TSOS) {
    var past = [];
    var arrayInt = 0;
    var holderInt = 0;
    var memory = [];
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
            while (_KernelInputQueue.getSize() > 0) {
                var chr = _KernelInputQueue.dequeue();
                if (chr === String.fromCharCode(13)) {
                    past[arrayInt] = this.buffer;
                    _OsShell.handleInput(this.buffer);
                    arrayInt++;
                    holderInt = arrayInt;
                    this.buffer = "";
                }
                else if (chr === String.fromCharCode(8)) {
                    this.removeLine(this.buffer);
                    var back = this.buffer.slice(0, -1);
                    this.buffer = back;
                    this.putText(this.buffer);
                }
                else if (chr === String.fromCharCode(9)) {
                    for (var i in _OsShell.commandList) {
                        if (!_OsShell.commandList[i].command.indexOf(this.buffer)) {
                            this.removeLine(this.buffer);
                            this.putText(_OsShell.commandList[i].command.toString());
                            this.buffer = _OsShell.commandList[i].command.toString();
                        }
                    }
                }
                else {
                    if (chr != String.fromCharCode(38) &&
                        chr != String.fromCharCode(40)) {
                        this.putText(chr);
                        this.buffer += chr;
                    }
                }
            }
            if (chr === String.fromCharCode(38)) {
                holderInt--;
                if (holderInt < 0) {
                    holderInt = 0;
                }
                this.removeLine(this.buffer);
                this.putText(past[holderInt].toString());
                this.buffer = past[holderInt].toString();
            }
            else if (chr === String.fromCharCode(40)) {
                holderInt++;
                if (holderInt >= arrayInt) {
                    holderInt = arrayInt - 1;
                }
                this.removeLine(this.buffer);
                this.putText(past[holderInt].toString());
                this.buffer = past[holderInt].toString();
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
                var img = _DrawingContext.getImageData(0, 0, _Canvas.width, _Canvas.height);
                _Canvas.height = _Canvas.height + _Canvas.height;
                _DrawingContext.putImageData(img, 0, 0);
            }
            if (this.currentXPosition > _Canvas.width) {
                this.currentXPosition = 0;
                this.currentYPosition += _DefaultFontSize +
                    _DrawingContext.fontDescent(this.currentFont, this.currentFontSize) +
                    _FontHeightMargin;
                var img = _DrawingContext.getImageData(0, 20, _Canvas.width, _Canvas.height);
                _DrawingContext.putImageData(img, 0, 0);
                this.currentYPosition = 495;
            }
        };
        Console.prototype.removeLine = function (text) {
            if (text !== "") {
                var offset = _DrawingContext.measureText(this.currentFont, this.currentFontSize, text);
                this.currentXPosition = this.currentXPosition - offset;
                _DrawingContext.clearRect(this.currentXPosition, this.currentYPosition - this.currentFontSize - 1, offset, this.currentFontSize * 2);
            }
        };
        return Console;
    })();
    TSOS.Console = Console;
})(TSOS || (TSOS = {}));
