import { Request, Response } from 'express';
import { nodesApi } from '../services/AlfrescoApi';

export default {
    async store(req: Request, res: Response) {
        const parentId = req.header('parent-id')!;
        const { name } = req.body;
        
        const response = await nodesApi.createNode(parentId, {
            name,
            nodeType: 'cm:folder'
        });

        return res.json(response.entry);
    },

    async index(req: Request, res: Response) {
        const { id } = req.params;

        const response = await nodesApi.listNodeChildren(id);

        if(!response) {
            return res.status(403).json({ error: 'Folder not exists.' });
        }
          
        const data = response.list?.entries;

        return res.json(data);
    }
}