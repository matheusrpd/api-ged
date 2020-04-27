import { Request, Response } from 'express';
import { alfrescoApi, peopleApi } from '../services/AlfrescoApi';

export default {
  async store(req: Request, res: Response): Promise<Response> {
    const { username, password } = req.body;

    try {
      const response = await alfrescoApi.login(username, password);
      const user = await peopleApi.getPerson(username);

      return res.json({ user: user.entry, ticket: response });
    } catch (error) {
      return res.status(400).json({ error: 'Login failed.' });
    }
  },
};
