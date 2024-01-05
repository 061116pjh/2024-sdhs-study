import { Types } from 'mongoose';
import { Post } from '../../../db/posts.schema';
import { Route, Method } from '../../../types/Route';

const { ObjectId } = Types;

export const deletePostRoute: Route = {
    path: '/posts/:postId',
    method: Method.DELETE,
    handler: async (req, res) => {
        const { postId: _id } = req.params;

        await Post.deleteOne({ _id: new ObjectId(_id) });

        return res.redirect('/');
    }
}