'use strict';
const router = require('express').Router();
const verify = require('./verifyToken');
const User = require('../model/User');
const Campaign = require('../model/Campaign');
const Lender = require('../model/Lender');
const  validator = require('../validate');
const rp = require('request-promise');
const Transaction = require('../model/Transaction')


router.post('/',verify,async (req,res)=>{
    
    const currentUser = await User.findOne({_id:req.user._id});

    // Checking if account is verified or not
    if(currentUser.profileVerified == false){
        return res.send("Profile is not verified!");
    }
  
    //console.log(currentUser);
    
    // Creating New User And saving in Database
    const {campaignId,amountGiven} = req.body;  
   
    const currectCampaign = await Campaign.findOne({_id:campaignId});
    //console.log(currectCampaign);

    if(amountGiven > currectCampaign.amountExpected) return res.send("You cannot lend more amount than expected");


    const campaignOwnerId = currectCampaign.borrowerId;
    const campaignOwner = await User.findOne({_id:campaignOwnerId});
       
    var options = {
        method: 'POST',
        headers:{
            'auth-token': req.header('auth-token')
        },
        uri: 'http://localhost:3000/payment',
        body: {
            "senderId":currentUser._id,
            "reciverId":campaignOwnerId,
            "amount":amountGiven
        },
        json: true // Automatically stringifies the body to JSON
    };
    //console.log("Hello");
    let response = await rp(options)
    .then(async function (parsedBody) {
        //console.log(parsedBody);
        console.log("Hii");
        let lender = {};
        lender.lenderId = currentUser._id;
        lender.campaignId = campaignId;
        lender.amountGiven = amountGiven;
        lender.amountToBeRecieved = amountGiven;
        lender.dateLending = Date.now();
        lender.lendingStarted = true;
        // var currentDate = new Date(Date.now());
        // currentDate.setMonth(currentDate.getMonth()+currectCampaign.duration);
        // lender.endDate = currentDate;
        // currentDate.setMonth(currentDate.getMonth()+6);
    //    lender.finalEndDate = currectDate;
    
           //   Amount expected in given campaign will reduce!
        currectCampaign.amountExpected -= amountGiven;
        if(currectCampaign.amountExpected==0)
        {
            currectCampaign.running = false;
        }
        currectCampaign.amountDue += amountGiven;
        currectCampaign.amountGet += amountGiven;

        // After Payment updating values
        let lenderModel = new Lender(lender);
        await lenderModel.save();
        console.log("Data Added to LENDER Database!!");
        
        await currectCampaign.save();
        console.log("Data Updated to Campaign Database!!");
        
        await currentUser.save();
        console.log("lender Database updated");

        await campaignOwner.save();
        console.log("Campaign owner database updated");

        let transaction = {};
        transaction.sender = currentUser._id;
        transaction.reciver = campaignOwnerId;
        transaction.amount = amountGiven;
        transaction.date = Date.now();
        transaction.campaignId = campaignId; // We have given loan so it will show campaign to which we have paid
        let transactionModel = new Transaction(transaction);
        await transactionModel.save();
        

        res.send(lenderModel);

        //res.send(parsedBody);
    
   })
   .catch(function (err) {
        return res.send("Error: "+ err);
        console.log(err);
        // POST failed...
    });    
  
});

module.exports = router;