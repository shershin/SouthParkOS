///<reference path="../globals.ts" />

/* ------------
     CPU.ts

     Requires global.ts.

     Routines for the host CPU simulation, NOT for the OS itself.
     In this manner, it's A LITTLE BIT like a hypervisor,
     in that the Document environment inside a browser is the "bare metal" (so to speak) for which we write code
     that hosts our client OS. But that analogy only goes so far, and the lines are blurred, because we are using
     TypeScript/JavaScript in both the host and client environments.

     This code references page numbers in the text book:
     Operating System Concepts 8th edition by Silberschatz, Galvin, and Gagne.  ISBN 978-0-470-12872-5
     ------------ */

module TSOS {

    export class Cpu {

        constructor(public PC: number = 0,
                    public Acc: number = 0,
                    public Xreg: number = 0,
                    public Yreg: number = 0,
                    public Zflag: number = 0,
                    public isExecuting: boolean = false) {

        }

        public init(): void {
            this.PC = 0;
            this.Acc = 0;
            this.Xreg = 0;
            this.Yreg = 0;
            this.Zflag = 0;
            this.isExecuting = false;
        }

        public cycle(): void {
            _Kernel.krnTrace('CPU cycle');
            // TODO: Accumulate CPU usage and profiling statistics here.
            // Do the real work here. Be sure to set this.isExecuting appropriately.
        }
        public memoryLoad(args){
          var i = 0;
          var j = 0;
          var x = 0;
          while (i < args.length){
            while (j < 4){
              _OsShell.memory[_OsShell.pidInt] = [];
              while (x < 2){
                var con1 = args.charAt(i);
                var con2 = args.charAt(i+1);
                _OsShell.memory[_OsShell.pidInt][j] = con1.concat(con2);
                i = i + 2;
              }
              j = j + 1;
            }
            _OsShell.pidInt = _OsShell.pidInt + 1;
          }
          _StdOut.putText("Program loaded.");
        }
    }
}
