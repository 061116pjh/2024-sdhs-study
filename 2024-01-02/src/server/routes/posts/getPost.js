const { Types: { ObjectId }} = require('mongoose');
const Post = require('@db/posts.schema');

module.exports = {
    path: '/posts/:postId',
    method: 'get',
    handler: async (req, res) => {
        const { postId } = req.params;
        const post = await Post.find({ _id: new ObjectId(postId) });
        return res.json(post);
    }
}