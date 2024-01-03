const users = require('../../db/users');

module.exports = {
    path: '/users/:userId',
    method: 'delete',
    handler: (req, res) => {
        const { userId } = req.params;

        const filterFunc = (user) => {
            if(user.idx === userId) return false;
            return true;
        }

        users = users.filter(filterFunc);

        return res.json({ success: true });
    }
}