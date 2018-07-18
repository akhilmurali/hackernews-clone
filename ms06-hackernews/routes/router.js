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
        res.status(500).json({ error: 'server error' })
    });
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

module.exports = router;
