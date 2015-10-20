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
            this.execute(_Memory.memory[_ProcessControlBlock.progCounter]);
        }
        public execute (args){
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
              this.isExecuting = false;
            }
        }

        public ldaCon(){
          //load the accumulator with a constant
          _ProcessControlBlock.progCounter++;
          Control.hostLog("lda" + _Memory.memory[_ProcessControlBlock.progCounter]);
          _ProcessControlBlock.accumulater = _Memory.memory[_ProcessControlBlock.progCounter];
        }
        public ldaMem(){
          //load the accumulator from memory
          var spot1 = _Memory.memory[_ProcessControlBlock.progCounter + 1];
          var spot2 = _Memory.memory[_ProcessControlBlock.progCounter + 2];
          Control.hostLog("lda" + " " + spot1 + " " + spot2);
          var swap = Utils.littleE(spot1, spot2);
          var dec = Utils.fromHex(swap);
          _ProcessControlBlock.accumulater = _Memory.memory[dec];
          _ProcessControlBlock.progCounter + 2;
        }
        public staMem(){
          //store the accumulator in memory
          var spot1 = _Memory.memory[_ProcessControlBlock.progCounter + 1];
          var spot2 = _Memory.memory[_ProcessControlBlock.progCounter + 2];
          Control.hostLog("sta" + " " + spot1 + " " + spot2);
          var swap = Utils.littleE(spot1, spot2);
          var dec = Utils.fromHex(swap);
          _Memory.memory[dec] = _ProcessControlBlock.accumulater;
          _ProcessControlBlock.progCounter + 2;
        }
        public adc(){
          //add with cary
          var spot1 = _Memory.memory[_ProcessControlBlock.progCounter + 1];
          var spot2 = _Memory.memory[_ProcessControlBlock.progCounter + 2];
          Control.hostLog("adc" + " " + spot1 + " " + spot2);
          var swap = Utils.littleE(spot1, spot2);
          var dec = Utils.fromHex(swap);
          _ProcessControlBlock.accumulater += dec;
          _ProcessControlBlock.progCounter + 2;
        }
        public ldxCon(){
          //load the x reg with a constant
          _ProcessControlBlock.progCounter++;
          Control.hostLog("ldx" + _Memory.memory[_ProcessControlBlock.progCounter]);
          _ProcessControlBlock.xreg = _Memory.memory[_ProcessControlBlock.progCounter];
        }
        public ldxMem(){
          //load the x reg from memory
          var spot1 = _Memory.memory[_ProcessControlBlock.progCounter + 1];
          var spot2 = _Memory.memory[_ProcessControlBlock.progCounter + 2];
          Control.hostLog("ldx" + " " + spot1 + " " + spot2);
          var swap = Utils.littleE(spot1, spot2);
          var dec = Utils.fromHex(swap);
          _ProcessControlBlock.xreg = _Memory.memory[dec];
          _ProcessControlBlock.progCounter + 2;
        }
        public ldyCon(){
          //load the y reg with a constant
          _ProcessControlBlock.progCounter++;
          Control.hostLog("ldy" + _Memory.memory[_ProcessControlBlock.progCounter]);
          _ProcessControlBlock.yreg = _Memory.memory[_ProcessControlBlock.progCounter];
        }
        public ldyMem(){
          //load the y reg from memory
          var spot1 = _Memory.memory[_ProcessControlBlock.progCounter + 1];
          var spot2 = _Memory.memory[_ProcessControlBlock.progCounter + 2];
          Control.hostLog("ldy" + " " + spot1 + " " + spot2);
          var swap = Utils.littleE(spot1, spot2);
          var dec = Utils.fromHex(swap);
          _ProcessControlBlock.yreg = _Memory.memory[dec];
          _ProcessControlBlock.progCounter + 2;
        }
        public nop(){
          //no operation
          _ProcessControlBlock.progCounter++;
          Control.hostLog("no operation");
        }
        public brk(){
          //time to take a break
          _ProcessControlBlock.progCounter++;
          Control.hostLog("coffee break");
          this.isExecuting = false;
        }
        public cpx(){
          //compare a byte in memory to the x reg
          var spot1 = _Memory.memory[_ProcessControlBlock.progCounter + 1];
          var spot2 = _Memory.memory[_ProcessControlBlock.progCounter + 2];
          Control.hostLog("cpx" + " " + spot1 + " " + spot2);
          var swap = Utils.littleE(spot1, spot2);
          var dec = Utils.fromHex(swap);
          if (_ProcessControlBlock.xreg === _Memory.memory[dec]){
            _ProcessControlBlock.zflag = 0;
          }else{
            _ProcessControlBlock.zflag = 1;
          }
          _ProcessControlBlock.progCounter + 2;
        }
        public bne(){
          //brance n bytes if z
          var spot1 = _Memory.memory[_ProcessControlBlock.progCounter + 1];
          Control.hostLog("bne" + " " + spot1);
          if(_ProcessControlBlock.zflag === 0){
            _ProcessControlBlock.progCounter = spot1;
          }else{
            _ProcessControlBlock.progCounter++;
          }
        }
        public inc(){
          //incermebt the value of a byte
          var spot1 = _Memory.memory[_ProcessControlBlock.progCounter + 1];
          var spot2 = _Memory.memory[_ProcessControlBlock.progCounter + 2];
          Control.hostLog("inc" + " " + spot1 + " " + spot2);
          var swap = Utils.littleE(spot1, spot2);
          var dec = Utils.fromHex(swap);
          var out = _Memory.memory[dec];
          var dec2 = Utils.fromHex(out);
          var hex = Utils.toHex(dec2 + 1);
          _Memory.memory[dec] = hex;
          _ProcessControlBlock.progCounter + 2;
        }
        public sys(){
          //system call
          if (_ProcessControlBlock.xreg === 1){
            //print the int stored in yreg
            _StdOut.putText(_ProcessControlBlock.yreg);
          }else if(_ProcessControlBlock.xreg === 2){
            //prints the string from memory starting at location saved in yreg
          }
          _ProcessControlBlock.progCounter++;
        }
    }
}
