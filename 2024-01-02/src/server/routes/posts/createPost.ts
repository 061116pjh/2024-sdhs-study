import _ from 'lodash';
import { Post } from '../../../db/posts.schema';
import { Route, Method } from '../../../types/Route';

export const createPostRoute: Route = {
    path: '/posts',
    method: Method.POST,
    handler: async (req, res) => {
        const { _id } = req.session;

        if(_id === undefined) throw new Error('401:로그인 후 이용해주세요.');

        const post = _.pick(req.body, ['title', 'content']);
        await Post.create({ ...post, author: _id });

        return res.redirect('/');
    }
}