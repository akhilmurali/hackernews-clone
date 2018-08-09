let express = require('express');
let router = express.Router();
let jwt = require('jsonwebtoken');
let bcrypt = require('bcrypt');
let User = require('../models/userModel');

//POST rotute for user registration:
router.post('/register', (req, res) => {
    let salt = bcrypt.genSaltSync(10);
    let hashPassword = bcrypt.hashSync(req.body.password, salt);
    //console.log('hashedPassword' + hashPassword);
    //console.log(bcrypt.compareSync(req.body.password, hashPassword));
    let userData = {
        username: req.body.username,
        email: req.body.email,
        password: hashPassword,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        salt: salt
    };
    User.create(userData).then((user) => {
        if (!user) return res.status(500).send({ message: 'There was a problem registering the user.', error: 'Error registering the user' });
        let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: 86400 });
        res.status(200).send({ auth: true, signedToken: token });
    }).catch((err) => {
        console.log(err);
        console.log('Error writing to the database');
        res.status(500).json({ error: 'server error' });
    });
});

//Add a post:
router.post('/post/add', async (req, res) => {
    let token = req.header['x-access-token'];
    let decoded = await verifyToken(token);
    if (decoded) {
        let userId = decoded.id;
        let postData = {
            title: req.body.title,
            article_url: req.body.article_url,
            uid: userId,
        }
        Post.create(postData).then((post) => {
            if (!post) res.status(500).json({ status: error, msg: 'Error adding post' });
            res.status(200).json({ status: 'ok', msg: 'post created successfully' });
        })
    } else {
        res.status(401).json({ auth: false, error: 'User should be authenticated to do this operation' });
    }
});

//Get all the posts sorted by date:
router.get('/posts', (req, res) => {
    let start_At = parseInt(req.body.skip);
    Post.find({}).skip(start_At).limit(20)
        .then((posts) => {
            res.status(200).json(posts);
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
});

//Retrieve votes by category:
router.get('/posts/:category', async (req, res) => {
    let token = req.header['x-access-token'];
    let decoded = await verifyToken(token);
    if (decoded) {
        let start_At = req.body.skip
        switch (req.params.category) {
            case 'new_stories':
                Post.find({}).skip(start_At).limit(20)
                    .then((posts) => {
                        res.status(200).json(posts);
                    })
                    .catch((err) => {
                        res.status(500).json({ error: err });
                    });
                break;
            case 'top_stories':
                break;
            case 'saved_stories':
                break;
        }
    }
});

//Add comment to a post:
router.post('/posts/:id/addcomment', (req, res) => {
    let token = req.header['x-access-token'];
    let decoded = await verifyToken(token);
    if (decoded) {
        let postId = req.params.id;
        let commentData = {
            username: req.body.username,
            comment: req.body.comment,
            postid: postId
        }
        Comment.create(commentData)
            .then((comment) => {
                res.status(200).json({ status: 'ok', msg: 'comment added successfully' });
            })
            .catch((err) => {
                res.status(500).json({ status: 'error', msg: 'error adding comment' });
            });
    } else {
        res.status(401).json({ auth: false, token: null });
    }
});


router.get('/posts/:id/comments', (req, res) => {
    let token = req.header['x-access-token'];
    let decoded = await verifyToken(token);
    if (decoded) {
        let start_At = parseInt(req.body.skip);
        Comment.find({}).skip(start_At).limit(20)
            .then((comments) => {
                res.status(200).json(comments);
            })
            .catch((err) => {
                res.status(500).json({ error: err });
            });
    } else {
        res.status(401).json({ auth: false, token: null });
    }
});

//Upvote or down vote a post:
router.get('/posts/:id/:vote', (req, res) => {
    let token = req.header['x-access-token'];
    let decoded = await verifyToken(token);
    if (decoded) {
        //update votes here:
        switch (req.params.vote) {
            case 'up':
                Post.find({ _id: req.params.id }, { $inc: { 'up_votes': 1 } })
                    .then((post) => { res.status(200).json({ status: 'ok', msg: 'upvoted' }) })
                    .catch((err) => { res.status(500).json({ status: 'error', msg: 'error updating votes' }) });
                break;
            case 'down':
                Post.find({ _id: req.params.id }, { $inc: { 'down_votes': 1 } })
                    .then((post) => { res.status(200).json({ status: 'ok', msg: 'downvoted' }) })
                    .catch((err) => { res.status(500).json({ status: 'error', msg: 'error updating votes' }) });
                break;
        }
    }
});



//Middleware route to return the decoded object from the JWT:
router.get('/getuser', (req, res, next) => {
    var token = req.headers['x-access-token'];
    if (!token) res.send('No token provided');
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) res.send({ auth: false, message: 'Failed to decode token' });
        req.decodedToken = decoded;
        console.log(req.decodedToken);
        next();
    });
});

//Login Route:
router.get('/getuser', (req, res) => {
    decoded_ID = req.decodedToken.id;
    User.findById(decoded_ID, { password: 0, salt: 0 })
        .then((user) => {
            if (!user) res.json({ error: 'error finding a user' });
            res.status(200).send(user);
        }).catch(() => {
            res.json({ error: 'error reading from database' });
        });
});

router.post('/login', (req, res) => {
    User.findOne({ username: req.body.username })
        .then((user) => {
            console.log(user);
            if (bcrypt.compareSync(req.body.password, user.password)) {
                let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: 86400 });
                res.status(200).json({ auth: true, signedToken: token });
            } else {
                throw new Error('Invalid Credentials');
            }
        }).catch((err) => {
            res.status(401).json({ auth: false, message: 'Invalid login credentials', error: err, token: null });
        });
});

const verifyToken = (token) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return null;
        return decoded;
    });
}

module.exports = router;
