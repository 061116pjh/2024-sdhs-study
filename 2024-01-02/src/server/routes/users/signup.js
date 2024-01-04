const _ = require('lodash');
const User = require('@db/users.schema');
const checkDuplicatedId = require('@lib/checkDuplicatedId');
const encryptPassword = require('@lib/encryptPassword');

module.exports = {
    path: '/signup',
    method: 'post',
    handler: async (req, res) => {
        const user = _.pick(
            req.body,
            [   
                'id',
                'password',
                'name',
                'age',
            ]
        );

        if(await checkDuplicatedId(req.id) !== null) throw new Error('400: 해당 아이디는 사용중입니다.'); 

        await User.create(
            Object.assign(
                user, 
                { password: encryptPassword(user.password) }
            )
        );
        return res.json({ success: true });
    }
}