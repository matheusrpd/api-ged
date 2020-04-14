import { Request, Response } from 'express';
import { searchApi } from '../services/AlfrescoApi';

export default {
  async index(req: Request, res: Response): Promise<Response> {
    try {
      const { content } = req.query;

      const response = await searchApi.search({
        query: {
          query: content,
        },
      });

      const list = response.list?.entries;

      return res.json(list);
    } catch (error) {
      return res.status(400).json({ error: 'Search failed.' });
    }
  },
};
