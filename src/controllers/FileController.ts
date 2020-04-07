import { Request, Response } from 'express';
import { nodesApi } from '../services/AlfrescoApi';
import fs from 'fs';

export default {
    async store(req: Request, res: Response) {
        const { type, number, year, description, author, date } = req.body;
        const parentId = req.header('parent-id')!;
        const properties: { [key: string]: string } = {};

        properties['cm:type'] = type;
        properties['cm:number'] = number;
        properties['cm:year'] = year;
        properties['cm:description'] = description;
        properties['cm:author'] = author;
        properties['cm:date'] = date;

        const file = fs.createReadStream(req.file.path);

        const response = await nodesApi.createNode(parentId, {
            name: description,
            nodeType: 'cm:content',
            properties: properties
        }, null, { filedata: file });

        fs.unlinkSync(req.file.path);

        return res.json(response.entry);
    },

    async show(req: Request, res: Response) {
        const { id } = req.params;

        const file = await nodesApi.getNode(id);

        if(!file) {
            return res.status(403).json({ error: 'File not exists.' });
        }

        return res.json(file);
    },

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const { type, number, year, description, author, date } = req.body;
        const properties: { [key: string]: string } = {};

        const response = await nodesApi.getNode(id);

        if(!response) {
            return res.status(403).json({ error: 'File not exists.' });
        }

        const file = response.entry;

        properties['cm:type'] = type ? type : file.properties['cm:type'];
        properties['cm:number'] = number ? number : file.properties['cm:number'];
        properties['cm:year'] = year ? year : file.properties['cm:year'];
        properties['cm:description'] = description ? description : file.properties['cm:description'];
        properties['cm:author'] = author ? author : file.properties['cm:author'];
        properties['cm:date'] = date ? date : file.properties['cm:date'];

        try {
            await nodesApi.updateNode(id, { properties });
        } catch (error) {
            return res.status(403).json({ error: 'Update failed.' });
        }
      
        return res.json({ message: 'Update success.' });
    },

    async destroy(req: Request, res: Response) {
        const { id } = req.params;

        try {
            await nodesApi.deleteNode(id);
        } catch (error) {
            return res.status(403).json({ error: 'Delete failded.' });
        }
        
        return res.json({ message: 'Delete success.' });
    }
}