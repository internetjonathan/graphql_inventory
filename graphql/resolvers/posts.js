const Post = require('../../models/Post');
const checkAuth = require('../../util/check-auth');
module.exports = {

    Query: {
        async getPosts() {
            try {
                const posts = await Post.find()
                return posts
            } catch (err) {
                throw new Error(err)
            }
        },

        async getPost(_, { postId }) {
            try {
                const post = await Post.findById(postId);
                if (post) {
                    return post;
                } else {
                    throw new Error('Post not Found');
                }
            } catch (err) {
                throw new Error(err)
            }
        }
    },

    Mutation: {
        createPost: async (_, { body }, context) => {
            const user = checkAuth(context)

            if (body.trim() === '') {
                throw new Error('Post body must not be empty')
            }

            const newPost = new Post({
                body,
                user: user.indexOf,
                username: user.username,
                createdAt: new Date().toISOString(),
                status: 'pending'
            })
            const post = await newPost.save();
            context.pubsub.publish('NEW_POST', {
                newPost: post
            })

            return post
        }


        // async deletePost(_, {postId}, context){
        //     const user = checkAuth(context);
        // }
    },
    Subscription: {
        newPost: {
            subscribe: (_, __, { pubsub }) => pubsub.asyncIterator(['NEW_POST'])
        }
    }

}