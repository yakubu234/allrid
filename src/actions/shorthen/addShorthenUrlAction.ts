import ShorthendLink from '../../models/ShorthendLink';
import redisClient, { getCache, setCache, parseJson } from '../../utils/redis';
import { generateRandomString } from '../../utils/randomStringGenerator'; 

export const addShorthenUrl = async (formData: any, url:any) => {
  try {

    formData.short_link = formData.short_link ?? await generateRandomString();
    formData.redirect_link = formData.redirect_link ?? formData.original_link;
    formData.short_url = `${url}`+formData.short_link;
    
    let shortLink = formData.uuid ? await ShorthendLink.add(formData): formData;

    if(shortLink !=null){
      await setCache(formData.short_link, shortLink); // add the record into redis     
      return {status:'success', message: 'successful' , data:{shortLink}}
    }

    throw new Error();

  } catch (error) {
    console.log(error) // please remove
    throw new Error();
  }
};