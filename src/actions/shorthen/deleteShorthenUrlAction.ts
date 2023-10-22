import ShorthendLink from '../../models/ShorthendLink';

export const deleteShorthenUrl = async (formData: any) => {
  try {

    const shortLink = await ShorthendLink.delete(formData);

    if(shortLink !=null){
      return {status:'success', message: 'Delete successful' , data:{shortLink}}
    }

    throw new Error();

  } catch (error) {
    console.log(error) // please remove
    throw new Error();
  }
};