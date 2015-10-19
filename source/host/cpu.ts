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
            this.execute(_ProcessControlBlock.pidArray[_ProcessControlBlock.pidToRun], _Memory.memory[_ProcessControlBlock.progCounter].toString());
        }
        public execute (arry, args){
          _ProcessControlBlock.progCounter++;
          var caps = args.toUpperCase();
          switch (caps){
              case "A9":
                this.ldaCon();
              break;
              case "AD":
                this.ldaMem();
              break;
              case "8D":
                this.staMem();
              break;
              case "6D":
                this.adc();
              break;
              case "A2":
                this.ldxCon();
              break;
              case "AE":
                this.ldxMem();
              break;
              case "A0":
                this.ldaCon()
              break;
              case "AC":
                this.ldaMem();
              break;
              case "EA":
                this.nop();
              break;
              case "00":
                this.brk();
              break;
              case "EC":
                this.cpx();
              break;
              case "D0":
                this.bne();
              break;
              case "EE":
                this.inc();
              break;
              case "FF":
                this.sys();
              break;
              default:
              _StdOut.putText("Ummmm this is weird....now what do we do");
            }
        }

        public ldaCon(){
          //load the accumulator with a constant
          Control.hostLog("lda");
          _ProcessControlBlock.progCounter++;
          _ProcessControlBlock.accumulater = _Memory.memory[_ProcessControlBlock.progCounter];
        }
        public ldaMem(){
          //load the accumulator from memory

        }
        public staMem(){
          //store the accumulator in memory

        }
        public adc(){
          //add with cary

        }
        public ldxCon(){
          //load the x reg with a constant

        }
        public ldxMem(){
          //load the x reg from memory

        }
        public ldyCon(){
          //load the y reg with a constant

        }
        public ldyMem(){
          //load the y reg from memory

        }
        public nop(){
          //no operation

        }
        public brk(){
          //time to take a break
        }
        public cpx(){
          //compare a byte in memory to the x reg

        }
        public bne(){
          //brance n bytes if z

        }
        public inc(){
          //incermebt the value of a byte

        }
        public sys(){
          //system call

        }
    }
}
