const data = require('../../db/users');
const initData = async () => {
    return await data();
}
const users = initData();

module.exports = {
    path: '/signin',
    method: 'post',
    handler: (req, res) => {
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


    }
}