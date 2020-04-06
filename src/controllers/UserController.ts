import { Request, Response } from 'express';
import { peopleApi } from '../services/AlfrescoApi';

export default {
    async store(req: Request, res: Response) {
        const { username, firstName, lastName, email, password } = req.body;

        const response = await peopleApi.createPerson({
            id: username,
            firstName,
            lastName,
            email,
            password
        });

        return res.json(response.entry);
    },

    async show(req: Request, res: Response) {
        const { id } = req.params;

        const response = await peopleApi.getPerson(id);

        return res.json(response.entry);
    }
}