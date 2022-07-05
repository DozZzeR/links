const {Router} = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator')
const User = require('../models/User');
const router = Router();

// /api/auth/register
router.post(
    '/register', 
    [
        check('email', 'incorrect email').isEmail(),
        check('password', 'minimum 6 character required').isLength({ min: 6 })
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'incorrect registration data'
                });
            }
            const { email, password } = req.body;
            console.log('find user');
            const candidate = await User.findOne({ where: { email: email }});
            if (candidate) {
                return res.status(400).json({message: 'user with this email is already registered' })
            }

            const hashedPassword = await bcrypt.hash(password, 4);
            const user = new User({email: email, password: hashedPassword});
            console.log('user created');
            await user.save();
            res.status(201).json({ message: 'user created' });
            console.log('user saved');
        } catch(e) {
            res.status(500).json({ message: 'something wrong, try again'});
        }
    }
);

// /api/auth/login
router.post(
    '/login', 
    [
        check('email', 'incorrect email').normalizeEmail().isEmail(),
        check('password', 'password required').exists()
    ],
    async (req, res) => {
        try {

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'incorrect registration data'
                });
            }
            const { email, password } = req.body;
            const user = await User.findOne({ where: { email: email }});
            if (!user) {
                return res.status(400).json({ message: 'user not exists or password incorrect' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'user not exists or password incorrect' })
            }

            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret' ),
                { expiresIn: '1h' }
            );

            res.json({ token, userId: user.id })
        } catch(e) {
            res.status(500).json({ message: 'something wrong, try again'})
        }
    }
);

module.exports = router