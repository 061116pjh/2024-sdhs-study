const _ = require('lodash');
const data = require('../../db/users');
const initData = async () => {
    return await data();
}
const users = initData();
const User = require('../../db/users.schema');

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
                'gender',
                'age',
                'phoneNumber'
            ]
        );

        const duplicatedUser = async () =>{
            return await User.findOne({ id: user.id });
        }

        const successSignup = async () => {
            await User.create(user);
            return res.json({ success: true });
        }

        const failSignup = () => {
            return res.status(400).json({
                message: '이미 존재하는 id입니다.'
            });
        }

        await duplicatedUser() === null ? successSignup() : failSignup();
    }
}