var APP_NAME = "Drugs are bad m\'kay";
var APP_VERSION = ".117";
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
var _Memory;
var _MemoryManager;
var _ProcessControlBlock;
var mem_size = 256;
var schedulerTime = 6;
var onDocumentLoad = function () {
    TSOS.Control.hostInit();
};
