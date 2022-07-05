const {Router} = require('express');
const config = require('config');
const shortid = require('shortid');
const Link = require('../models/Link');
const auth = require('../middleware/auth.middleware');
const router = Router();


router.post('/generate', auth, async (req, res) => {
    try {
        const baseUrl = config.get('baseUrl');
        const {from} = req.body;
        const code = shortid.generate();
        const existing = await Link.findOne({where: {from: from}});
        if (existing) {
            return res.json({link: existing});
        }
        const to = baseUrl + '/t/' + code;
        const link = new Link({
            code, to, from, owner: req.user.userId
        });
        await link.save();
        res.status(201).json({ link });
    } catch(e) {
        console.error(e);
        res.status(500).json({ message: 'something wrong, try again. Error: ' + e})
    }
})

router.get('/', auth, async (req, res) => {
    try {
        const links = await Link.findAll({ where: {owner: req.user.userId}});
        res.json(links);
    } catch(e) {
        res.status(500).json({ message: 'something wrong, try again. Error: ' + e})
    }
})

router.get('/:id', auth, async (req, res) => {
    try {
        const link = await Link.findByPk(req.params.id);
        res.json(link);
    } catch(e) {
        res.status(500).json({ message: 'something wrong, try again. Error: ' + e})
    }
})

module.exports = router