const users = require('../../db/users');

module.exports = {
    path: '/users',
    method: 'get',
    handler: async (req, res) => {
        const data = await users();
        return res.json(data);
    }
}
