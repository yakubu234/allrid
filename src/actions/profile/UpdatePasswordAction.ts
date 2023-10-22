import User from '../../models/User';

export const updatePassword = async (formData: any) => {
    try {

        const hashedPassword = await User.encryptPassword(formData.password);     
        const user = await User.updateUser(formData.uuid,{password:hashedPassword});

        if(user !=null){
          return {status:'success', message: 'Password Update successful' , data:{user}}
        }
    
        throw new Error();
    
      } catch (error) {
        console.log(error) // please remove
        throw new Error();
      }
};