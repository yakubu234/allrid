// import { render } from 'ejs';
import { getShorthendUrl } from '../actions/shorthen/getShorthenUrlAction';

const handleRedirect = async (req:any, res:any) => {
    const { short_code } = req.params;
    const data = await getShorthendUrl(short_code);

    if (data.link_type && data.link_type === 'mobile') {
        res.redirect(data.original_link, 301);
    }

    const title = "This is a random title";
    const description = "this is a random image title and description here";
    const image = "https://raw.githubusercontent.com/mobalti/open-props-interfaces/main/image-gallery/images/img-5.webp";
    const type = "og.url";
    const redirect_url = "og.url";

    res.render('redirect_template', { title, description, image,type,redirect_url });
    
};
  
export default handleRedirect;