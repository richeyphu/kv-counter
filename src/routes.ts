import { reply } from 'worktop/response';
import * as Model from './models';
import { isKeyValid } from './utils';

import type { Handler } from './types';

/**
 * GET /
 */
export const index: Handler = (req, context) => {
	return reply(200, { message: 'Hello, World!' });
};

/**
 * GET /hit/:namespace?/:key
 */
export const hit: Handler = async (req, context) => {
	const { namespace, key } = context.params;

	if (!isKeyValid(key) || !isKeyValid(namespace)) {
		return reply(400, { error: 'Invalid key/namespace' });
	}

	const data = await Model.hit(context.bindings.HITS, namespace, key);

	const headers = {
		'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
		Pragma: 'no-cache',
		Expires: '0',
		'Surrogate-Control': 'no-store',
	};

	return reply(200, { value: data }, headers);
};

/**
 * GET /get/:namespace?/:key
 */
export const get: Handler = async (req, context) => {
	const { namespace, key } = context.params;

	const data = await Model.get(context.bindings.HITS, namespace, key);

	return reply(200, { value: data });
};
