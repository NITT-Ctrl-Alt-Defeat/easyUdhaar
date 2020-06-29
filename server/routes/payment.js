const router = require('express').Router();
var api = require('../src/funds_transfer_api').funds_transfer_api;
var authCredentials = require('../credentials.json');
const verify = require('./verifyToken');
const { async } = require('q');
var funds_transfer_api = new api(authCredentials);
const User = require('../model/User');

router.post('/',verify,async (req,res)=>{
    
    const senderId = req.body.senderId;
    const reciverId = req.body.reciverId;
    const amountTransfered = req.body.amount;
    const sender = await User.findOne({_id:senderId});
    const reciver = await User.findOne({_id:reciverId});

    // console.log(sender);
    // console.log(reciver);

    if(sender.balance < amountTransfered){
        return res.status(500).send("Not enough amount to make this payment!");
    }

    function getParameters_pull() {
        var parameters = {
            "x-client-transaction-id": "2i3hb4cw4cnj",
            "Accept": "application/json",
            "Content-Type": "application/json"
        };
        parameters.payload = {
            "businessApplicationId": "AA",
            "senderCardExpiryDate": sender.cardExpiry,
            "amount": amountTransfered,
            "acquirerCountryCode": "840",
            "retrievalReferenceNumber": "330000550000",
            "cardAcceptor": {
                "idCode": "ABCD1234ABCD123",
                "address": {
                    "county": "081",
                    "country": "USA",
                    "state": "CA",
                    "zipCode": "94404"
                },
                "terminalId": "ABCD1234",
                "name": "Visa Inc. USA-Foster City"
            },
            "acquiringBin": "408999",
            "systemsTraceAuditNumber": "451001",
            "senderCurrencyCode": "USD",
            "senderPrimaryAccountNumber": sender.accountNo,
            
        };
        parameters.payload.localTransactionDateTime = Date.now();

        return parameters;
    }

    funds_transfer_api.pullfunds(getParameters_pull())
    .then(async function(result_pull) {
        // Put your custom logic here
        console.log("Pull successful");
        sender.balance-=amountTransfered;
        await sender.save();
        console.log(result_pull.response.body);

        function getParameters_push() {
            var parameters = {
                "x-client-transaction-id": "f54evcwwqrqc1423xf54cw4rc",
                "Accept": "application/json",
                "Content-Type": "application/json"
            };
            parameters.payload = {
                "businessApplicationId": "AA",
                "transactionIdentifier": result_pull.response.body.transactionIdentifier,
                "cardAcceptor": {
                    "idCode": "CA-IDCode-77765",
                    "address": {
                        "county": "San Mateo",
                        "country": "USA",
                        "state": "CA",
                        "zipCode": "94404"
                    },
                    "terminalId": "TID-9999",
                    "name": "Visa Inc. USA-Foster City"
                },
                "acquirerCountryCode": "840",
                "recipientPrimaryAccountNumber": reciver.accountNo,
                "retrievalReferenceNumber": "412770451018",
                "senderAccountNumber": sender.accountNo,
                "transactionCurrencyCode": "USD",
                "acquiringBin": "408999",
                "amount": amountTransfered,
                "systemsTraceAuditNumber": "451018",
                "senderCountryCode": "124"
            };
            parameters.payload.localTransactionDateTime = Date.now();
        
            return parameters;
        }

        funds_transfer_api.pushfunds(getParameters_push())
        .then(async function(result_push) {
            // Put your custom logic here
            console.log("Push successful");
            console.log(result_push.response.body);
            reciver.balance+=amountTransfered;
            await reciver.save();
            //console.log("Done!");
            return res.send({"pull":result_pull,"push":result_push});
            
        })
        .catch(function(error_push) {
            console.log("Push error");
            console.log('\n Response: ' + JSON.stringify(error_push.response));
            console.log('\n Response Status: ' + JSON.stringify(error_push.response.statusCode));


            function getParameters() {
                var parameters = {
                    "x-client-transaction-id": "jnrgnf2453",
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                };
                parameters.payload = {
                    "businessApplicationId": "AA",
                    "transactionIdentifier": result_pull.response.body.transactionIdentifier,
                    "acquirerCountryCode": "608",
                    "retrievalReferenceNumber": "330000550000",
                    "cardAcceptor": {
                        "idCode": "VMT200911026070",
                        "address": {
                            "county": "San Mateo",
                            "country": "USA",
                            "state": "CA",
                            "zipCode": "94404"
                        },
                        "terminalId": "365539",
                        "name": "Visa Inc. USA-Foster City"
                    },
                    "originalDataElements": {
                        "acquiringBin": "408999",
                        "systemsTraceAuditNumber": "451001",
                        "approvalCode": result_pull.response.body.approvalCode,
                        "transmissionDateTime": result_pull.response.body.transmissionDateTime
                    },
                    "acquiringBin": "408999",
                    "systemsTraceAuditNumber": "451050",
                    "senderCurrencyCode": "USD",
                    "amount": amountTransfered,
                    "senderPrimaryAccountNumber": sender.accountNo
                };
                parameters.payload.localTransactionDateTime = Date.now();
            
                return parameters;
            }

            
            funds_transfer_api.reversefunds(getParameters_reverse())
            .then(async function(result_rev) {
                // Put your custom logic here
                console.log("Reverse Succesfull");
                sender.balance+=amountTransfered;
                await sender.save();
                console.log(result_rev.response.body);
            })
            .catch(function(error_rev) {
                console.log("Reverse Error");
                console.log('\n Response: ' + JSON.stringify(error_rev.response));
                console.log('\n Response Status: ' + JSON.stringify(error_rev.response.statusCode));
            });





        });





        
    })
    .catch(function(error_pull) {
        console.log("Pull error");
        console.log('\n Response: ' + JSON.stringify(error_pull.response));
        console.log('\n Response Status: ' + JSON.stringify(error_pull.response.statusCode));
        
    });



});

module.exports = router;