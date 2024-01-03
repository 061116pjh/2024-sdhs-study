const _ = require('lodash');
const users = require('../../db/users');
const encryptPassword = require('../../lib/encryptPassword');

module.exports = {
    path: '/users/:userId',
    method: 'patch',
    handler: (req, res) => {
        const { userId } = req.params;
        const body = req.body;

        const userIndex = users.findIndex((user) => {
            return user.idx === userId;
        });

        const newUser = _.pick(body, ['id', 'password', 'name', 'age', 'gender', 'phoneNumber']);

        if(newUser.password !== undefined) newUser.password = encryptPassword(newUser.password);

        Object.assign(users[userIndex], newUser);

        return res.json({ success: true });
    }
}