const crypto = require('crypto');

module.exports = encryptPassword = (password) => {
    return crypto
        .createHash('sha256')
        .update(password + 'sdhs')
        .digest('base64');
}