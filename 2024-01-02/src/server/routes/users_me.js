const users = require('../../db/users');

module.exports = {
    path: '/users/me',
    method: 'get',
    handler: (req, res) => {
        const { idx } = req.session;

        const me = users.find(user => {
            return user.idx === idx;
        });

        return res.json(me);
    }
}