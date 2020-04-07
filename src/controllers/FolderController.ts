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
    },

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const { name } = req.body;

        const response = await nodesApi.getNode(id);

        if(!response) {
            return res.status(403).json({ error: 'Folder not exists.' });
        }

        const folder = response.entry;

        folder.name = name ? name :  folder.name;

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