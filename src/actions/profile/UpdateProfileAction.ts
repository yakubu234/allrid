import User from '../../models/User';

export const updateProfile = async (formData: any) => {
    try {

        const user = await User.updateUser(formData.uuid,formData);

        if(user !=null){
          return {status:'success', message: 'Update successful' , data:{user}}
        }
    
        throw new Error();
    
      } catch (error) {
        console.log(error) // please remove
        throw new Error();
      }
};