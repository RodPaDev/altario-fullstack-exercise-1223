import { AltarioDB } from './db';

declare global {
    namespace Express {
        interface Request {
            db: AltarioDB;
        }
    }
}
