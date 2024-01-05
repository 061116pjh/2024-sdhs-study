import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: false,
    }
});

export default model('User', userSchema);