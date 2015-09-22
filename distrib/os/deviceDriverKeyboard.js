var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TSOS;
(function (TSOS) {
    var DeviceDriverKeyboard = (function (_super) {
        __extends(DeviceDriverKeyboard, _super);
        function DeviceDriverKeyboard() {
            _super.call(this, this.krnKbdDriverEntry, this.krnKbdDispatchKeyPress);
        }
        DeviceDriverKeyboard.prototype.krnKbdDriverEntry = function () {
            this.status = "loaded";
        };
        DeviceDriverKeyboard.prototype.krnKbdDispatchKeyPress = function (params) {
            var keyCode = params[0];
            var isShifted = params[1];
            _Kernel.krnTrace("Key code:" + keyCode + " shifted:" + isShifted);
            var chr = "";
            if (((keyCode >= 65) && (keyCode <= 90)) ||
                ((keyCode >= 97) && (keyCode <= 123))) {
                chr = String.fromCharCode(keyCode + 32);
                if (isShifted) {
                    chr = String.fromCharCode(keyCode);
                }
                _KernelInputQueue.enqueue(chr);
            }
            else if (((keyCode >= 48) && (keyCode <= 57)) ||
                (keyCode == 32) ||
                (keyCode == 13) ||
                (keyCode == 8) ||
                (keyCode == 9) ||
                (keyCode == 38) ||
                (keyCode == 40)) {
                chr = String.fromCharCode(keyCode);
                _KernelInputQueue.enqueue(chr);
            }
            else {
                switch (keyCode) {
                    case 186:
                        chr = ";";
                        if (isShifted) {
                            chr = ":";
                        }
                        break;
                    case 187:
                        chr = "=";
                        if (isShifted) {
                            chr = "+";
                        }
                        break;
                    case 188:
                        chr = ",";
                        if (isShifted) {
                            chr = "<";
                        }
                        break;
                    case 189:
                        chr = "-";
                        if (isShifted) {
                            chr = "_";
                        }
                        break;
                    case 190:
                        chr = ".";
                        if (isShifted) {
                            chr = ">";
                        }
                        break;
                    case 191:
                        chr = "/";
                        if (isShifted) {
                            chr = "?";
                        }
                        break;
                    case 192:
                        chr = "``";
                        if (isShifted) {
                            chr = "~";
                        }
                        break;
                    case 219:
                        chr = "[";
                        if (isShifted) {
                            chr = "{";
                        }
                        break;
                    case 220:
                        chr = "\\";
                        if (isShifted) {
                            chr = "|";
                        }
                        break;
                    case 221:
                        chr = "]";
                        if (isShifted) {
                            chr = "}";
                        }
                        break;
                    case 222:
                        chr = "\'";
                        if (isShifted) {
                            chr = "\"";
                        }
                        break;
                }
                _KernelInputQueue.enqueue(chr);
            }
        };
        return DeviceDriverKeyboard;
    })(TSOS.DeviceDriver);
    TSOS.DeviceDriverKeyboard = DeviceDriverKeyboard;
})(TSOS || (TSOS = {}));
