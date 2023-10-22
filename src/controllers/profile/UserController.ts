import { Request, Response } from 'express';
import { matchedData } from 'express-validator';
import { updateProfile } from '../../actions/profile/UpdateProfileAction';
import { updatePassword } from '../../actions/profile/UpdatePasswordAction';
import  handleResponse  from "../../utils/response";

class UserController {

    updateProfile = async (req: Request, res: Response) =>
    {
        const requiredData = matchedData(req, { includeOptionals: false });

        try {
            const user = await updateProfile(requiredData);
            handleResponse(res, user, 201);
        } catch (error) {
            console.log(JSON.stringify(error))
            handleResponse(res, {status:'error', message: "Error updating user."}, 500);
        }
    };

    updatePassword = async (req: Request, res: Response) =>
    {
        const requiredData = matchedData(req, { includeOptionals: false });

        try {
            const user = await updatePassword(requiredData);
            handleResponse(res, user, 201);
        } catch (error) {
            console.log(JSON.stringify(error))
            handleResponse(res, {status:'error', message: "Error updating password."}, 500);
        }
    };

}

export default new UserController();