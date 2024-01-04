const express = require('express');
const session = require('express-session');
const methodOverride =  require('method-override');

module.exports = (app) => {
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