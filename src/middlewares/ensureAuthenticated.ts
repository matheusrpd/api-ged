import { Request, Response, NextFunction } from 'express';
import { AlfrescoApi } from '@alfresco/js-api';

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error('Ticket is missing.');
  }

  const [, ticket] = authHeader.split(' ');

  try {
    const alfrescoApi = new AlfrescoApi({
      ticketEcm: ticket,
      hostEcm: 'http://localhost:8080',
    });

    if (alfrescoApi.isLoggedIn()) {
      request.user = { ticket };
    } else {
      throw new Error();
    }

    return next();
  } catch {
    throw new Error('Invalid ticket.');
  }
}
