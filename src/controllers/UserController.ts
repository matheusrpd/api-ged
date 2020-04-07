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
    },

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const { username, firstName, lastName, email, password } = req.body;

        const response = await peopleApi.getPerson(id);

        if(!response) {
            return res.status(403).json({ error: 'User not exists.' });
        }

        const user = response.entry;

        const bodyUpdate = {
            id: username ? username : user.id,
            firstName: firstName ? firstName : user.firstName,
            lastName: lastName ? lastName : user.lastName,
            email: email ? email : user.email,
        }

        if(password) {
            await peopleApi.resetPassword(id, password);
        }
        
        try {
            await peopleApi.updatePerson(id, bodyUpdate);
        } catch (error) {
            return res.status(403).json({ error: 'Update failed.' });
        }
        
        return res.json({ message: 'Update sucessed.' });
    }
}