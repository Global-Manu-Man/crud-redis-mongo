import { createClient } from 'redis';

const client = createClient({
  url: process.env.REDIS_URI
});

client.on('error', (err) => console.log('Redis Client Error', err));

export const connectRedis = async () => {
  await client.connect();
  console.log('Redis Connected');
};

export const getCache = async (key) => {
  return await client.get(key);
};

export const setCache = async (key, value, ttl = 3600) => {
  await client.set(key, value, { EX: ttl });
};

export const deleteCache = async (key) => {
  await client.del(key);
};

export default client;