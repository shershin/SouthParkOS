var LOCAL = "In front of a computer looking at my project.....or so I hope";
var TSOS;
(function (TSOS) {
    var Shell = (function () {
        function Shell() {
            this.promptStr = ">";
            this.commandList = [];
            this.curses = "[fuvg],[cvff],[shpx],[phag],[pbpxfhpxre],[zbgureshpxre],[gvgf]";
            this.apologies = "[sorry]";
        }
        Shell.prototype.init = function () {
            var sc;
            sc = new TSOS.ShellCommand(this.shellVer, "ver", "- Displays the current version data.");
            this.commandList[this.commandList.length] = sc;
            sc = new TSOS.ShellCommand(this.shellHelp, "help", "- This is the help command. Seek help.");
            this.commandList[this.commandList.length] = sc;
            sc = new TSOS.ShellCommand(this.shellShutdown, "shutdown", "- Shuts down the virtual OS but leaves the underlying host / hardware simulation running.");
            this.commandList[this.commandList.length] = sc;
            sc = new TSOS.ShellCommand(this.shellCls, "cls", "- Clears the screen and resets the cursor position.");
            this.commandList[this.commandList.length] = sc;
            sc = new TSOS.ShellCommand(this.shellMan, "man", "<topic> - Displays the MANual page for <topic>.");
            this.commandList[this.commandList.length] = sc;
            sc = new TSOS.ShellCommand(this.shellTrace, "trace", "<on | off> - Turns the OS trace on or off.");
            this.commandList[this.commandList.length] = sc;
            sc = new TSOS.ShellCommand(this.shellRot13, "rot13", "<string> - Does rot13 obfuscation on <string>.");
            this.commandList[this.commandList.length] = sc;
            sc = new TSOS.ShellCommand(this.shellPrompt, "prompt", "<string> - Sets the prompt.");
            this.commandList[this.commandList.length] = sc;
            sc = new TSOS.ShellCommand(this.shellPs, "ps", "- list the running proccesses and their IDs.");
            this.commandList[this.commandList.length] = sc;
            sc = new TSOS.ShellCommand(this.shellKill, "kill", "<id> - kills the specified process id.");
            this.commandList[this.commandList.length] = sc;
            sc = new TSOS.ShellCommand(this.shellDate, "date", "- displays the current date and time.");
            this.commandList[this.commandList.length] = sc;
            sc = new TSOS.ShellCommand(this.shellWhereami, "whereami", "- displays the current location.");
            this.commandList[this.commandList.length] = sc;
            sc = new TSOS.ShellCommand(this.shellImagination, "imagination", "- attempting to be clever but failing.");
            this.commandList[this.commandList.length] = sc;
            sc = new TSOS.ShellCommand(this.shellHappythoughts, "happythoughts", "- get transported to a happy place.");
            this.commandList[this.commandList.length] = sc;
            sc = new TSOS.ShellCommand(this.shellStatus, "status", "<String> - change the status.");
            this.commandList[this.commandList.length] = sc;
            sc = new TSOS.ShellCommand(this.shellLoad, "load", "- gathers the data from the program input.");
            this.commandList[this.commandList.length] = sc;
            sc = new TSOS.ShellCommand(this.shellBsod, "bsod", "- to death the computer goes.");
            this.commandList[this.commandList.length] = sc;
            this.putPrompt();
        };
        Shell.prototype.putPrompt = function () {
            _StdOut.putText(this.promptStr);
        };
        Shell.prototype.handleInput = function (buffer) {
            _Kernel.krnTrace("Shell Command~" + buffer);
            var userCommand = this.parseInput(buffer);
            var cmd = userCommand.command;
            var args = userCommand.args;
            var index = 0;
            var found = false;
            var fn = undefined;
            while (!found && index < this.commandList.length) {
                if (this.commandList[index].command === cmd) {
                    found = true;
                    fn = this.commandList[index].func;
                }
                else {
                    ++index;
                }
            }
            if (found) {
                this.execute(fn, args);
            }
            else {
                if (this.curses.indexOf("[" + TSOS.Utils.rot13(cmd) + "]") >= 0) {
                    this.execute(this.shellCurse);
                }
                else if (this.apologies.indexOf("[" + cmd + "]") >= 0) {
                    this.execute(this.shellApology);
                }
                else {
                    this.execute(this.shellInvalidCommand);
                }
            }
        };
        Shell.prototype.execute = function (fn, args) {
            _StdOut.advanceLine();
            fn(args);
            if (_StdOut.currentXPosition > 0) {
                _StdOut.advanceLine();
            }
            this.putPrompt();
        };
        Shell.prototype.parseInput = function (buffer) {
            var retVal = new TSOS.UserCommand();
            buffer = TSOS.Utils.trim(buffer);
            buffer = buffer.toLowerCase();
            var tempList = buffer.split(" ");
            var cmd = tempList.shift();
            cmd = TSOS.Utils.trim(cmd);
            retVal.command = cmd;
            for (var i in tempList) {
                var arg = TSOS.Utils.trim(tempList[i]);
                if (arg != "") {
                    retVal.args[retVal.args.length] = tempList[i];
                }
            }
            return retVal;
        };
        Shell.prototype.shellInvalidCommand = function () {
            _StdOut.putText("Invalid Command. ");
            if (_SarcasticMode) {
                _StdOut.putText("Unbelievable. You, [subject name here],");
                _StdOut.advanceLine();
                _StdOut.putText("must be the pride of [subject hometown here].");
            }
            else {
                _StdOut.putText("Type 'help' for, well... help.");
            }
        };
        Shell.prototype.shellCurse = function () {
            _StdOut.putText("Oh, so that's how it's going to be, eh? Fine.");
            _StdOut.advanceLine();
            _StdOut.putText("Bitch.");
            _SarcasticMode = true;
        };
        Shell.prototype.shellApology = function () {
            if (_SarcasticMode) {
                _StdOut.putText("I think we can put our differences behind us.");
                _StdOut.advanceLine();
                _StdOut.putText("For science . . . You monster.");
                _SarcasticMode = false;
            }
            else {
                _StdOut.putText("For what?");
            }
        };
        Shell.prototype.shellVer = function (args) {
            _StdOut.putText(APP_NAME + " version " + APP_VERSION);
        };
        Shell.prototype.shellHelp = function (args) {
            _StdOut.putText("Commands:");
            for (var i in _OsShell.commandList) {
                _StdOut.advanceLine();
                _StdOut.putText("  " + _OsShell.commandList[i].command + " " + _OsShell.commandList[i].description);
            }
        };
        Shell.prototype.shellShutdown = function (args) {
            _StdOut.putText("Shutting down...");
            _Kernel.krnShutdown();
        };
        Shell.prototype.shellCls = function (args) {
            _StdOut.clearScreen();
            _StdOut.resetXY();
        };
        Shell.prototype.shellMan = function (args) {
            if (args.length > 0) {
                var topic = args[0];
                switch (topic) {
                    case "help":
                        _StdOut.putText("Help displays a list of (hopefully) valid commands.");
                        break;
                    case "ver":
                        _StdOut.putText("Shows the current version of the system.");
                        break;
                    case "shutdown":
                        _StdOut.putText("Turns off the system.");
                        break;
                    case "man":
                        _StdOut.putText("Manuals for all.");
                        break;
                    case "trace":
                        _StdOut.putText("Tracing all the objects.");
                        break;
                    case "rot13":
                        _StdOut.putText("Your guess is as good as mine.");
                        break;
                    case "prompt":
                        _StdOut.putText("All I know is that this one hates me.");
                        break;
                    case "ps":
                        _StdOut.putText("List all the proccesses.");
                        break;
                    case "kill":
                        _StdOut.putText("Murder the selected process.");
                        break;
                    case "date":
                        _StdOut.putText("It tells you the current date.");
                        break;
                    case "whereami":
                        _StdOut.putText("The location of at least your computer and maybe you.");
                        break;
                    case "imagination":
                        _StdOut.putText("Or lack there of.");
                        break;
                    case "happyplace":
                        _StdOut.putText("You will need one after this project.");
                        break;
                    case "status":
                        _StdOut.putText("Enter the new message you want the status to be.");
                        break;
                    case "load":
                        _StdOut.putText("Loads a program input only hex digits and spaces are valid.");
                        break;
                    case "bsod":
                        _StdOut.putText("Lets kill the computer.");
                        break;
                    default:
                        _StdOut.putText("No manual entry for " + args[0] + ".");
                }
            }
            else {
                _StdOut.putText("Usage: man <topic>  Please supply a topic.");
            }
        };
        Shell.prototype.shellTrace = function (args) {
            if (args.length > 0) {
                var setting = args[0];
                switch (setting) {
                    case "on":
                        if (_Trace && _SarcasticMode) {
                            _StdOut.putText("Trace is already on, doofus.");
                        }
                        else {
                            _Trace = true;
                            _StdOut.putText("Trace ON");
                        }
                        break;
                    case "off":
                        _Trace = false;
                        _StdOut.putText("Trace OFF");
                        break;
                    default:
                        _StdOut.putText("Invalid arguement.  Usage: trace <on | off>.");
                }
            }
            else {
                _StdOut.putText("Usage: trace <on | off>");
            }
        };
        Shell.prototype.shellRot13 = function (args) {
            if (args.length > 0) {
                _StdOut.putText(args.join(' ') + " = '" + TSOS.Utils.rot13(args.join(' ')) + "'");
            }
            else {
                _StdOut.putText("Usage: rot13 <string>  Please supply a string.");
            }
        };
        Shell.prototype.shellPrompt = function (args) {
            if (args.length > 0) {
                _OsShell.promptStr = args[0];
            }
            else {
                _StdOut.putText("Usage: prompt <string>  Please supply a string.");
            }
        };
        Shell.prototype.shellDate = function (args) {
            var day = new Date().getDay().toString();
            var month = new Date().getMonth().toString();
            var year = new Date().getFullYear().toString();
            var hours = new Date().getHours().toString();
            var mins = new Date().getMinutes().toString();
            var secs = new Date().getSeconds().toString();
            _StdOut.putText("date: day, month, year");
            _StdOut.advanceLine();
            _StdOut.putText(day + ", " + month + ", " + year);
            _StdOut.advanceLine();
            _StdOut.putText("time: hour:minutes:seconds");
            _StdOut.advanceLine();
            _StdOut.putText(hours + ":" + mins + ":" + secs);
        };
        Shell.prototype.shellWhereami = function (args) {
            _StdOut.putText(LOCAL);
        };
        Shell.prototype.shellImagination = function (args) {
            _StdOut.putText("Trying really hard to be clever but in reality just repeating one self and doing nothing different or original");
            _StdOut.advanceLine();
            _StdOut.putText("oh well -\\_(-,-)_/-");
        };
        Shell.prototype.shellHappythoughts = function (args) {
            _StdOut.putText("Deep breath");
            _StdOut.advanceLine();
            _StdOut.putText("DEEP BREATH");
            _StdOut.advanceLine();
            _StdOut.putText("try not to cry");
            LOCAL = "Your Happy Place";
        };
        Shell.prototype.shellStatus = function (args) {
            if (args.length > 0) {
                var str = args.toString();
                var reString = str.replace(",", " ");
                document.getElementById("status").innerHTML = reString;
                _StdOut.putText("Changing status...");
            }
            else {
                _StdOut.putText("But how is this supossed to work if you don't include a String?");
            }
        };
        Shell.prototype.shellPs = function (args) {
            _StdOut.putText("This function is currently not obtional.");
            _StdOut.advanceLine();
            _StdOut.putText("Please check back later.");
        };
        Shell.prototype.shellKill = function (args) {
            _StdOut.putText("This function is currently not obtional.");
            _StdOut.advanceLine();
            _StdOut.putText("Please check back later.");
        };
        Shell.prototype.shellLoad = function (args) {
            var input = document.getElementById("taProgramInput").innerText.toString();
            _StdOut.putText(input);
        };
        Shell.prototype.shellBsod = function (args) {
            var msg = "ohhh nooo";
            _Kernel.krnTrapError(msg);
        };
        return Shell;
    })();
    TSOS.Shell = Shell;
})(TSOS || (TSOS = {}));
