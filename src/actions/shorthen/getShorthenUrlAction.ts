import redisClient, { getCache, setCache, parseJson } from '../../utils/redis';
import ShorthendLink from '../../models/ShorthendLink';

export const getShorthendUrl = async (code:string) => {
    // Get data from Redis cache
    const cachedData = await getCache(code);
    if (cachedData) return cachedData;
  
    try {
            
        let newData = await ShorthendLink.get({short_link:code});
        if(newData !== null){
            await setCache(code, newData);// Store data in Redis cache
            return newData;
        }

        return false;
    } catch (error) {
        console.log(error)
        return false;
    }
    

    // Remove data from Redis cache
    // await removeCache(key);
};
