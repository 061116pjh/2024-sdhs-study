const _ = require('lodash');
const User = require('../../db/users.schema');
const encryptPassword = require('../../lib/encryptPassword');

module.exports = {
    path: '/signup',
    method: 'post',
    handler: async (req, res) => {
        const body = req.body;
        const user = _.pick(
            body,
            [   
                'id',
                'password',
                'name',
                'age',
            ]
        );

        const duplicatedUser = async () => {
            return await User.findOne({ id: user.id });
        }

        if(await duplicatedUser() !== null) throw new Error('400: 해당 아이디는 사용중입니다.'); 

        await User.create(
            Object.assign(
                user, 
                { password: encryptPassword(user.password) }
            )
        );
        return res.json({ success: true });
    }
}