import express from 'express';
import multer from 'multer';

import configUpload from './config/upload';

import SessionController from './controllers/SessionController';
import FileController from './controllers/FileController';
import FolderController from './controllers/FolderController';
import UserController from './controllers/UserController';

const routes = express.Router();
const upload = multer(configUpload);

routes.post('/sessions', SessionController.store);

routes.post('/folders', FolderController.store);
routes.get('/folders/:id', FolderController.index);
routes.put('/folders/:id', FolderController.update);
routes.delete('/folders/:id', FolderController.destroy);

routes.post('/files', upload.single('file'), FileController.store);
routes.get('/files/:id', FileController.show);
routes.put('/files/:id', FileController.update);
routes.delete('/files/:id', FileController.destroy);

routes.post('/users', UserController.store);
routes.get('/users/:id', UserController.show);
routes.put('/users/:id', UserController.update);

export default routes;