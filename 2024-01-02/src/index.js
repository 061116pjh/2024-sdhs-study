const express = require('express');
const moduleAlias = require('module-alias');

moduleAlias.addAliases({
    '@root': __dirname,
    '@db': __dirname + '/db',
    '@lib': __dirname + '/lib',
    '@route': __dirname + '/server/routes',
    '@server': __dirname + '/server',
});

require('dotenv').config();

const usersRoute = require('@route/users/users');
const users_meRoute = require('@route/users/users_me');
const signupRoute = require('@route/users/signup');
const signinRoute = require('@route/users/signin');
const updateUserRoute = require('@route/users/updateUser');
const deleteUserRoute = require('@route/users/deleteUser');

const createPostsRoute = require('@route/posts/createPost');
const getPostsRoute = require('@route/posts/getPosts');

const routes = [
    signupRoute,
    signinRoute,
    usersRoute,
    users_meRoute,
    updateUserRoute,
    deleteUserRoute,
    createPostsRoute,
    getPostsRoute
];

const initExpressApp = require('@server/initExpressApp');
const dbConnect = require('@db/connect');

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

