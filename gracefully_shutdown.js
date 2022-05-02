'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

let _infoLogger = console.info;
let _errorLogger = console.error;
function initLogger(infoLogger, errorLogger) {
    if (infoLogger !== undefined && infoLogger !== null)
        _infoLogger = infoLogger;
    if (errorLogger !== undefined && errorLogger !== null)
        _errorLogger = errorLogger;
}
function info(message) {
    _infoLogger(message);
}
function error(message) {
    _errorLogger(message);
}

const SIGTERM = "SIGTERM";
const SIGINT = "SIGINT";
function checkError(err) {
    if (typeof err === "string") {
        error("Error in close operation. S:" + err);
    }
    else if (err instanceof Error) {
        error("Error in close operation. E:" + err.message);
    }
    else {
        error("Error in close operation. K:" + err);
    }
}
/**
 * This function support the common way for gracefully shutdown.
 * @param name operation name for logging.
 * @param onClose the handler to run on closing.
 */
function GracefullyShutdown(name, onClose) {
    let isClosed = false;
    function closeConnection() {
        if (isClosed) {
            return;
        }
        isClosed = true;
        process.off(SIGTERM, closeConnection);
        process.off(SIGINT, closeConnection);
        try {
            const result = onClose();
            if (result === undefined || result === null) {
                info(`${name} closed (S).`);
            }
            else if (result instanceof Promise) {
                result
                    .then(() => {
                    info(`${name} closed (A).`);
                })
                    .catch(checkError);
            }
        }
        catch (err) {
            checkError(err);
        }
    }
    process.on(SIGTERM, closeConnection);
    process.on(SIGINT, closeConnection);
}

exports.GracefullyShutdown = GracefullyShutdown;
exports.initLogger = initLogger;
//# sourceMappingURL=gracefully_shutdown.js.map
