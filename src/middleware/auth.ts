import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
import  handleResponse  from "../utils/Response";

export function authenticateToken(
    req: Request,
    res: Response,
    next: NextFunction
): void {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    const userXKey = req.headers["user-x-key"] ?? null;

    if (!token) {
        handleResponse(res, {status:'error', message: "UnAuthenticated Token Required failed"} , 401);
        return;
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err, user) => {
        if (err) {
            handleResponse(res, {status:'error', message: " Token Mismatched failed"} , 403);
            return;
        }

        req.body.user = user;

        if(user && req.body.user.uuid !== userXKey){
            handleResponse(res, {status:'error', message: " user-x-key passed in the header is incorrect"} , 403);
            return;
        }
        
        req.body.email = req.body.user.email
        req.body.type = req.body.user.type
        delete req.body.user;
        req.body.uuid = userXKey; // i attached the uuid here because i need it in my validation.
        next();
    });
}

export async function authenticateUser(
    req: Request,
    res: Response,requiredData:any
): Promise<void> {

    const { email, password } = requiredData;

    try {
        const user = await User.getUser({email:email});

        if (!user || !(await user.comparePassword(password))) {
            handleResponse(res, {status:'error', message: "Authentication failed"} , 401);
            return;
        }

        const userRecord = { ...user.toJSON() };
        delete userRecord.password;
        delete userRecord.id;

        const accessToken = generateAccessToken(userRecord.uuid, user.email, user.status); // Generate token
        
        handleResponse(res, {status:'success', message: "login successful", data:{userRecord,accessToken}}, 200);
        
    } catch (error) {
        handleResponse(res, {status:'error', message: "Error during login."}, 500);
        return;
    }
}

export function generateAccessToken(userId: string, email: string , status: string|null):string{
    return jwt.sign({ uuid: userId, email, status }, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '1h' });
}
