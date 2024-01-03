const mongoose = require('mongoose');

const connectionString = `mongodb+srv://${process.env.MONGODB_USER_NAME}:${process.env.MONGODB_PASSWORD}@cluster0.p5ah3dg.mongodb.net/?retryWrites=true&w=majority`;

module.exports = async () => {
    await mongoose.connect(connectionString);
    console.log('Connected!!!');
}