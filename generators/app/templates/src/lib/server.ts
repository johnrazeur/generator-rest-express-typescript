import 'reflect-metadata';
import { createTypeormConn } from '../lib/typeorm';
import app from './app';
const PORT = 3000;

export const startServer = async (): Promise<void> => {
    try {
        await createTypeormConn();
        app.listen(PORT, (): void => {
            console.log('Express server listening on port ' + PORT);
        })
    } catch(error) {
        console.log(error);
    }
}

startServer();