export const toKeyname = (namespace: string | null, key: string) => `name::${namespace ?? 'default'}::key::${key}`;
