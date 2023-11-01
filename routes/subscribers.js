var express = require('express');
var router = express.Router();
const Subscriber = require('../models/Subscribers');
const User = require('../models/User');
const isAuthenticated = require('../middleware/isAuthenticated');

router.get('/:userId', isAuthenticated, async (req, res) => {
    const userId = req.params.userId;
    
    try {
        const subscribers = await Subscriber.find({ userId: userId }).populate('subscriberId', 'username'); 
        res.status(200).json(subscribers);
    } catch (err) {
        console.error('Error fetching subscribers:', err);
        res.status(500).send("Error fetching subscribers");
    }
});

router.post('/subscribe/:userIdToSubscribeTo', async (req, res) => {
    const { subscriberId } = req.body;
    const userIdToSubscribeTo = req.params.userIdToSubscribeTo;

    try {
        const newSubscriber = new Subscriber({
            userId: userIdToSubscribeTo,
            subscriberId: subscriberId
        });
        
        await newSubscriber.save();
        
      
        const subscribingUser = await User.findById(subscriberId);
        const userBeingSubscribedTo = await User.findById(userIdToSubscribeTo);

        console.log("Subscrbing user", subscribingUser)
        console.log("subscribing to", userBeingSubscribedTo)
      
        let followingArray = [...subscribingUser.following, userIdToSubscribeTo]
        let followersArray = [...userBeingSubscribedTo.subscribers, subscriberId]
        subscribingUser.following = followingArray
        userBeingSubscribedTo.subscribers = followersArray
        subscribingUser.followingCount += 1
        userBeingSubscribedTo.suscribersCount += 1

       
        await subscribingUser.save();
        await userBeingSubscribedTo.save();
        
        res.status(200).json({ message: 'Subscribed successfully!' });
    } catch (err) {
        console.error('Error subscribing:', err);
        res.status(500).send("Error subscribing");
    }
});

router.delete('/unsubscribe/:userIdToUnsubscribeFrom', async (req, res) => {
    const { subscriberId } = req.body;
    const userIdToUnsubscribeFrom = req.params.userIdToUnsubscribeFrom;

    try {
        await Subscriber.findOneAndRemove({ 
            userId: userIdToUnsubscribeFrom, 
            subscriberId: subscriberId 
        });

        const unsubscribingUser = await User.findById(subscriberId);
        const userBeingUnsubscribedFrom = await User.findById(userIdToUnsubscribeFrom);

        unsubscribingUser.unsubscribeFrom(userIdToUnsubscribeFrom);
        userBeingUnsubscribedFrom.removeSubscriber(subscriberId);

        await unsubscribingUser.save();
        await userBeingUnsubscribedFrom.save();

        res.status(200).json({ message: 'Unsubscribed successfully!' });
    } catch (err) {
        console.error('Error unsubscribing:', err);
        res.status(500).send("Error unsubscribing");
    }
});

module.exports = router;
