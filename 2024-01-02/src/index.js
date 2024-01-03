const { v4: uuidv4 } = require('uuid');
const _ = require('lodash');
const crypto = require('crypto');
const express = require('express');
const app = express();

require('dotenv').config();

app.use(express.json());

const encryptPassword = (password) => {
    return crypto
        .createHash('sha256')
        .update(password + 'sdhs')
        .digest('base64');
}

let users = [{
    idx: uuidv4(),
    id: 'digitect1',
    password: encryptPassword('thisispassword'),
    name: '홍길동',
    gender: 'male',
    age: 21,
    phoneNumber: '010-0000-0000',
},];


app.get('/users', (req, res) => {
    return res.json(users);
});

app.post('/signup', (req, res) => {
    const user = _.pick(
        req.body,
        [   
            'id',
            'password',
            'name',
            'gender',
            'age',
            'phoneNumber'
        ]
    );

    users.push(Object.assign(user, { idx: uuidv4() }));
    return res.json({ success: true });
});

app.post('/signin', (req, res) => {
    const { id, password } = req.body;

    let success = false;

    const isUserByIdAndPassword = () => {
        const user = users.find(user => {
            return user.id === id && user.password == encryptPassword(password);
        });
        return user !== undefined;
    }

    if(isUserByIdAndPassword()) success = true;

   return res.json({ success });
    
});

app.patch('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const body = req.body;

    const userIndex = users.findIndex((user) => {
        return user.idx === userId;
    });

    const newUser = _.pick(body, ['id', 'password', 'name', 'age', 'gender', 'phoneNumber']);

    if(newUser.password !== undefined) newUser.password = encryptPassword(newUser.password);

    Object.assign(users[userIndex], newUser);

    return res.json({ success: true });
});

app.delete('/users/:userId', (req, res) => {
    const { userId } = req.params;

    const filterFunc = (user) => {
        if(user.idx === userId) return false;
        return true;
    }

    users = users.filter(filterFunc);

    return res.json({ success: true });
});

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server is Running in ${port}`);
});