require("dotenv").config();
const ErrorResponse = require("../helper/ErrorResponse");
const asyncHandle = require("../middleware/asyncHandle");
const Post = require("../models/Post");
const User = require("../models/User");

module.exports = {

    //@route [POST] api/post
    //@desc create a post 
    create: asyncHandle(async (req, res, next) => {
        // const { description, image, likes } = req.body;

        // const newPost = new Post({ description, image, likes, user: req.userId });
        const newPost = new Post(req.body)
        await newPost.save();

        res.json({
            success: true,
            message: "Created post successfully",
            post: newPost
        })
    }),

    // @route [PUT] api/post/:id
    // @desc update post
    update: asyncHandle(async (req, res, next) => {
        const post = await Post.findById(req.params.id);

        if (post.userId === req.body.userId) {
            await post.updateOne({ $set: req.body });

            res.json({
                success: true,
                message: 'Updated post successfully',
                post: post
            })
        } else {
            return next(new ErrorResponse(401, "You can't update your post"))
        }
    }), 

    // @route [DELETE] api/post/:id
    // @desc delete a post
    delete: asyncHandle(async (req, res, next) => {
        const post = await Post.findById(req.params.id);

        if (post.userId === req.body.userId) {
            await post.deleteOne();
            res.json({
                success: true,
                message: "The post has been deleted",
            })
        } else {
            return next(new ErrorResponse(401, "You can't delete your post"));
        }
    }),

    // @route [PUT] api/post/:id/like
    // @desc like or dislike post
    likePost: asyncHandle(async (req, res, next) => {
        const post = await Post.findById(req.params.id);
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: { likes: req.body.userId } });

            res.json({
                success: true,
                message: "The post has been liked",
                data: post
            })
        } else {
            await post.updateOne({ $pull: { likes: req.body.userId } });

            res.json({
                success: true,
                message: "The post has been disliked"
            })
        }
    }),

    // @route [GET] api/post
    // @desc get all posts
    getPost: asyncHandle(async (req, res, next) => {
        const posts = await Post.find({ user: req.userId }).populate('user', 'username');

        res.json({
            success: true,
            posts: posts
        })
    }),

    // @route [GET] api/post/:id
    // desc get a post
    getPostById: asyncHandle(async (req, res, next) => {
        const post = await Post.findById(req.params.id);

        if (post) {
            res.json({
                success: true,
                post: post
            })
        } else {
            return next(new ErrorResponse(404, 'Post not found'));
        }
    }),

    // @route [GET] api/post/timeline
    // @desc get timeline posts
    getTimeline: async (req, res) => {
        try {
            const currentUser = await User.findById(req.params.userId);
            const userPosts = await Post.find({ user: currentUser._id });
            const friendPosts = await Promise.all(
                currentUser.followings.map((friendId) => {
                    return Post.find({ user: friendId });
                })
            )
            res.json({
                success: true,
                data: userPosts.concat(...friendPosts)
            })

        } catch (error) {
            res.json({
                success: false,
                message: error.message
            })
        }
    },

    // @route [GET] api/post/profile/:username
    // @desc get user's all posts
    getAllPost: async (req, res) => {
        try {
            const user = await User.findOne({ username: req.params.username });
            const posts = await Post.find({ user: user._id });
            
            res.json({
                success: true,
                data: posts
            })

        } catch (error) {
            res.json({
                success: false,
                message: error.message
            })
        }
        
    }
}