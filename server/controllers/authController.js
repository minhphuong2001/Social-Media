require("dotenv").config();
const ErrorResponse = require("../helper/ErrorResponse");
const asyncHandle = require("../middleware/asyncHandle");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const saltRounds = 10;


module.exports = {

    // @route POST api/auth/register
    // @desc user register 
    register: asyncHandle( async (req, res, next) => {
        const { username, email, password, confirmPassword } = req.body;

        // validation
        if (!(username && email && password && confirmPassword)) {
            return next(new ErrorResponse(400, 'Missing information'));
        }

        // confirm password 
        if (password !== confirmPassword) {
            return next(new ErrorResponse(400, 'Confirm passowrd does not correct'));
        }

        // check exists email
        const checkEmail = await User.findOne({ email });
        if (checkEmail) {
            return next(new ErrorResponse(400, 'Email already exists'));
        }

        const user = await User.findOne({ username });
        if (user) {
            return next(new ErrorResponse(400, 'User already exists'));
        }

        // everything good
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        const accessToken = jwt.sign({ userId: newUser._id, role: newUser.role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRE });

        res.json({
            success: true,
            message: 'Account created successfully',
            accessToken
        })

    }),

    // @route POST api/auth/login
    // @desc user login
    login: asyncHandle(async (req, res, next) => {
        const { username, password } = req.body;

        if (!username || !password) {
            return next(new ErrorResponse(400, 'Missing username and/or password'));
        }

        //check exists user
        const user = await User.findOne({ username });

        if (!user) {
            return next(new ErrorResponse(400, 'Incorrect username or password'));
        }

        // check password
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return next(new ErrorResponse(400, 'Incorrect username or password'));
        }

        // everything good
        const accessToken = jwt.sign({ userId: user._id, role: user.role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRE });

        res.json({
            success: true,
            message: 'Logged in successfully',
            accessToken
        })
    }),

    // @route [GET] api/auth/confirm
    // @desc confirm user 
    confirm: asyncHandle(async (req, res, next) => {
        const userId = req.userId;

        const user = await User.findOne({ _id: userId }).select('-password');

        //check exists user
        if (!user) {
            return next(new ErrorResponse(400, 'Incorrect username or password'));
        }

        res.json({
            success: true,
            user
        })
        
    }),

    // @route [PUT] api/auth
    // @desc update infor of user
    updateInfor: asyncHandle(async (req, res, next) => {
        const user = await User.findById(req.userId).select('-password');

        // check exists user
        if (!user) {
            return next(new ErrorResponse(404, 'User does not exists'));
        }

        const {
            email = user.email,
            profilePicture = user.profilePicture,
            coverPicture = user.coverPicture,
            followers = user.followers,
            followings = user.followings,
            description = user.description,
            from = user.from,
            city = user.city,
            relationship = user.relationship
        } = req.body;

        // check exists email
        if (email !== user.email) {
            const userWithEmail = await User.findOne({ email });

            if (userWithEmail) {
                return next(new ErrorResponse(400, "This is email taken"));
            }
        }

        user.email = email;
        user.profilePicture = profilePicture;
        user.coverPicture = coverPicture;
        user.followers = followers;
        user.followings = followings;
        user.description = description;
        user.from = from;
        user.city = city;
        user.relationship = relationship;

        await user.save();

        res.json({
            success: true,
            message: "Account has been updated"
        })
    }),

    // @route [PUT] api/auth/:id/follow
    // @desc follow a user
    followUser: asyncHandle(async (req, res, next) => {
        if (req.body.userId !== req.params.id) {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            
            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({ $push: { followers: req.body.userId } });
                await currentUser.updateOne({ $push: { followings: req.params.id } });
                res.json({
                    success: true,
                    message: "User has been followed"
                })
            } else {
                return next(new ErrorResponse(400, "You already follow this user"));
            }
        } else {
            return next(new ErrorResponse(403, "You cant follow yourself"));
        }
    }),

    // @route [PUT] api/auth/:id/unfollow
    // @desc unfollow a user
    unfollowUser: asyncHandle(async (req, res, next) => {
        if (req.body.userId !== req.params.id) {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);

            if (user.followers.includes(req.body.userId)) {
                await user.updateOne({ $pull: { followers: req.body.userId } });
                await currentUser.updateOne({ $pull: { followings: req.params.id } });

                res.json({
                    success: true,
                    message: "User has been unfollowed"
                })
            } else {
                return next(new ErrorResponse(400, "You dont follow this user"));
            }
        } else {
            return next(new ErrorResponse(403, "You cant unfollow yourself"));
        }
    }),

    // @route [GET] api/auth/:id
    // @desc get a user
    getUser: async (req, res, next) => {
        const userId = req.query.userId;
        const username = req.query.username;
        try {
            const user = userId
                ? await User.findById(userId)
                : await User.findOne({ username: username });
            
            const { password, updatedAt, ...other } = user._doc;

            res.json({
                success: true,
                other
            });

        } catch (error) {
            res.json({
                success: false,
                message: error.message
            })
        } 

        // try {
        //     const user = await User.findById(req.params.id);
        //     const { password, updatedAt, ...other } = user._doc;
        //     res.json({
        //         success: true,
        //         other
        //     });
        // } catch (error) {
        //     res.json({
        //         success: false,
        //         message: error.message
        //     })
        // }
        
    },

    // @route [GET] api/auth/friends/:userId
    // @desc get friends
    getFriends: asyncHandle(async (req, res, next) => {
        const user = await User.findById(req.params.userId);
        const friends = await Promise.all(
            user.followings.map((friendId) => {
                return User.findById(friendId);
            })
        )
        let friendList = [];
        friends.map((item) => {
            const { _id, username, profilePicture } = item;
            friendList.push({ _id, username, profilePicture });
        })

        res.json({
            success: true,
            data: friendList
        })

        
    })

}