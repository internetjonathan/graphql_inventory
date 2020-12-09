const { UserInputError, AuthenticationError } = require('apollo-server');
const Post = require('../../models/Post');
const checkAuth = require('../../util/check-auth');

module.exports = {
    Subscription: {
        newComment: {
            subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('NEW_COMMENT')
        }
    },
    Mutation: {
        createComment: async (_, { postId, body }, context) => {
            const { username } = checkAuth(context);
            if (body.trim() === '') {
                throw new UserInputError('Empty comment', {
                    errors: {
                        body: 'Comment body must not be empty'
                    }
                })
            }
            const post = await Post.findById(postId)

            if (post) {
                post.comments.push({
                    body,
                    username,
                    createdAt: new Date().toISOString()
                })
                await post.save();
                context.pubsub.publish('NEW_COMMENT', {
                    newComment: post
                })
                return post;
            } else {
                throw new UserInputError('post not found')
            }
        },

        async deleteComment(_, { postId, commentId }, context) {
            const { username } = checkAuth(context);

            const post = await Post.findById(postId)

            if (post) {
                const commentIndex = post.comment.findIndex(c => c.id === commentId)
                if (post.comments[commentIndex].username === username) {
                    post.comments.splice(commentIndex, 1);
                    await post.save();
                    return post;
                } else {
                    throw new AuthenticationError('action not allowed')
                }
            } else {
                throw new UserInputError('Post not found')
            }
        }

    }
}