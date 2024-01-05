import express from 'express';
// import ts path alias

declare module 'express-session'{
    interface SessionData{
        _id?: string;
    }
}

require('dotenv').config();

import { initExpressApp } from './serverinit/initExpressApp';
import { dbConnect } from './db/connect';

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

