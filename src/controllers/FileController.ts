import { Request, Response } from 'express';
import fs from 'fs';
import { nodesApi, contentApi } from '../services/AlfrescoApi';

export default {
  async store(req: Request, res: Response): Promise<Response> {
    const { type, number, year, description, author, date } = req.body;
    const { id: parentId } = req.params;
    const properties: { [key: string]: string } = {};

    const file = fs.createReadStream(req.file.path);

    properties['cm:type'] = type;
    properties['cm:number'] = number;
    properties['cm:year'] = year;
    properties['cm:description'] = description;
    properties['cm:author'] = author;
    properties['cm:date'] = date;

    const response = await nodesApi.createNode(
      parentId,
      {
        name: description,
        nodeType: 'cm:content',
        properties,
      },
      null,
      { filedata: file },
    );

    fs.unlinkSync(req.file.path);

    return res.json(response.entry);
  },

  async show(req: Request, res: Response): Promise<Response> {
    const { id: parentFolder } = req.params;

    try {
      const response = await nodesApi.getNode(parentFolder);
      const file = response.entry;

      const urlDownload = await contentApi.getContentUrl(file.id);
      const urlPreview = await contentApi.getDocumentPreviewUrl(file.id);

      const {
        name,
        id,
        properties,
        content,
        createdByUser,
        modifiedByUser,
        createdAt,
        modifiedAt,
      } = file;

      const data = {
        name,
        id,
        properties,
        content,
        urlDownload,
        urlPreview,
        createdByUser,
        modifiedByUser,
        createdAt,
        modifiedAt,
      };

      return res.json(data);
    } catch (error) {
      return res.status(400).json({ error: 'File not exists.' });
    }
  },

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { type, number, year, description, author, date } = req.body;
    const properties: { [key: string]: string } = {};

    try {
      const response = await nodesApi.getNode(id);

      const file = response.entry;

      properties['cm:type'] = type || file.properties['cm:type'];
      properties['cm:number'] = number || file.properties['cm:number'];
      properties['cm:year'] = year || file.properties['cm:year'];
      properties['cm:description'] =
        description || file.properties['cm:description'];
      properties['cm:author'] = author || file.properties['cm:author'];
      properties['cm:date'] = date || file.properties['cm:date'];

      await nodesApi.updateNode(id, { properties });

      return res.json({ message: 'Update success.' });
    } catch (error) {
      return res.status(400).json({ error: 'Update failed.' });
    }
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
