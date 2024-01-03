// const { v4: uuidv4 } = require('uuid');
// const encryptPassword = require('../lib/encryptPassword');

const dbConnect = require('./connect');
const User = require('./users.schema');

module.exports = async (req, res) => {
    const users = await User.find({});
    return users;

};

// const initConnection = async () => {
//     await dbConnect();
    
//     // console.log(User);
//     module.exports = await User.find();
// }

// initConnection();