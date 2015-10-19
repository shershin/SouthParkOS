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
            var swap = args2.concat(args1);
            return swap;
        };
        Utils.toHex = function (args) {
            var hex = args.toString(16);
            return hex;
        };
        Utils.stringHex = function (args) {
            var str = String.fromCharCode(args);
            return str;
        };
        return Utils;
    })();
    TSOS.Utils = Utils;
})(TSOS || (TSOS = {}));
