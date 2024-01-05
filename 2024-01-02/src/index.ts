import express from 'express';
// import ts path alias

import { dbConnect } from './db/connect';
import { initExpressApp } from './server/initExpressApp';

import { Route } from './types/Route';
import { createPostRoute } from './server/routes/posts/createPost';

require('dotenv').config();

declare module 'express-session'{
    interface SessionData{
        _id?: string;
    }
}

const routes: Route[] = [
    createPostRoute,
]


const initConnection = async () => {

    const app = express();
    const port = process.env.PORT;

    await dbConnect();

    initExpressApp(app);

    routes.forEach(route => {
        app[route.method](route.path, (req, res) => {
            route.handler(req, res)
                .catch((err) => {
                    console.error('Api Error', err);

                    const [statusCode, errorMessage] = err.message.split(':');

                    return res.status(statusCode).json({ 
                        success: false, 
                        message: errorMessage,
                    });
                });
        });
    });
    
    app.listen(port, () => {
        console.log(`Server is Running in ${port}`);
    });
}

initConnection()
    .catch((err) => {
        console.error('Error is occured while running application. Error: ', err);
    });

