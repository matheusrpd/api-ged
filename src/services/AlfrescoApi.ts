import {
  AlfrescoApi,
  PeopleApi,
  NodesApi,
  UploadApi,
  ContentApi,
} from '@alfresco/js-api';

export const alfrescoApi = new AlfrescoApi({
  hostEcm: 'http://localhost:8080',
});

export const peopleApi = new PeopleApi(alfrescoApi);

export const nodesApi = new NodesApi(alfrescoApi);

export const uploadApi = new UploadApi(alfrescoApi);

export const contentApi = new ContentApi(alfrescoApi);
