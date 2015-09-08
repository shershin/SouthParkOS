/* ------------
   Globals.ts

   Global CONSTANTS and _Variables.
   (Global over both the OS and Hardware Simulation / Host.)

   This code references page numbers in the text book:
   Operating System Concepts 8th edition by Silberschatz, Galvin, and Gagne.  ISBN 978-0-470-12872-5
   ------------ */
var APP_NAME = "TSOS";
var APP_VERSION = "0.07";
var CPU_CLOCK_INTERVAL = 100;
var TIMER_IRQ = 0;
var KEYBOARD_IRQ = 1;
var _CPU;
var _OSclock = 0;
var _Mode = 0;
var _Canvas;
var _DrawingContext;
var _DefaultFontFamily = "sans";
var _DefaultFontSize = 13;
var _FontHeightMargin = 4;
var _Trace = true;
var _Kernel;
var _KernelInterruptQueue;
var _KernelInputQueue = null;
var _KernelBuffers = null;
var _StdIn;
var _StdOut;
var _Console;
var _OsShell;
var _SarcasticMode = false;
var _krnKeyboardDriver;
var _hardwareClockID = null;
var Glados = null;
var _GLaDOS = null;
var onDocumentLoad = function () {
    TSOS.Control.hostInit();
};
