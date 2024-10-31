import { createClient } from 'redis'
import { GenerateCSRFToken, GenerateHash } from './utils';

const client = createClient()

client.on('error', err => console.log(err))

if (!client.isOpen) {
  client.connect();
}

export const add = (key, value) => client.set(key, value)
export const get = (key) => client.get(key)
export const redisDelete = (key) => client.del(key)
export const addTokenWithTTL = (key, value, ttlInSeconds) => {
  if(!ttlInSeconds)
    ttlInSeconds = 10 * 60 // 10 minutes * 60 seconds 

  return client.setEx(key, ttlInSeconds, value);
}

export async function AddTokenToRedisWithTTL(key, ttlInSeconds)
{
  if(!key)
    return { success: false };

  if(!ttlInSeconds)
    ttlInSeconds = 10 * 60 // 10 minutes * 60 seconds

  const originalToken = GenerateCSRFToken();
  const hashedToken = await GenerateHash(originalToken)
  const value = await client.setEx(key, ttlInSeconds, hashedToken);
  return {
    success: true,
    originalToken,
    createdAt: Date.now(),
  }
}

export async function RetrieveTokenRedis(prefix, key)
{
  if(!prefix || !key)
    return { success: false, reason: "Prefix or Key is Null" };

  try {
    const token = await get(`${prefix}:${key}`);
    if(!token)
      return { success: false, reason: "Token was not found." };

    return { success: true, token };
  } catch (error) {
    return { success: false, reason: "Unexpected Error" };
  }
}

export async function DeleteTokenRedis(prefix, key)
{
  if(!prefix || !key)
    return { success: false, reason: "Prefix or Key is Null" };

  try {
    const isDeleted = await redisDelete(`${prefix}:${key}`);
    return { success: true, isDeleted };
  } catch (error) {
    return { success: false, reason: "Unexpected Error" };
  }   
}

export default client