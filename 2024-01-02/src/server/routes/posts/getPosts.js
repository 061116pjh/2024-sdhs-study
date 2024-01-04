const Post = require('@db/posts.schema');
module.exports = {
    path: '/posts',
    method: 'get',
    handler: async (req, res) => {
        return res.json(await Post.find());
    }
}