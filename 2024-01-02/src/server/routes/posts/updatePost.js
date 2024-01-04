const { Types: { ObjectId } } = require('mongoose');
const Post = require('@db/posts.schema');
const _ = require('lodash');

module.exports = {
    path: '/posts/:postId',
    method: 'patch',
    handler: async (req, res) => {
        const { postId: _id} = req.params;

        await Post.updateOne(
            { _id: new ObjectId(_id) },
            { $set: _.pick(req.body, ['title', 'content'])}
        );
        
        return res.redirect('/');
    }
}