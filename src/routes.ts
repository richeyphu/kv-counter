import { reply } from 'worktop/response';
import * as Model from './models';

import type { Handler } from './types';

/**
 * GET /
 */
export const index: Handler = (req, context) => {
	return reply(200, { message: 'Hello, World!' });
};

/**
 * GET /hit/:key
 */
export const hit: Handler = async (req, context) => {
	const { key } = context.params;

	const data = await Model.hit(context.bindings.HITS, key);

	return reply(200, { value: data });
};

/**
 * GET /get/:key
 */
export const get: Handler = async (req, context) => {
	const { key } = context.params;

	const data = await Model.get(context.bindings.HITS, key);

	return reply(200, { value: data });
};
