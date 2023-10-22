import ShorthendLink from '../../models/ShorthendLink';

export const updateShorthenUrl = async (formData: any) => {
  try {

    const shortLink = await ShorthendLink.updateLink(formData.uuid,formData);

    if(shortLink !=null){
      return {status:'success', message: 'Update successful' , data:{shortLink}}
    }

    throw new Error();

  } catch (error) {
    console.log(error) // please remove
    throw new Error();
  }
};