/**
 * This function support the common way for gracefully shutdown.
 * @param name operation name for logging.
 * @param onClose the handler to run on closing.
 */
declare function GracefullyShutdown(name: string, onClose: () => void | Promise<void>): void;

declare type LogFunction = (message: string) => void;
declare function initLogger(infoLogger?: LogFunction, errorLogger?: LogFunction): void;

export { GracefullyShutdown, initLogger };
