import User from '../../models/User';

export const forgotPassword = async (formData: any) => {
  try {
   // send an email here

    return {status:'success', message: 'Reset Email Sent successfully' , data:null};

  } catch (error) {
    console.log(error) // please remove
    throw new Error();
  }
};