import ShorthendLink from '../../models/ShorthendLink';

export const addShorthenUrl = async (formData: any) => {
  try {

    const shortLink = await ShorthendLink.add(formData);

    if(shortLink !=null){
      return {status:'success', message: 'Created successful' , data:{shortLink}}
    }

    throw new Error();

  } catch (error) {
    console.log(error) // please remove
    throw new Error();
  }
};