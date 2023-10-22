import { Request, Response } from 'express';
import { matchedData } from 'express-validator';
import { authenticateUser,generateAccessToken} from "../../middleware/auth";
import { registerUser } from '../../actions/auth/RegisterAction';
import { forgotPassword } from '../../actions/auth/ForgotPasswordAction';
import  handleResponse  from "../../utils/response";

class AuthController {

    //register new user method
    register = async (req: Request, res: Response) => 
    {
        const requiredData = matchedData(req, { includeOptionals: false });

        try {
            const user = await registerUser(requiredData);
            handleResponse(res, user, 201);
        } catch (error) {
            console.log(JSON.stringify(error))
            handleResponse(res, {status:'error', message: "Error creating user."}, 500);
        }
    };

    // login new user method
    login = async (req: Request, res: Response) =>
    {
        const requiredData = matchedData(req, { includeOptionals: false });
        authenticateUser(req, res, requiredData);
    };

    // forgot password method
    forgotPassword =  async (req: Request, res: Response) =>
    {
        const requiredData = matchedData(req, { includeOptionals: false });
        try {
            const user = await forgotPassword(requiredData);
            handleResponse(res, user, 201);
        } catch (error) {
            console.log(JSON.stringify(error))
            handleResponse(res, {status:'error', message: "Error creating user."}, 500);
        }
    }

    // reset password method
    resetPassword = async (req: Request, res: Response) =>
    {

    }

}

export default new AuthController();