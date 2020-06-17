declare namespace Express {
  export interface Request {
    user: {
      ticket: string;
    };
  }
}
