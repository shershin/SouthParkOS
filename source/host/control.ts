///<reference path="../globals.ts" />
///<reference path="../os/canvastext.ts" />

/* ------------
     Control.ts

     Requires globals.ts.

     Routines for the hardware simulation, NOT for our client OS itself.
     These are static because we are never going to instantiate them, because they represent the hardware.
     In this manner, it's A LITTLE BIT like a hypervisor, in that the Document environment inside a browser
     is the "bare metal" (so to speak) for which we write code that hosts our client OS.
     But that analogy only goes so far, and the lines are blurred, because we are using TypeScript/JavaScript
     in both the host and client environments.

     This (and other host/simulation scripts) is the only place that we should see "web" code, such as
     DOM manipulation and event handling, and so on.  (Index.html is -- obviously -- the only place for markup.)

     This code references page numbers in the text book:
     Operating System Concepts 8th edition by Silberschatz, Galvin, and Gagne.  ISBN 978-0-470-12872-5
     ------------ */

//
// Control Services
//
module TSOS {

    export class Control {

        public  static singleStep = false;

        public static hostInit(): void {
            // This is called from index.html's onLoad event via the onDocumentLoad function pointer.

            // Get a global reference to the canvas.  TODO: Should we move this stuff into a Display Device Driver?
            _Canvas = <HTMLCanvasElement>document.getElementById('display');

            // Get a global reference to the drawing context.
            _DrawingContext = _Canvas.getContext("2d");

            // Enable the added-in canvas text functions (see canvastext.ts for provenance and details).
            CanvasTextFunctions.enable(_DrawingContext);   // Text functionality is now built in to the HTML5 canvas. But this is old-school, and fun, so we'll keep it.

            // Clear the log text box.
            // Use the TypeScript cast to HTMLInputElement
            (<HTMLInputElement> document.getElementById("taHostLog")).value="";

            // Set focus on the start button.
            // Use the TypeScript cast to HTMLInputElement
            (<HTMLInputElement> document.getElementById("btnStartOS")).focus();

            // Check for our testing and enrichment core, which
            // may be referenced here (from index.html) as function Glados().
            if (typeof Glados === "function") {
                // function Glados() is here, so instantiate Her into
                // the global (and properly capitalized) _GLaDOS variable.
                _GLaDOS = new Glados();
                _GLaDOS.init();
            }
        }

        public static hostLog(msg: string, source: string = "?"): void {
            // Note the OS CLOCK.
            var clock: number = _OSclock;

            // Note the REAL clock in milliseconds since January 1, 1970.
            var now: number = new Date().getTime();

            // Build the log string.
            var str: string = "({ clock:" + clock + ", source:" + source + ", msg:" + msg + ", now:" + now  + " })"  + "\n";

            // Update the log console.
            var taLog = <HTMLInputElement> document.getElementById("taHostLog");
            taLog.value = str + taLog.value;

            // TODO in the future: Optionally update a log database or some streaming service.
        }


        //
        // Host Events
        //
        public static hostBtnStartOS_click(btn): void {
            // Disable the (passed-in) start button...
            btn.disabled = true;

            // .. enable the Halt and Reset buttons ...
            (<HTMLButtonElement>document.getElementById("btnHaltOS")).disabled = false;
            (<HTMLButtonElement>document.getElementById("btnReset")).disabled = false;

            // .. set focus on the OS console display ...
            document.getElementById("display").focus();


            _Memory = new Memory();
            _Memory.init();
            _hardDrive = new hardDrive();
            _hardDrive.init();
            // ... Create and initialize the CPU (because it's part of the hardware)  ...
            _CPU = new Cpu();  // Note: We could simulate multi-core systems by instantiating more than one instance of the CPU here.
            _CPU.init();       //       There's more to do, like dealing with scheduling and such, but this would be a start. Pretty cool.

            _CpuSched = new CPU_Scheduler();
            _resList = new residentList();
            //_hardDrive = new HardDrive();

            _MemoryManager = new MemoryManager();
            _MemoryManager.clearMem();


            _Queue = new Queue();

            // ... then set the host clock pulse ...
            _hardwareClockID = setInterval(Devices.hostClockPulse, CPU_CLOCK_INTERVAL);
            // .. and call the OS Kernel Bootstrap routine.
            _Kernel = new Kernel();
            _Kernel.krnBootstrap();  // _GLaDOS.afterStartup() will get called in there, if configured.
            this.memoryTable();
            this.cpuTable();
        }

        public static hostBtnHaltOS_click(btn): void {
            Control.hostLog("Emergency halt", "host");
            Control.hostLog("Attempting Kernel shutdown.", "host");
            // Call the OS shutdown routine.
            _Kernel.krnShutdown();
            // Stop the interval that's simulating our clock pulse.
            clearInterval(_hardwareClockID);
            // TODO: Is there anything else we need to do here?
        }

        public static hostBtnReset_click(btn): void {
            // The easiest and most thorough way to do this is to reload (not refresh) the document.
            location.reload(true);
            // That boolean parameter is the 'forceget' flag. When it is true it causes the page to always
            // be reloaded from the server. If it is false or not specified the browser may reload the
            // page from its cache, which is not what we want.
        }
        public static singleStep_click(btn): void {
          var on = false;
          var butn = <HTMLInputElement>document.getElementById('stepOne');
          var butnThis = <HTMLInputElement>document.getElementById('singleStep');
          if(butn.disabled){
            butn.disabled = false;
            butnThis.value = "Single Step: On";
            this.singleStep = true;
          }else if (!butn.disabled){
            butn.disabled = true;
            butnThis.value = "Single Step: Off";
            this.singleStep = false;
          }
        }
        public static stepOne_click(): void {
          _CPU.cycle();
        }
        public static memoryTable(): void {
         var table: string = "<tbody>";
         var rowHeader: string = "0x";
         var rowNumber: number = 0;
         var currRow: string = "";
         var memoryIndex: number = 0;

         for (var i: number = 0; i < 32; i++){
           table += "<tr>";
           currRow = rowNumber.toString(16);
           while(currRow.length < 3){
             currRow = "0" + currRow;
           }
           currRow = currRow.toUpperCase();
           table += "<td style=\"font-weight:bold\">" + rowHeader + currRow + "</td>";
           for(var j: number = 0; j < 8; j++){
             if (_Memory.memory[memoryIndex] === null || _Memory.memory[memoryIndex] === undefined){
               table += "<td> 00 </td>";
             }else{
              table += "<td>" + _Memory.memory[memoryIndex] + "</td>";
             }
             memoryIndex++;
           }
           table += "</tr>";
           rowNumber = rowNumber + 8;
         }
         table += "</tbody>";
         (<HTMLInputElement> document.getElementById("memoryTable")).innerHTML = table;
       }
       public static cpuTable(): void {
         var table: string = "";
         table += "<td>" + _CPU.PC + "</td>";
         table += "<td>" + _CPU.Acc + "</td>";
         table += "<td>" + _Memory.memory[_ProcessControlBlock.progCounter] + "</td>";
         table += "<td>" + _CPU.Xreg + "</td>";
         table += "<td>" + _CPU.Yreg + "</td>";
         table += "<td>" + _CPU.Zflag + "</td>";
        (<HTMLInputElement> document.getElementById("cpuTableBody")).innerHTML = table;
       }
       public static pcbTable(): void {
         var table: string = "";
         var i = 0;
         while (i < PCB.pidint){
           var pcb = _resList.pcblist[i];
           table += "<tr>";
           table += "<td>" + pcb.pid + "</td>";
           table += "<td>" + pcb.progCounter + "</td>";
           table += "<td>" + pcb.accumulater + "</td>";
           table += "<td>" + _Memory.memory[pcb.progCounter] + "</td>";
           table += "<td>" + pcb.xreg + "</td>";
           table += "<td>" + pcb.yreg + "</td>";
           table += "<td>" + pcb.zflag + "</td>";
           table += "<td>" + pcb.partition + "</td>";
           table += "<td>" + pcb.base + "</td>";
           table += "<td>" + pcb.limit + "</td>";
           table += "<td>" + pcb.priority + "</td>";
           table += "<td>" + pcb.proccessState + "</td>";
           table += "<td>" + pcb.loc + "</td>";
           table += "</tr>";
           i++;
         }
        (<HTMLInputElement> document.getElementById("pcbTableBody")).innerHTML = table;
       }

       public static hdTable(): void {
         var table = "";
         var memLoc = 0;
         for (var i = 0; i < 4; i++){
           for (var j = 0; j < 8; j++){
             for (var x = 0; x < 8; x++){
              // console.log(i + ":" + j + ":" + x);
               //console.log("memloc " + memLoc);
               table += "<tr>";
               table += "<td>" + i + ":" + j + ":" + x + "</td>";
               table += "<td>" + _hardDrive.hDMeta[memLoc] + "</td>";
               table += "<td>" + _hardDrive.hardDriveMem[memLoc] + "</td>";
               table += "</tr>";
               memLoc++;
             }
           }
         }

         (<HTMLInputElement> document.getElementById("hardDriveTable")).innerHTML = table;
       }
    }
}
