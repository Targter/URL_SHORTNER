import { createClient } from 'redis';

// // in this redis use the default url.. 
const client = createClient({
    url:process.env.REDIS_URL || 'redis://redis:6379'
});

client.on('error', err => console.log('Redis Client Error', err));

await client.connect().then(() => console.log("redis client connected.. "));



// await client.quit();
export default client; 


// import { Redis } from 'ioredis';

// const client = new Redis();

// // await redis.set('key', 'value');
// // const value = await redis.get('key');
// // console.log(value); // >>> value

// // await redis.hset('user-session:123', {
// //     name: 'John',
// //     surname: 'Smith',
// //     company: 'Redis',
// //     age: 29
// // });

// // const userSession = await redis.hgetall('user-session:123');
// // console.log(JSON.stringify(userSession, null, 2));
// // /* >>>
// // {
// //   "surname": "Smith",
// //   "name": "John",
// //   "company": "Redis",
// //   "age": "29"
// // }
// //  */

// // redis.disconnect();

// export default client