
let _infoLogger: LogFunction = console.info;
let _errorLogger: LogFunction = console.error;

export type LogFunction = (message: string) => void;

export function initLogger(infoLogger?: LogFunction, errorLogger?: LogFunction) {
	if (infoLogger !== undefined && infoLogger !== null) _infoLogger = infoLogger;
	if (errorLogger !== undefined && errorLogger !== null) _errorLogger = errorLogger;
}

export function info(message: string) {
	_infoLogger(message);
}

export function error(message: string) {
	_errorLogger(message);
}
