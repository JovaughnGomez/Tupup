import { createClient } from 'redis'

const client = createClient()

client.on('error', err => console.log(err))

if (!client.isOpen) {
  client.connect();
}

export const add = (key, value) => client.set(key, value)
export const get = (key) => client.get(key)
export const redisDelete = (key) => client.del(key)

export default client