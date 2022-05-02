# NodeJS - Gracefully Shutdown Tool
-----------------------------------

This tool provides a simple way to run the codes you want during the closing of the NodeJS application.

## Installation
```
npm i @alperkonuralp/gracefully-shutdown
```

## Usage

```typescript
import { GracefullyShutdown } from "@alperkonuralp/gracefully-shutdown";

GracefullyShutdown(name: string, onClose: () => void | Promise<void>)
```
### Parameters
*name:* The name for logging.

*onClose:* The function delegate to run on shutdown.


### Example
```typescript
import _ from "lodash";
import { RedisClientType, createClient } from "redis";
import { AppConfig } from "./types";
import logger from './logging';
import { GracefullyShutdown } from "@alperkonuralp/gracefully-shutdown";

let _client: RedisClientType;

export async function init(config: AppConfig) {
	_client = createClient({
		url: `redis://${config.redis.host}:${config.redis.port}/${config.redis.dbIndex}`,
		password: config.redis.password,
	});

	_client.on("error", (err) => logger.error("Redis Client Error", err));

	await _client.connect();
}

GracefullyShutdown("Redis", () => {
	if (!_.isNil(_client)) {
		_client.quit();
	}
});
```

## Logging
This api use a console for standart logging. But if you want to change it, you set a 2 function for logging.

```typescript
export type LogFunction = (message: string) => void;

export function initLogger(infoLogger?: LogFunction, errorLogger?: LogFunction);
```

### Parameters

*infoLogger:* The logger function for informations. Default value is `console.log`.

*errorLogger:* The logger function for errors. Default value is `console.error`.


### Example (winston)
```typescript
import { createLogger, format as _format, transports as _transports } from 'winston';
import { initLogger } from '@alperkonuralp/gracefully-shutdown';

const logger = createLogger({
	level: process.env.LOGLEVEL || 'info',
	format: _format.combine(
		_format.timestamp(),
		_format.json(),
	),
	defaultMeta,
	transports,
	// exceptionHandlers: exceptionHandlers,
	// rejectionHandlers: rejectionHandlers
});


initLogger(logger.info, logger.error);
```
