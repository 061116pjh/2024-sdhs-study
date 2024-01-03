const express = require('express');
const session = require('express-session');

module.exports = (app) => {
    app.set('trust proxy', 1);

    app.use(express.json());
    app.use(session({
        secret: 'keyboard cat',
        cookie: { secure: false }
    }));
}