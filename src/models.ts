import { read, write } from 'worktop/cfw.kv';
import { toKeyname } from './utils';

import type { KV } from 'worktop/cfw.kv';

/**
 * Increment the counter for a given key
 */
export const hit = async (HITS: KV.Namespace, namespace: string | null, key: string): Promise<number> => {
	const keyname = toKeyname(namespace, key);

	const value = await read<number>(HITS, keyname, 'json');
	if (value === null) {
		await write(HITS, keyname, 1);
		return 1;
	}

	await write(HITS, keyname, value + 1);
	return value + 1;
};

/**
 * Get the counter for a given key
 */
export const get = async (HITS: KV.Namespace, namespace: string | null, key: string): Promise<number> => {
	const keyname = toKeyname(namespace, key);
	const value = await read<number>(HITS, keyname, 'json');

	return value || 0;
};
