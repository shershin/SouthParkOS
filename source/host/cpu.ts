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
            // Do the real work here. Be sure to set this.isExecutingappropriately.
            _CpuSched.cycle();
            Control.cpuTable();
            Control.pcbTable();
            Control.memoryTable();
            this.execute();
        }
        public execute (){
          var holder = _Memory.memory[_currentPCB.progCounter];
          console.log(_currentPCB.progCounter + " " + _Memory.memory[_currentPCB.progCounter])
          _currentPCB.incerPC();
          _CpuSched.cpuCycle++;
          var caps = holder.toUpperCase();
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
          //op code A9
          //loads the constant into the accumulator
          var spot = _currentPCB.progCounter;
          var grab = Utils.grabberOne(spot);
          var dec = Utils.fromHex(grab);
          this.Acc = dec;
          Control.hostLog("lda " + grab);
          _currentPCB.incerPC();
        }

        public ldaMem(){
          //op code AD
          //loads the accumulator from memory
          var grab2 = Utils.grabberTwo();
          var dec = Utils.fromHex(grab2);
          var grab = Utils.grabberOne(dec);
          var decGrab = Utils.fromHex(grab);
          this.Acc = decGrab;
          Control.hostLog("lda " + grab2);
          _currentPCB.incerPC();
          _currentPCB.incerPC();
        }

        public  staMem(){
          //op code 8D
          //Stores the accumulator into the Memory
          var grab2 = Utils.grabberTwo();
          var dec = Utils.fromHex(grab2);
          var hex = Utils.toHex(this.Acc);
          _Memory.memory[dec] = hex;
          Control.hostLog("sta " + grab2);
          _currentPCB.incerPC();
          _currentPCB.incerPC();
        }

        public adc(){
          //op code 6D
          //adds contents of an address to the contents of the accumulator
          var grab2 = Utils.grabberTwo();
          var dec = Utils.fromHex(grab2);
          var grab = Utils.grabberOne(dec);
          var decGrab = Utils.fromHex(grab);
          this.Acc += decGrab;
          Control.hostLog("adc " + grab2);
          _currentPCB.incerPC();
          _currentPCB.incerPC();
        }

        public ldxCon(){
          //op code A2
          //load the x reg with a constant
          var spot = _currentPCB.progCounter;
          var grab = Utils.grabberOne(spot);
          var dec = Utils.fromHex(grab);
          this.Xreg = dec;
          Control.hostLog("ldx " + grab);
          _currentPCB.incerPC();
        }

        public ldxMem(){
          //op code AE
          //loads the x reg from memory
          var grab2 = Utils.grabberTwo();
          var dec = Utils.fromHex(grab2);
          var grab = Utils.grabberOne(dec);
          var decGrab = Utils.fromHex(grab);
          this.Xreg = decGrab;
          Control.hostLog("ldx " + grab2);
          _currentPCB.incerPC();
          _currentPCB.incerPC();
        }

        public ldyCon(){
          //op code A2
          //load the y reg with a constant
          var spot = _currentPCB.progCounter;
          var grab = Utils.grabberOne(spot);
          var dec = Utils.fromHex(grab);
          this.Yreg = dec;
          Control.hostLog("ldy " + grab);
          _currentPCB.incerPC();
        }

        public ldyMem(){
          //op code AE
          //loads the y reg from memory
          var grab2 = Utils.grabberTwo();
          var dec = Utils.fromHex(grab2);
          var grab = Utils.grabberOne(dec);
          var decGrab = Utils.fromHex(grab);
          this.Yreg = decGrab;
          Control.hostLog("ldy " + grab2);
          _currentPCB.incerPC();
          _currentPCB.incerPC();
        }

        public nop(){
          //op code EA
          //no operation
          Control.hostLog("nope nope nope");
          _currentPCB.incerPC();
        }

        public brk(){
          //op code 00
          //taking a break....or breaking a computer either or works
          Control.hostLog("Coffee Break");
          _currentPCB.terminated = true;
        }

        public cpx(){
          //op code EC
          //compare a byte in memory to the x reg if true then z = 1 else z = 0
          var grab2 = Utils.grabberTwo();
          var dec = Utils.fromHex(grab2);
          var grab = Utils.grabberOne(dec);
          var decGrab = Utils.fromHex(grab);
          if (decGrab === this.Xreg){
            this.Zflag = 1;
          }else{
            this.Zflag = 0;
          }
          Control.hostLog("cpx " + grab2);
          _currentPCB.incerPC();
          _currentPCB.incerPC();
        }

        public bne(){
          //op code D0
          //jumps to location indicated unless z = 1
          var spot = _currentPCB.progCounter;
          var grab = Utils.grabberOne(spot);
          var dec = Utils.fromHex(grab);
          var i = 0;
          if (this.Zflag === 0){
            while (i < dec){
              _currentPCB.incerPC();
              i++;
            }
          }
          Control.hostLog("bne " + grab);
          _currentPCB.incerPC();
        }

        public inc(){
          //op code EE
          //incerment the value of memory by one
          var grab2 = Utils.grabberTwo();
          var dec = Utils.fromHex(grab2);
          var grab = Utils.grabberOne(dec);
          var decGrab = Utils.fromHex(grab);
          var final = decGrab + 1;
          var hex = Utils.toHex(final);
          _Memory.memory[dec] = hex;
          Control.hostLog("inc " + grab2);
          _currentPCB.incerPC();
          _currentPCB.incerPC();
        }

        public sys(){
          //op code FF
          //system call
          //if xreg = 1 print the yreg
          //if xreg = 2 print the string starting at location stores in yreg
          if (this.Xreg === 1){
            _StdOut.putText("" + this.Yreg);
            console.log("print yreg " + this.Yreg);
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
           }
            _StdOut.putText(str);
            console.log("print string " + str);
          }else{
            console.log("no means no");
          }
          }


          public setCPU(){
            this.PC = _currentPCB.progCounter;
            this.Acc = _currentPCB.accumulater;
            this.Xreg = _currentPCB.xreg;
            this.Yreg = _currentPCB.yreg;
            this.Zflag = _currentPCB.zflag;
          }



    }
}
