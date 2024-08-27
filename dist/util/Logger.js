"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerColor = void 0;
var LoggerColor;
(function (LoggerColor) {
    LoggerColor["yellow"] = "\u001B[33m";
    LoggerColor["red"] = "\u001B[31m";
    LoggerColor["bright_red"] = "\u001B[91m";
    LoggerColor["bright_white"] = "\u001B[97m";
    LoggerColor["blue"] = "\u001B[34m";
    LoggerColor["green"] = "\u001B[32m";
    LoggerColor["magenta"] = "\u001B[35m";
    LoggerColor["reset"] = "\u001B[0m";
    LoggerColor["gray"] = "\u001B[90m";
})(LoggerColor || (exports.LoggerColor = LoggerColor = {}));
var LOG;
(function (LOG) {
    LOG[LOG["NONE"] = 0] = "NONE";
    LOG[LOG["REDUNDANT"] = 1] = "REDUNDANT";
    LOG[LOG["ERRORS"] = 2] = "ERRORS";
    LOG[LOG["INFO"] = 4] = "INFO";
    LOG[LOG["SUCCESS"] = 8] = "SUCCESS";
    LOG[LOG["IMPORTANT"] = 16] = "IMPORTANT";
    LOG[LOG["NORMAL"] = 30] = "NORMAL";
    LOG[LOG["INFORMATIVE"] = 26] = "INFORMATIVE";
    LOG[LOG["MINIMAL"] = 18] = "MINIMAL";
    LOG[LOG["ALL"] = 31] = "ALL";
})(LOG || (LOG = {}));
class Logger {
    static setDebugMode(mode) {
        this.state = mode;
    }
    static test(test) {
        return (this.state & test) == test;
    }
    static time() {
        return LoggerColor.gray + "[" + new Date().toUTCString() + "] ";
    }
    static log(message, ...args) {
        if (!this.test(LOG.REDUNDANT))
            return;
        this.call(message, LoggerColor.reset, ...args);
    }
    static info(message, ...args) {
        if (!this.test(LOG.INFO))
            return;
        this.call(message, LoggerColor.blue, ...args);
    }
    static success(message, ...args) {
        if (!this.test(LOG.SUCCESS))
            return;
        this.call(message, LoggerColor.green, ...args);
    }
    static error(message, ...args) {
        if (!this.test(LOG.ERRORS))
            return;
        this.call(message, LoggerColor.red, ...args);
    }
    static warn(message, ...args) {
        if (!this.test(LOG.INFO))
            return;
        this.call(message, LoggerColor.yellow, ...args);
    }
    static fatal(message, ...args) {
        if (!this.test(LOG.IMPORTANT))
            return;
        this.call(message, LoggerColor.bright_red, ...args);
    }
    static important(message, ...args) {
        if (!this.test(LOG.IMPORTANT))
            return;
        this.call(message, LoggerColor.magenta, ...args);
    }
    static call(message, color, ...args) {
        let str = color + message + LoggerColor.reset;
        args.forEach(e => {
            str = str.replace("{}", LoggerColor.bright_white + e + color);
        });
        args.forEach((e, i) => {
            str = str.replace("{" + i + "}", LoggerColor.bright_white + e + color);
        });
        str = str.replace(/(\r\n|\n|\r)/gm, "\n" + this.time() + color);
        console.log(this.time() + str);
    }
    static clearLine() {
        if (process.stdout.moveCursor)
            process.stdout.moveCursor(0, -1);
        if (process.stdout.clearLine)
            process.stdout.clearLine(1);
    }
    static clear() {
        console.clear();
    }
}
Logger.LOG = LOG;
Logger.state = LOG.ALL;
exports.default = Logger;
Logger.setDebugMode(Logger.LOG.ALL);
