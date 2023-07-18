import { read, write } from 'worktop/cfw.kv';

import type { KV } from 'worktop/cfw.kv';

/**
 * Increment the counter for a given key
 */
export const hit = async (HITS: KV.Namespace, key: string): Promise<number> => {
	const value = await read<number>(HITS, key, 'json');

	if (value === null) {
		await write(HITS, key, 1);
		return 1;
	}

	await write(HITS, key, value + 1);
	return value + 1;
};

/**
 * Get the counter for a given key
 */
export const get = async (HITS: KV.Namespace, key: string): Promise<number> => {
	const value = await read<number>(HITS, key, 'json');
	return value || 0;
};
