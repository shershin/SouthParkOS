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
            Control.cpuTable();
        }
        public execute (args){
          console.log(_ProcessControlBlock.progCounter + " " + _Memory.memory[_ProcessControlBlock.progCounter])
          _ProcessControlBlock.incerPC();
          var caps = args;
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
                this.ldyCon()
              break;
              case "AC":
                this.ldyMem();
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
          var dec = Utils.fromHex(_Memory.memory[_ProcessControlBlock.progCounter]);
          Control.hostLog("lda " + _Memory.memory[_ProcessControlBlock.progCounter]);
          _ProcessControlBlock.accumulater = dec;
          _ProcessControlBlock.incerPC();
        }
        public ldaMem(){
          //load the accumulator from memory
          var spot1 = _Memory.memory[_ProcessControlBlock.progCounter];
          var spot2 = _Memory.memory[_ProcessControlBlock.progCounter + 1];
          Control.hostLog("lda" + " " + spot1 + " " + spot2);
          var swap = Utils.littleE(spot1, spot2);
          var dec = Utils.fromHex(swap);
          _ProcessControlBlock.accumulater = _Memory.memory[dec];
          _ProcessControlBlock.incerPC();
          _ProcessControlBlock.incerPC();
        }
        public staMem(){
          //store the accumulator in memory
          var spot1 = _Memory.memory[_ProcessControlBlock.progCounter];
          var spot2 = _Memory.memory[_ProcessControlBlock.progCounter + 1];
          Control.hostLog("sta" + " " + spot1 + " " + spot2);
          var swap = Utils.littleE(spot1, spot2);
          var dec = Utils.fromHex(swap);
          _Memory.memory[dec] = _ProcessControlBlock.accumulater;
          _ProcessControlBlock.incerPC();
          _ProcessControlBlock.incerPC();
        }
        public adc(){
          //add with cary
          var spot1 = _Memory.memory[_ProcessControlBlock.progCounter];
          var spot2 = _Memory.memory[_ProcessControlBlock.progCounter + 1];
          Control.hostLog("adc" + " " + spot1 + " " + spot2);
          var swap = Utils.littleE(spot1, spot2);
          var dec = Utils.fromHex(swap);
          _ProcessControlBlock.accumulater += dec;
          _ProcessControlBlock.incerPC();
          _ProcessControlBlock.incerPC();
        }
        public ldxCon(){
          //load the x reg with a constant
          var dec = Utils.fromHex(_Memory.memory[_ProcessControlBlock.progCounter]);
          Control.hostLog("ldx " + _Memory.memory[_ProcessControlBlock.progCounter]);
          this.Xreg = dec;
          _ProcessControlBlock.incerPC();
        }
        public ldxMem(){
          //load the x reg from memory
          var spot1 = _Memory.memory[_ProcessControlBlock.progCounter];
          var spot2 = _Memory.memory[_ProcessControlBlock.progCounter + 1];
          Control.hostLog("ldx" + " " + spot1 + " " + spot2);
          var swap = Utils.littleE(spot1, spot2);
          var dec = Utils.fromHex(swap);
          this.Xreg = _Memory.memory[dec];
          _ProcessControlBlock.incerPC();
          _ProcessControlBlock.incerPC();
        }
        public ldyCon(){
          //load the y reg with a constant
          var dec = Utils.fromHex(_Memory.memory[_ProcessControlBlock.progCounter]);
          Control.hostLog("ldy " + _Memory.memory[_ProcessControlBlock.progCounter]);
          this.Yreg = dec;
          _ProcessControlBlock.incerPC();
        }
        public ldyMem(){
          //load the y reg from memory
          var spot1 = _Memory.memory[_ProcessControlBlock.progCounter];
          var spot2 = _Memory.memory[_ProcessControlBlock.progCounter + 1];
          Control.hostLog("ldy" + " " + spot1 + " " + spot2);
          var swap = Utils.littleE(spot1, spot2);
          var dec = Utils.fromHex(swap);
          this.Yreg = _Memory.memory[dec];
          _ProcessControlBlock.incerPC();
          _ProcessControlBlock.incerPC();
          console.log(swap + " " + dec);
        }
        public nop(){
          //no operation
          Control.hostLog("no operation");
        }
        public brk(){
          //time to take a break
          _ProcessControlBlock.xreg = this.Xreg;
          _ProcessControlBlock.yreg = this.Yreg;
          _ProcessControlBlock.zflag = this.Zflag;
          _ProcessControlBlock.accumulater = this.Acc;
          Control.pcbTable(_ProcessControlBlock.pid);
          Control.hostLog("coffee break");
          this.isExecuting = false;
        }
        public cpx(){
          //compare a byte in memory to the x reg
          var spot1 = _Memory.memory[_ProcessControlBlock.progCounter];
          var spot2 = _Memory.memory[_ProcessControlBlock.progCounter + 1];
          Control.hostLog("cpx" + " " + spot1 + " " + spot2);
          var swap = Utils.littleE(spot1, spot2);
          var dec = Utils.fromHex(swap);
          //if the counter wants to go beyond the array send it back
          if (dec > (mem_size -1)){
            dec = dec - mem_size;
          }
          var dec2 = Utils.fromHex(_Memory.memory[dec]);
          if (this.Xreg === dec2){
            this.Zflag = 1;
          }else{
            this.Zflag = 0;
          }
          console.log(this.Xreg + " " + dec2 + " " + _ProcessControlBlock.progCounter);
          _ProcessControlBlock.incerPC();
          _ProcessControlBlock.incerPC();
        }
        public bne(){
          //brance n bytes if z
          console.log("bne" + this.Zflag);
          var spot1 = _Memory.memory[_ProcessControlBlock.progCounter];
          var dec = Utils.fromHex(spot1);
          Control.hostLog("bne" + " " + spot1);
          if(this.Zflag === 0){
            console.log("works " + dec + " " + spot1);
            var i = 0;
            while (i < dec){
              _ProcessControlBlock.incerPC();
              i++;
            }
          }
          _ProcessControlBlock.incerPC();
        }
        public inc(){
          //incermebt the value of a byte
          var spot1 = _Memory.memory[_ProcessControlBlock.progCounter];
          var spot2 = _Memory.memory[_ProcessControlBlock.progCounter + 1];
          Control.hostLog("inc" + " " + spot1 + " " + spot2);
          var swap = Utils.littleE(spot1, spot2);
          var dec = Utils.fromHex(swap);
          var out = _Memory.memory[dec];
          var dec2 = Utils.fromHex(out);
          dec2 = dec2 + 1;
          var hex = Utils.toHex(dec2);
          _Memory.memory[dec] = hex;
          _ProcessControlBlock.incerPC();
          _ProcessControlBlock.incerPC();
        }

        public sys(){
          //system call
          console.log("sys: " + this.Xreg + " " + this.Yreg);
          if (this.Xreg === 1){
            _StdOut.putText("" + this.Yreg);
            console.log(this.Yreg + "this works mother fucker");
          }else if(this.Xreg === 2){
            //prints the string from memory starting at location saved in yreg
            var loc = this.Yreg;
            var hex = _Memory.memory[loc];
            var str = "";
            var value = loc;
            while (value !== 0){
             str += Utils.stringHex(Utils.fromHex(_Memory.memory[loc]));
             loc++;
             value = Utils.fromHex(_Memory.memory[loc]);
             console.log(str + " " + value + " " + _Memory.memory[loc-1]);
           }
            _StdOut.putText(str);
            console.log("" + str);
          }else{
            console.log("no means no");
          }
        }
    }
}
