import { Request, Response } from 'express';
import { nodesApi } from '../services/AlfrescoApi';

export default {
    async store(req: Request, res: Response) {
        const { parentId } = req.params;
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

        const data = response.list?.entries;

        return res.json(data);
    }
}