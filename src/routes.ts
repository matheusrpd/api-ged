import express from 'express';
import multer from 'multer';

import configUpload from './config/upload';

import SessionController from './controllers/SessionController';
import FileController from './controllers/FileController';
import FolderController from './controllers/FolderController';
import TestController from './controllers/TestController';

const routes = express.Router();
const upload = multer(configUpload);

routes.post('/sessions', SessionController.store);

routes.post('/folders/:parentId', FolderController.store);
routes.get('/folders/:id', FolderController.index);

routes.post('/files/:parentId', upload.single('file'), FileController.store);
routes.get('/files/:id', FileController.show);

export default routes;