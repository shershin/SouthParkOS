/* --------
   Utils.ts

   Utility functions.
   -------- */

module TSOS {

    export class Utils {

        public static trim(str): string {
            // Use a regular expression to remove leading and trailing spaces.
            return str.replace(/^\s+ | \s+$/g, "");
            /*
            Huh? WTF? Okay... take a breath. Here we go:
            - The "|" separates this into two expressions, as in A or B.
            - "^\s+" matches a sequence of one or more whitespace characters at the beginning of a string.
            - "\s+$" is the same thing, but at the end of the string.
            - "g" makes is global, so we get all the whitespace.
            - "" is nothing, which is what we replace the whitespace with.
            */
        }

        public static rot13(str: string): string {
            /*
               This is an easy-to understand implementation of the famous and common Rot13 obfuscator.
               You can do this in three lines with a complex regular expression, but I'd have
               trouble explaining it in the future.  There's a lot to be said for obvious code.
            */
            var retVal: string = "";
            for (var i in <any>str) {    // We need to cast the string to any for use in the for...in construct.
                var ch: string = str[i];
                var code: number = 0;
                if ("abcedfghijklmABCDEFGHIJKLM".indexOf(ch) >= 0) {
                    code = str.charCodeAt(i) + 13;  // It's okay to use 13.  It's not a magic number, it's called rot13.
                    retVal = retVal + String.fromCharCode(code);
                } else if ("nopqrstuvwxyzNOPQRSTUVWXYZ".indexOf(ch) >= 0) {
                    code = str.charCodeAt(i) - 13;  // It's okay to use 13.  See above.
                    retVal = retVal + String.fromCharCode(code);
                } else {
                    retVal = retVal + ch;
                }
            }
            return retVal;
        }
        //takes a hex and transforms it into decimal
        public static fromHex(args){
          var dec = parseInt(args, 16);
          return dec;
        }
        //swap them and swap them fast
        public static littleE(args1, args2){
          var swap = args2 + args1;
          return swap;
        }
        //reverse of fromHex....why am i doing all this work argh
        public static toHex(args){
          var hex = args.toString(16);
          if (hex.length === 1){
            var newVal = "0".concat(hex);
            return newVal;
          }
          return hex
        }
        //takes a hex and converts it into my string of amazingness
        public static stringHex(args){
          var str = String.fromCharCode(args);
          return str;
        }
        //clean out all whitespace
        public static whiteBeGone(str){
          return str.replace(/\s/g, "");
        }
        //graps the current location in the memory array
        //and auto sends it to the littleE function to swap them
        public static grabberTwo(){
          var loc = _currentPCB.progCounter;
          var swap = this.littleE(_Memory.memory[loc], _Memory.memory[loc + 1]);
          return swap;
        }
        //grabs the current memory spot
        public static grabberOne(val){
          var loc = _Memory.memory[val];
          return loc;
        }
        public static addBase(arg){
          var combined = arg + _currentPCB.base;
          console.log(_currentPCB.pid + " combined " + combined);
          return combined;
        }
        //convert all the strings to hex muhahahahaha
        public static strToHex(arg): string{
	           var hex = '';
	            for (var i=0;i<arg.length;i++) {
		              hex += ''+arg.charCodeAt(i).toString(16);
	               }
	                return hex.toUpperCase();
        }
        public static hexToStr(arg) {
          var str = '';
          arg + "";
          console.log("hextostr " + arg + " " + arg.length);
          for (var i = 0; i < arg.length; i += 2){
            str += String.fromCharCode(parseInt(arg.substr(i, 2), 16));
          }
            return str;
          }
          //not that kind of stripper
          //this one takes the number from pid
          public static stripper(arg){
            var re = /[0-9]/g;
            var match = (arg + "").match(re);
            console.log("stripper function " + arg + " " + match);
            return match;
          }

          public static pcFix(pcb:PCB){
            var base = _currentPCB.base;
            var diff = pcb.progCounter - pcb.base;
            pcb.progCounter = base + diff;
            console.log("pcFix " + base + " " + diff + " " + pcb.progCounter);
          }

          public static stringToArry(str){
            var arry = [];
            var byte = "";
            var memLoc = 0;
            for (var x = str.length; x < 512; x++){
              str += "0";
            }
            for (var i = 0; i < str.length; i++) {
                byte = byte + str[i];
                if (byte.length > 1) {
                    arry[i] = byte;
                    memLoc++;
                    byte = "";
                }
            }
            console.log(arry.toString());
            return arry;
          }
}
}
