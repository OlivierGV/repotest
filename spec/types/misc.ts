import { Response } from 'supertest';

import { IEmprunt } from '@src/models/Emprunt';


// Misc
export type TReqBody = Record<string, unknown>;
export type TRes = Omit<Response, 'body'> & { body: TBody };
export type TApiCb = (res: TRes) => void;


// Response Body: Add things to the body here over time to prevent 
// typescript errors.
type TBody = {
  [key: string]: unknown;
  emprunt?: IEmprunt;
  emprunts?: IEmprunt[];
}
