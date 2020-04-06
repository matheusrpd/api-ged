import { Request, Response } from 'express';
import { alfrescoApi }  from '../services/AlfrescoApi';

export default {
    async store(req: Request, res: Response) {
        const { username, password } = req.body;

        try {
            await alfrescoApi.login(username, password);
        } catch (error) {
            return res.status(403).json({ error: 'Login failed.' });
        }

        return res.json({ message: 'Login sucess!' });
    }
}