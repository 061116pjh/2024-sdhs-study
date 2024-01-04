const _ = require('lodash');
const User = require('@db/users.schema');
const checkDuplicatedId = require('../../lib/checkDuplicatedId');
const encryptPassword = require('../../lib/encryptPassword');

module.exports = {
    path: '/users/:userId',
    method: 'patch',
    handler: async (req, res) => {
        const { userId: _id } = req.params;

        const newUser = _.pick(req.body, ['id', 'password', 'name', 'age']);

        if(req.id !== undefined && await checkDuplicatedId(req.body.id)) throw new Error('400: 해당 아이디는 사용중입니다.');

        if(newUser.password !== undefined) newUser.password = encryptPassword(newUser.password);

        await User.updateOne({ _id }, { $set: newUser });

        return res.json({ success: true });
    }
}