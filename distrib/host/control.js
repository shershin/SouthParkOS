var TSOS;
(function (TSOS) {
    var Control = (function () {
        function Control() {
        }
        Control.hostInit = function () {
            _Canvas = document.getElementById('display');
            _DrawingContext = _Canvas.getContext("2d");
            TSOS.CanvasTextFunctions.enable(_DrawingContext);
            document.getElementById("taHostLog").value = "";
            document.getElementById("btnStartOS").focus();
            if (typeof Glados === "function") {
                _GLaDOS = new Glados();
                _GLaDOS.init();
            }
        };
        Control.hostLog = function (msg, source) {
            if (source === void 0) { source = "?"; }
            var clock = _OSclock;
            var now = new Date().getTime();
            var str = "({ clock:" + clock + ", source:" + source + ", msg:" + msg + ", now:" + now + " })" + "\n";
            var taLog = document.getElementById("taHostLog");
            taLog.value = str + taLog.value;
        };
        Control.hostBtnStartOS_click = function (btn) {
            btn.disabled = true;
            document.getElementById("btnHaltOS").disabled = false;
            document.getElementById("btnReset").disabled = false;
            document.getElementById("display").focus();
            _Memory = new TSOS.Memory();
            _Memory.init();
            _CPU = new TSOS.Cpu();
            _CPU.init();
            _CpuSched = new TSOS.CPU_Scheduler();
            _resList = new TSOS.residentList();
            _MemoryManager = new TSOS.MemoryManager();
            _MemoryManager.clearMem();
            _Queue = new TSOS.Queue();
            _hardwareClockID = setInterval(TSOS.Devices.hostClockPulse, CPU_CLOCK_INTERVAL);
            _Kernel = new TSOS.Kernel();
            _Kernel.krnBootstrap();
            this.memoryTable();
            this.cpuTable();
        };
        Control.hostBtnHaltOS_click = function (btn) {
            Control.hostLog("Emergency halt", "host");
            Control.hostLog("Attempting Kernel shutdown.", "host");
            _Kernel.krnShutdown();
            clearInterval(_hardwareClockID);
        };
        Control.hostBtnReset_click = function (btn) {
            location.reload(true);
        };
        Control.singleStep_click = function (btn) {
            var on = false;
            var butn = document.getElementById('stepOne');
            var butnThis = document.getElementById('singleStep');
            if (butn.disabled) {
                butn.disabled = false;
                butnThis.value = "Single Step: On";
                this.singleStep = true;
            }
            else if (!butn.disabled) {
                butn.disabled = true;
                butnThis.value = "Single Step: Off";
                this.singleStep = false;
            }
        };
        Control.stepOne_click = function () {
            _CPU.cycle();
        };
        Control.memoryTable = function () {
            var table = "<tbody>";
            var rowHeader = "0x";
            var rowNumber = 0;
            var currRow = "";
            var memoryIndex = 0;
            for (var i = 0; i < 32; i++) {
                table += "<tr>";
                currRow = rowNumber.toString(16);
                while (currRow.length < 3) {
                    currRow = "0" + currRow;
                }
                currRow = currRow.toUpperCase();
                table += "<td style=\"font-weight:bold\">" + rowHeader + currRow + "</td>";
                for (var j = 0; j < 8; j++) {
                    if (_Memory.memory[memoryIndex] === null || _Memory.memory[memoryIndex] === undefined) {
                        table += "<td> 00 </td>";
                    }
                    else {
                        table += "<td>" + _Memory.memory[memoryIndex] + "</td>";
                    }
                    memoryIndex++;
                }
                table += "</tr>";
                rowNumber = rowNumber + 8;
            }
            table += "</tbody>";
            document.getElementById("memoryTable").innerHTML = table;
        };
        Control.cpuTable = function () {
            var table = "";
            table += "<td>" + _CPU.PC + "</td>";
            table += "<td>" + _CPU.Acc + "</td>";
            table += "<td>" + _Memory.memory[_ProcessControlBlock.progCounter] + "</td>";
            table += "<td>" + _CPU.Xreg + "</td>";
            table += "<td>" + _CPU.Yreg + "</td>";
            table += "<td>" + _CPU.Zflag + "</td>";
            document.getElementById("cpuTableBody").innerHTML = table;
        };
        Control.pcbTable = function () {
            var table = "";
            var i = 0;
            while (i < TSOS.PCB.pidint) {
                var pcb = _resList.getID(i);
                table += "<tr>";
                table += "<td>" + pcb.pid + "</td>";
                table += "<td>" + pcb.progCounter + "</td>";
                table += "<td>" + pcb.accumulater + "</td>";
                table += "<td>" + _Memory.memory[pcb.progCounter] + "</td>";
                table += "<td>" + pcb.xreg + "</td>";
                table += "<td>" + pcb.yreg + "</td>";
                table += "<td>" + pcb.zflag + "</td>";
                table += "<td>" + pcb.base + "</td>";
                table += "<td>" + pcb.limit + "</td>";
                table += "<td>" + pcb.terminated + "</td>";
                table += "</tr>";
                i++;
            }
            document.getElementById("pcbTableBody").innerHTML = table;
        };
        Control.singleStep = false;
        return Control;
    })();
    TSOS.Control = Control;
})(TSOS || (TSOS = {}));
