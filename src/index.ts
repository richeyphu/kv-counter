import { Router, compose } from 'worktop';
import { start } from 'worktop/cfw';
import * as Cache from 'worktop/cfw.cache';
import * as CORS from 'worktop/cors';
import * as Route from './routes';

import type { Context } from './types';

const API = new Router<Context>();

API.prepare = compose(
	CORS.preflight({
		origin: '*', // allow any `Origin` to connect
		headers: ['Cache-Control', 'Content-Type', 'X-Count'],
		methods: ['GET', 'OPTIONS'],
	}),
	Cache.sync()
);

API.add('GET', '/', Route.index);
API.add('GET', '/hit/:namespace?/:key', Route.hit);
API.add('GET', '/get/:namespace?/:key', Route.get);

// Module Worker
export default start(API.run);
