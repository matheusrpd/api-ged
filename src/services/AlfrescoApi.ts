import { AlfrescoApi } from '@alfresco/js-api';
import { PeopleApi } from '@alfresco/js-api';
import { NodesApi } from '@alfresco/js-api';
import { UploadApi } from '@alfresco/js-api';

export const alfrescoApi = new AlfrescoApi({
    hostEcm: 'http://localhost:8080'
})

export const peopleApi = new PeopleApi(alfrescoApi);

export const nodesApi = new NodesApi(alfrescoApi);

export const uploadApi = new UploadApi(alfrescoApi);
