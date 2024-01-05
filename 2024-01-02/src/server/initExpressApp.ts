import express, { Application } from'express';
import session from'express-session';
import methodOverride from 'method-override';

export const initExpressApp = (app: Application) => {
    app.set('trust proxy', 1);

    app.use(express.json());
    app.use(session({
        secret: 'keyboard cat',
        cookie: { secure: false }
    }));
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static('static'));
    app.use(methodOverride('_method'));
}