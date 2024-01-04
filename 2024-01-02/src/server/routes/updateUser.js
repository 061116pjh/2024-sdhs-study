const _ = require('lodash');
const User = require('../../db/users.schema');
const encryptPassword = require('../../lib/encryptPassword');

module.exports = {
    path: '/users/:userId',
    method: 'patch',
    handler: async (req, res) => {
        const { userId: _id } = req.params;

        const newUser = _.pick(req.body, ['id', 'password', 'name', 'age']);

        if(newUser.password !== undefined) newUser.password = encryptPassword(newUser.password);

        await User.updateOne({ _id }, { $set: newUser });

        return res.json({ success: true });
    }
}