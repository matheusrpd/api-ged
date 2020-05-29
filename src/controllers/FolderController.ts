/* eslint-disable @typescript-eslint/camelcase */
import { Request, Response } from 'express';
import { nodesApi, contentApi } from '../services/AlfrescoApi';

export default {
  async store(req: Request, res: Response): Promise<Response> {
    const { id: parentId } = req.params;
    const { name } = req.body;

    const response = await nodesApi.createNode(parentId, {
      name,
      nodeType: 'cm:folder',
    });

    const folder = {
      id: response.entry.id,
      name: response.entry.name,
      properties: response.entry.properties,
      createdByUser: response.entry.createdByUser,
      modifiedByUser: response.entry.modifiedByUser,
      created_at: response.entry.createdAt,
      updated_at: response.entry.modifiedAt,
    };

    return res.json(folder);
  },

  async index(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      const responseFolder = await nodesApi.getNode(id);
      const responseDocuments = await nodesApi.listNodeChildren(id);

      const folder = {
        name: responseFolder.entry.name,
        id: responseFolder.entry.id,
        properties: responseFolder.entry.properties,
        createdByUser: responseFolder.entry.createdByUser,
        modifiedByUser: responseFolder.entry.modifiedByUser,
        created_at: responseFolder.entry.createdAt,
        updated_at: responseFolder.entry.modifiedAt,
      };

      const documents = responseDocuments.list?.entries?.map(document => {
        const url = contentApi.getContentUrl(document.entry.id);

        return {
          id: document.entry.id,
          name: document.entry.name,
          type: document.entry.isFile ? 'file' : 'folder',
          properties: document.entry.properties,
          url,
          createdByUser: document.entry.createdByUser,
          modifiedByUser: document.entry.modifiedByUser,
          created_at: document.entry.createdAt,
          updated_at: document.entry.modifiedAt,
        };
      });

      const data = {
        folder,
        documents,
      };

      return res.json(data);
    } catch (error) {
      return res.status(400).json({ error: 'Folder not exists.' });
    }
  },

  async update(req: Request, res: Response): Promise<Response> {
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

  async destroy(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      await nodesApi.deleteNode(id);
    } catch (error) {
      return res.status(400).json({ error: 'Delete failded.' });
    }

    return res.json({ message: 'Delete success.' });
  },
};
