const User = require('@db/users.schema');

module.exports = async (id) => {
    const user = await User.findOne({ id });
    return user !== null;
}