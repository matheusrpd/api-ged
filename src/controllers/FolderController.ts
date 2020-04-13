import { Request, Response } from 'express';
import { nodesApi } from '../services/AlfrescoApi';

export default {
  async store(req: Request, res: Response) {
    const { id: parentId } = req.params;
    const { name } = req.body;

    const response = await nodesApi.createNode(parentId, {
      name,
      nodeType: 'cm:folder',
    });

    return res.json(response.entry);
  },

  async index(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const response = await nodesApi.listNodeChildren(id);

      const data = response.list?.entries;

      return res.json(data);
    } catch (error) {
      return res.status(400).json({ error: 'Folder not exists.' });
    }
  },

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name } = req.body;

    try {
      if (name) {
        await nodesApi.updateNode(id, { name });
      }
    } catch (error) {
      return res.status(400).json({ error: 'Update failed.' });
    }

    return res.json({ message: 'Update success.' });
  },

  async destroy(req: Request, res: Response) {
    const { id } = req.params;

    try {
      await nodesApi.deleteNode(id);
    } catch (error) {
      return res.status(400).json({ error: 'Delete failded.' });
    }

    return res.json({ message: 'Delete success.' });
  },
};
