import { Request, Response } from 'express';
import { peopleApi } from '../services/AlfrescoApi';

export default {
  async store(req: Request, res: Response): Promise<Response> {
    const { username, firstName, lastName, email, password } = req.body;

    const response = await peopleApi.createPerson({
      id: username,
      firstName,
      lastName,
      email,
      password,
    });

    return res.json(response.entry);
  },

  async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      const response = await peopleApi.getPerson(id);

      return res.json(response.entry);
    } catch (error) {
      return res.status(400).json({ error: 'User not exists.' });
    }
  },

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { username, firstName, lastName, email, password } = req.body;

    try {
      const response = await peopleApi.getPerson(id);

      const user = response.entry;

      const bodyUpdate = {
        id: username || user.id,
        firstName: firstName || user.firstName,
        lastName: lastName || user.lastName,
        email: email || user.email,
      };

      if (password) {
        await peopleApi.resetPassword(id, password);
      }

      try {
        await peopleApi.updatePerson(id, bodyUpdate);
      } catch (error) {
        return res.status(400).json({ error: 'Update failed.' });
      }

      return res.json({ message: 'Update success.' });
    } catch (error) {
      return res.status(400).json({ error: 'User not exists.' });
    }
  },
};
