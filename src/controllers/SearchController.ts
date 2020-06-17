import { Request, Response } from 'express';
import { AlfrescoApi, SearchApi, ContentApi } from '@alfresco/js-api';

export default {
  async index(req: Request, res: Response): Promise<Response> {
    const { content } = req.query;
    const { ticket } = req.user;

    const alfrescoApi = new AlfrescoApi({
      ticketEcm: ticket,
      hostEcm: 'http://localhost:8080',
    });
    const searchApi = new SearchApi(alfrescoApi);
    const contentApi = new ContentApi(alfrescoApi);

    try {
      const response = await searchApi.search({
        query: {
          query: content,
        },
      });

      const list = response.list?.entries;

      const folders = list?.filter(item => item.entry.isFolder);
      const files = list?.filter(item => item.entry.isFile);

      const data = {
        folders: folders?.map(folder => {
          return {
            name: folder.entry.name,
            id: folder.entry.id,
          };
        }),
        files: files?.map(file => {
          return {
            name: file.entry.name,
            id: file.entry.id,
            url: contentApi.getContentUrl(file.entry.id),
          };
        }),
      };

      return res.json(data);
    } catch (error) {
      return res.status(400).json({ error: 'Search failed.' });
    }
  },
};
