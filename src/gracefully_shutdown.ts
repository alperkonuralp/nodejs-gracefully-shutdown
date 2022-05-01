import { error, info } from './logging';

const SIGTERM = "SIGTERM";
const SIGINT = "SIGINT";

function checkError(err: unknown) {
	if (typeof err === "string") {
		error("Error in close operation. S:" + err);
	} else if (err instanceof Error) {
		error("Error in close operation. E:" + err.message);
	} else {
		error("Error in close operation. K:" + err);
	}
}

/**
 * This function support the common way for gracefully shutdown.
 * @param name operation name for logging.
 * @param onClose the handler to run on closing.
 */
export function GracefullyShutdown(name: string, onClose: () => void | Promise<void>) {
	let isClosed = false;

	function closeConnection() {
		if (isClosed) { return; }

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
		catch (err: unknown) {
			checkError(err);
		}
	}
	process.on(SIGTERM, closeConnection);
	process.on(SIGINT, closeConnection);
}

