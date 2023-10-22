import { Request, Response } from 'express';
import { matchedData } from 'express-validator';
import { addShorthenUrl } from '../../actions/shorthen/addShorthenUrlAction';
import { updateShorthenUrl } from '../../actions/shorthen/updateShorthenUrlAction';
import { deleteShorthenUrl } from '../../actions/shorthen/deleteShorthenUrlAction';

import  handleResponse  from "../../utils/Response";

class ShorthenerController {
    add = async (req: Request, res: Response) =>
    {
        const requiredData = matchedData(req, { includeOptionals: false });

        try {
            const result = await addShorthenUrl(requiredData);
            handleResponse(res, result, 201);
        } catch (error) {
            console.log(JSON.stringify(error))
            handleResponse(res, {status:'error', message: "Error creating shorthend URL."}, 500);
        }

    }

    update = async (req: Request, res: Response) =>
    {
        const requiredData = matchedData(req, { includeOptionals: false });

        try {
            const data = await updateShorthenUrl(requiredData);
            handleResponse(res, data, 201);
        } catch (error) {
            console.log(JSON.stringify(error))
            handleResponse(res, {status:'error', message: "Error updating shorthend URL."}, 500);
        }

    }

    delete = async (req: Request, res: Response) =>
    {
        const requiredData = matchedData(req, { includeOptionals: false });

        try {
            const data = await deleteShorthenUrl(requiredData);
            handleResponse(res, data, 201);
        } catch (error) {
            console.log(JSON.stringify(error))
            handleResponse(res, {status:'error', message: "Error deleting shorthend URL."}, 500);
        }

    }
}


export default new ShorthenerController();
