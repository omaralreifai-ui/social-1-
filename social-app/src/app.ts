import express from 'express';
import { router } from './routes';
import { globalerror } from './lib/error/error.handler';

export function createApp() {
    const app = express();
    app.use(express.json());
    app.use('/api', router);
    app.use('/', router);
    app.use(globalerror);
    return app;
}
