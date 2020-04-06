import { Request, Response } from 'express';

export default {
    async store(req: Request, res: Response) {
        const file = req.file;

        console.log(file);

        return res.send();
    }
}