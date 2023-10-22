import User from '../../models/User';
import {generateAccessToken} from "../../middleware/auth";

export const registerUser = async (formData: any) => {
  try {
    // Create a new user record in the database using Sequelize
    const user = await User.registerUser(formData);
    if(user !=null){
      const accessToken = generateAccessToken(user.uuid, user.email, user.status); 
      return {status:'success', message: 'Registration successful' , data:{user,accessToken}}
    }

    // if user is null
    throw new Error();

  } catch (error) {
    console.log(error) // please remove
    throw new Error();
  }
};