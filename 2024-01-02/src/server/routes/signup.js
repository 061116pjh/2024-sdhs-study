const _ = require('lodash');
const { v4: uuidv4 }= require('uuid');
const data = require('../../db/users');
const initData = async () => {
    return await data();
}
const users = initData();

module.exports = {
    path: '/signup',
    method: 'post',
    handler: () => {
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
    }
}