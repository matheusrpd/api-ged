import { Request, Response } from 'express';
import fs from 'fs';
import { AlfrescoApi, NodesApi, ContentApi } from '@alfresco/js-api';

export default {
  async store(req: Request, res: Response): Promise<Response> {
    const { type, number, year, name, author } = req.body;
    const { id: parentId } = req.params;
    const properties: { [key: string]: string } = {};
    const { ticket } = req.user;

    const alfrescoApi = new AlfrescoApi({
      ticketEcm: ticket,
      hostEcm: 'http://localhost:8080',
    });
    const nodesApi = new NodesApi(alfrescoApi);
    const contentApi = new ContentApi(alfrescoApi);

    const file = fs.createReadStream(req.file.path);

    properties['cm:type'] = type;
    properties['cm:number'] = number;
    properties['cm:year'] = year;
    properties['cm:name'] = name;
    properties['cm:author'] = author;

    const response = await nodesApi.createNode(
      parentId,
      {
        name,
        nodeType: 'cm:content',
        properties,
      },
      null,
      { filedata: file },
    );

    fs.unlinkSync(req.file.path);

    const url = contentApi.getContentUrl(response.entry.id);

    const data = {
      id: response.entry.id,
      name: response.entry.name,
      properties: response.entry.properties,
      content: response.entry.content,
      url,
      createdByUser: response.entry.createdByUser,
      modifiedByUser: response.entry.modifiedByUser,
      createdAt: response.entry.createdAt,
      modifiedAt: response.entry.modifiedAt,
    };

    return res.json(data);
  },

  async show(req: Request, res: Response): Promise<Response> {
    const { id: parentFolder } = req.params;
    const { ticket } = req.user;

    const alfrescoApi = new AlfrescoApi({
      ticketEcm: ticket,
      hostEcm: 'http://localhost:8080',
    });
    const nodesApi = new NodesApi(alfrescoApi);
    const contentApi = new ContentApi(alfrescoApi);

    try {
      const response = await nodesApi.getNode(parentFolder);
      const file = response.entry;

      const url = contentApi.getContentUrl(file.id);

      const data = {
        id: file.id,
        name: file.name,
        properties: file.properties,
        content: file.content,
        url,
        createdByUser: file.createdByUser,
        modifiedByUser: file.modifiedByUser,
        createdAt: file.createdAt,
        modifiedAt: file.modifiedAt,
      };

      return res.json(data);
    } catch (error) {
      return res.status(400).json({ error: 'File not exists.' });
    }
  },

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { type, number, year, description, author } = req.body;
    const properties: { [key: string]: string } = {};

    const { ticket } = req.user;

    const alfrescoApi = new AlfrescoApi({
      ticketEcm: ticket,
      hostEcm: 'http://localhost:8080',
    });
    const nodesApi = new NodesApi(alfrescoApi);

    try {
      const response = await nodesApi.getNode(id);

      const file = response.entry;

      properties['cm:type'] = type || file.properties['cm:type'];
      properties['cm:number'] = number || file.properties['cm:number'];
      properties['cm:year'] = year || file.properties['cm:year'];
      properties['cm:description'] =
        description || file.properties['cm:description'];
      properties['cm:author'] = author || file.properties['cm:author'];

      await nodesApi.updateNode(id, { properties });

      return res.json({ message: 'Update success.' });
    } catch (error) {
      return res.status(400).json({ error: 'Update failed.' });
    }
  },

  async destroy(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { ticket } = req.user;

    const alfrescoApi = new AlfrescoApi({
      ticketEcm: ticket,
      hostEcm: 'http://localhost:8080',
    });
    const nodesApi = new NodesApi(alfrescoApi);

    try {
      await nodesApi.deleteNode(id);
    } catch (error) {
      return res.status(400).json({ error: 'Delete failded.' });
    }

    return res.json({ message: 'Delete success.' });
  },
};
