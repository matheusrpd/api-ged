import { Request, Response } from 'express';
import { nodesApi } from '../services/AlfrescoApi';
import fs from 'fs';

export default {
    async store(req: Request, res: Response) {
        const { parentId } = req.params;
        const { type, number, year, description, author, date } = req.body;
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
            properties
        }, null, { filedata: file });

        fs.unlinkSync(req.file.path);

        return res.json(response.entry);
    },

    async show(req: Request, res: Response) {
        const { id } = req.params;

        const file = await nodesApi.getNode(id);

        return res.json(file);
    },
}