const _ = require('lodash');
const express = require('express');

require('dotenv').config();

const app = express();
const port = process.env.PORT;

const users = require('./db/users');
const User = require('./db/users.schema');

const usersRoute = require('./server/routes/users');
const users_meRoute = require('./server/routes/users_me');
const signupRoute = require('./server/routes/signup');
const signinRoute = require('./server/routes/signin');
const editRoute = require('./server/routes/edit');
const deleteRoute = require('./server/routes/delete');

const routes = [
    signupRoute,
    signinRoute,
    usersRoute,
    users_meRoute,
    editRoute,
    deleteRoute
];

const initExpressApp = require('./server/initExpressApp');
const dbConnect = require('./db/connect');

initExpressApp(app);

const initConnection = async () => {
    await dbConnect();

    // await User.create({
    //     id: 'qwer',
    //     password: 'thisispassword',
    //     name: '박종혁',
    //     age: '25',
    // });
}

initConnection();

routes.forEach(route => {
    app[route.method](route.path, route.handler);
});

app.listen(port, () => {
    console.log(`Server is Running in ${port}`);
});