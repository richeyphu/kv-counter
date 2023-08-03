export const toKeyname = (namespace: string | null, key: string) => `name::${namespace ?? 'default'}::key::${key}`;

export const isKeyValid = (key: string) => /^[a-z0-9\-_.]{1,64}$/i.test(key);
