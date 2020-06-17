import { Request, Response } from 'express';
import { AlfrescoApi, PeopleApi } from '@alfresco/js-api';

export default {
  async store(req: Request, res: Response): Promise<Response> {
    const { username, password } = req.body;

    const alfrescoApi = new AlfrescoApi({
      hostEcm: 'http://localhost:8080',
    });

    const peopleApi = new PeopleApi(alfrescoApi);

    try {
      const response = await alfrescoApi.login(username, password);
      const user = await peopleApi.getPerson(username);

      return res.json({
        user: user.entry,
        ticket: response,
      });
    } catch (error) {
      return res.status(400).json({ error: 'Login failed.' });
    }
  },

  async delete(req: Request, res: Response): Promise<Response> {
    const { ticket } = req.user;

    const alfrescoApi = new AlfrescoApi({
      ticketEcm: ticket,
      hostEcm: 'http://localhost:8080',
    });

    try {
      await alfrescoApi.logout();

      return res.status(204);
    } catch (error) {
      return res.status(400).json({ error: 'Logout failed.' });
    }
  },
};
