var TSOS;
(function (TSOS) {
    var Utils = (function () {
        function Utils() {
        }
        Utils.trim = function (str) {
            return str.replace(/^\s+ | \s+$/g, "");
        };
        Utils.rot13 = function (str) {
            var retVal = "";
            for (var i in str) {
                var ch = str[i];
                var code = 0;
                if ("abcedfghijklmABCDEFGHIJKLM".indexOf(ch) >= 0) {
                    code = str.charCodeAt(i) + 13;
                    retVal = retVal + String.fromCharCode(code);
                }
                else if ("nopqrstuvwxyzNOPQRSTUVWXYZ".indexOf(ch) >= 0) {
                    code = str.charCodeAt(i) - 13;
                    retVal = retVal + String.fromCharCode(code);
                }
                else {
                    retVal = retVal + ch;
                }
            }
            return retVal;
        };
        Utils.fromHex = function (args) {
            var dec = parseInt(args, 16);
            return dec;
        };
        Utils.littleE = function (args1, args2) {
            var swap = args2 + args1;
            return swap;
        };
        Utils.toHex = function (args) {
            var hex = args.toString(16);
            if (hex.length === 1) {
                var newVal = "0".concat(hex);
                return newVal;
            }
            return hex;
        };
        Utils.stringHex = function (args) {
            var str = String.fromCharCode(args);
            return str;
        };
        Utils.whiteBeGone = function (str) {
            return str.replace(/\s/g, "");
        };
        Utils.grabberTwo = function () {
            var loc = _currentPCB.progCounter;
            var swap = this.littleE(_Memory.memory[loc], _Memory.memory[loc + 1]);
            return swap;
        };
        Utils.grabberOne = function (val) {
            var loc = _Memory.memory[val];
            return loc;
        };
        Utils.addBase = function (arg) {
            var combined = arg + _currentPCB.base;
            return combined;
        };
        Utils.strToHex = function (arg) {
            var hex = '';
            for (var i = 0; i < arg.length; i++) {
                hex += '' + arg.charCodeAt(i).toString(16);
            }
            return hex.toUpperCase();
        };
        Utils.hexToStr = function (arg) {
            var str = '';
            for (var i = 0; i < arg.length; i += 2) {
                str += String.fromCharCode(parseInt(arg.substr(i, 2), 16));
            }
            return str;
        };
        return Utils;
    })();
    TSOS.Utils = Utils;
})(TSOS || (TSOS = {}));
