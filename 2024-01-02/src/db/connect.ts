import mongoose from 'mongoose';

const id: string = process.env.MONGODB_USERNAME as string;
const pw: string = process.env.MONGODB_PASSWORD as string;
const connectionString = `mongodb+srv://${id}:${pw}@cluster0.p5ah3dg.mongodb.net/?retryWrites=true&w=majority`;

export const connectDB =  async () => {
    await mongoose.connect(connectionString);
    console.log('Connected!!!');
}