import { read, write } from 'worktop/cfw.kv';

import type { KV } from 'worktop/cfw.kv';

export async function hit(HITS: KV.Namespace, key: string): Promise<number> {
	const hits = await read<number>(HITS, key, 'json');

	if (hits === null) {
		await write(HITS, key, 1);
		return 1;
	}

	await write(HITS, key, hits + 1);
	
	return hits + 1;
}
