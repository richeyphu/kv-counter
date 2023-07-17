import { Router } from 'worktop';
import { start } from 'worktop/cfw';
import * as Cache from 'worktop/cfw.cache';
import * as Route from './routes';

import type { Context } from './types';

const API = new Router<Context>();

API.prepare = Cache.sync();

API.add('GET', '/', Route.index);
API.add('GET', '/hit/:key', Route.hit);
API.add('GET', '/get/:key', Route.get);

// Module Worker
export default start(API.run);
