const _ = require('lodash');
const crypto = require('crypto');
const express = require('express');
const session = require('express-session');
const { v4: uuidv4 } = require('uuid');

const app = express();

require('dotenv').config();

app.set('trust proxy', 1);

app.use(express.json());
app.use(session({
    secret: 'keyboard cat',
    cookie: { secure: false }
}));

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


app.get('/users/me', (req, res) => {
    const { idx } = req.session;

    const me = users.find(user => {
        return user.idx === idx;
    });

    return res.json(me);
});

app.get('/users', (req, res) => {
    return res.json(users);
});

app.post('/signup', (req, res) => {
    const body = req.body;
    const user = _.pick(
        body,
        [   
            'id',
            'password',
            'name',
            'gender',
            'age',
            'phoneNumber'
        ]
    );
    const findUser = users.every(userId => {
        return userId.id !== body.id;
    });

    const successSignup = () => {
        users.push(Object.assign(user, { idx: uuidv4() }, { password: encryptPassword(body.password) }));
        return res.json({ success: true });
    }

    const failSignup = () => {
        return res.status(400).json({
            message: '이미 존재하는 id입니다.'
        });
    }

    findUser ? successSignup() : failSignup();
});

app.post('/signin', (req, res) => {
    const { id, password } = req.body;

    let success = false;

    const findUserByIdAndPassword = () => {
        const user = users.find(user => {
            return user.id === id && user.password == encryptPassword(password);
        });
        return user;
    }

    const user = findUserByIdAndPassword();

    if(user){
        success = true;
        req.session.idx = user.idx;
    }

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