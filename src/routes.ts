import { reply } from 'worktop/response';
import * as Model from './models';

import type { Handler } from './types';

/**
 * GET /
 */
export const index: Handler = function (req, context) {
	return reply(200, { message: 'Hello, World!' });
};

/**
 * GET /hit/:key
 */
export const hit: Handler = async function (req, context) {
	const { key } = context.params;

	const data = await Model.hit(context.bindings.HITS, key);

	return reply(200, { value: data });
};
