import Redis from 'ioredis';
import { promisify } from 'util';

const { REDIS_HOST, REDIS_PORT, REDIS_TTL, REDIS_TIMEOUT, REDIS_PASSWORD } = process.env;

const redis = new Redis({
    host: REDIS_HOST,
    port: parseInt(REDIS_PORT || '6379', 10),
    password: REDIS_PASSWORD,
    enableReadyCheck: true,
    connectTimeout: parseInt(REDIS_TIMEOUT || '1000', 10),
    retryStrategy: (times) => Math.min(times * 50, 2000), // exponential backoff retry strategy
});

const getAsync = promisify(redis.get).bind(redis);
const setAsync = promisify(redis.set).bind(redis);
const expireAsync = promisify(redis.expire).bind(redis);
const delAsync = promisify(redis.del).bind(redis);

export async function getCache(key: string): Promise<any | null> {
    try {
        const cacheData = await getAsync(key);
        if (cacheData) {
            return JSON.parse(cacheData);
        }
        return null;
    } catch (error:any) {
        throw new Error(error);
    }
}

export async function setCache(key: string, data: any, ttl: number = parseInt(REDIS_TTL || '3600', 10)): Promise<void> {
    try {
        await setAsync(key, JSON.stringify(data));
        await expireAsync(key, ttl);
    } catch (error:any) {
        throw new Error(error);
    }
}

// export async function removeCache(key: string): Promise<void> {
//     try {
//         const cacheData = await getAsync(key);

//         if (cacheData !== null ) {
//           await delAsync(key);
//         }
//     } catch (error:any) {
//         throw new Error(error);
//     }
// }

export const parseJson = (str: string): any => {
    try {
        return JSON.parse(str);
    } catch (e) {
        return str;
    }
};

// Event listeners for error and ready states
redis.on('error', (err) => {
    console.error('Redis Error:', err);
});

redis.on('ready', () => {
    console.log('Connected to Redis');
});

export default redis;
