const Subscription = require('../Models/subscriptionModel');

const createSubscription = async(req,res) => {

    try {
        const { email } = req.body;
        
        const existingEmail = await Subscription.findOne({ email: email });

        if(!existingEmail){
            // Find the maximum id in the subscription table
            const resultSubscription = await Subscription.findOne({}, {}, { sort: { subscription_id: -1 } });

            let subscription_id;

            if (resultSubscription && resultSubscription.subscription_id) {
                const maxSubscriptionId = resultSubscription.subscription_id;
                subscription_id = parseInt(maxSubscriptionId) + 1;
            } else {
                subscription_id = 1;
            }
            const newSubscription = await Subscription.create( {subscription_id, email} );

            res.status(201).send({ success: true, message: 'Successfully Subscribed' });
        }else{
            res.status(200).send({ success: false, message: 'Already Subscribed' });
        }
        
    }catch(error){
        console.error('Error subscribing:', error);
        res.status(500).send({ success: false, message: 'Internal server error.' });
    }
    
}

module.exports = {
    createSubscription
}