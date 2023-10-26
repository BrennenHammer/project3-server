var express = require('express');
var router = express.Router();
const Subscriber = require('../models/Subscribers');

router.get('/:userId', async (req, res) => {
    const userId = req.params.userId;
    
    try {
        const subscribers = await Subscriber.find({ subscribedTo: userId }).populate('user', 'name profileImage');
        res.json(subscribers);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching subscribers");
    }
});

module.exports = router;
