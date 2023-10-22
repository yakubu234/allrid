import { IntegerDataType } from "sequelize";
import ShorthendLink from "../models/ShorthendLink";

const length = 5;
export const generateRandomString  = async () => {

    let short_id: string;
    do {
        short_id = shortID();
      // Check if the shorthID already exists in your database here
      // If it exists, repeat the loop and generate another UUID
    } while (!(await isUniqueShortLink(short_id)));
    return short_id;
  
}

const isUniqueShortLink = async (randomString: string): Promise<boolean> =>  
{
  try {
    const existingShortID = await ShorthendLink.get({short_link:randomString });
    // If an existing user with the same UUID is found, return false
    return !existingShortID;
  } catch (error) {
    console.error('Error checking existingShortID uniqueness:', error);
    throw error;
  }
}

const shortID = () =>{

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randomString = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters[randomIndex];
    }
    
    return randomString;
}
