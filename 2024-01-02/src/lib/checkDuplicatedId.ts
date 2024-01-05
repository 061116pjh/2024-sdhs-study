import User from '../db/users.schema';

export default async (id: string): Promise<boolean> => {
    const user = await User.findOne({ id });
    return user !== null;
}