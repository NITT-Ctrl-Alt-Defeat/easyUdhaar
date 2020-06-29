const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const  validator = require('../validate');
var express=require('express');
var nodemailer = require("nodemailer");
var app=express();
const rp = require('request-promise');
const verify = require('./verifyToken');
const { async } = require('q');

// This file contains login and signup router

//Here we are configuring our SMTP Server details.
// STMP is mail server which is responsible for sending and recieving email.
var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.PASSWORD //allow the sign-in access from less secure apps should checked in given emailId
    }
});

var rand,mailOptions,host,link;

router.get('/verify',async function(req,res){
if((req.protocol+"://"+req.get('host')+'/user')==("http://"+host))
{
    console.log("Domain is matched. Information is from Authentic email");
    if(req.query.id==rand)
    {
        console.log("email is verified");

        User.findOne({email:mailOptions.to},(err,user)=>{
            if(err){
                console.log("Error finding user: "+err);
            }
            else{
                user.emailVerified = true;
                user.save(function(err){
                    if(err){
                        console.log("Error in Saving: " + err);
                    }
                    else{
                        console.log("Done!!");
                    }
                })
            }
        });

        res.end("<h1>Email "+mailOptions.to+" is been Successfully verified");
    }
    else
    {
        console.log("email is not verified");
        await user.remove();
        res.end("<h1>Bad Request</h1>");
    }
}
else
{
    await user.remove();
    res.end("<h1>Request is from unknown source");
}
});


router.post('/register',async (req,res)=>{
    
    //Validation
    const validate_check = validator.registrationValidation(req.body);
    if(validate_check) return res.status(400).send(validate_check);
    
    
    //Checking if user already exist in Database
    const emailExist = await User.findOne({email:req.body.email});
    if(emailExist) return res.status(400).send("Email Already exist");

    // Checking if both the passwords match or not
    if(req.body.password != req.body.password1){
        return res.status(400).send("Password does not match!!");
    }

    // Hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password,salt);
    
    // Creating New User And saving in Database
    const {firstName,lastName,email,password,dob,address} = req.body;
    email1=email;
    rand=Math.floor((Math.random() * 100) + 54);
    console.log("------------------------"+rand);
    host='localhost:3000/user'
    link="http://"+host+"/verify?id="+rand;
    
    mailOptions={
        to : email1,
        subject : "Please confirm your Email account",
        html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>" 
    }

    console.log(mailOptions);
    
    smtpTransport.sendMail(mailOptions, function(error, response){
     if(error){
            console.log(error);
        res.end("error");
     }else{
            console.log("Message sent: " + response.message);
        res.end("Email sent!!");
        }
    });
    
    let user = {};
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.password =  hashedPassword;
    user.dob = dob;
    let userModel = new User(user);
    await userModel.save();
    console.log("Data Added to User Database!!");
   
});


// Login route
router.post('/login',async (req,res)=>{

    //Validation
    const validate_check = validator.loginValidation(req.body);
    if(validate_check) return res.status(400).send(validate_check);

    // Checking if user not registered 
    const selected_user = await User.findOne({email:req.body.email});
    if(!selected_user) return res.status(400).send("User Not Registered");

    // Checking if email is register or not
    if(selected_user.emailVerified==false) return res.status(400).send("Verify email first!");

    // Verifying Password
    const validPassword = await bcrypt.compare(req.body.password,selected_user.password);
    if(!validPassword) return res.status(400).send("Invalid Password");


    const token = jwt.sign({_id:selected_user._id},process.env.TOKEN_SECRET);
    //console.log(token);
    
    res.send(token);
    

});

//change password
router.post('/changePassword',verify,async (req,res)=>{
    const user = await User.findOne({_id:req.user._id});
    
    // Checking if prev password is correct
    const validPassword = await bcrypt.compare(req.body.prevPassword,user.password);
    if(!validPassword) return res.status(400).send("Invalid Previous Password");

    // Checking if given password are matching
    if(req.body.password1!=req.body.password) return res.send("Password dont match");


    // Hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password,salt);

    user.password = hashedPassword;
    await user.save();
    res.send("Password Changed!!");
    // Logout

});


// Edit profile
router.post('/editProfile',verify,async (req,res)=>{
    const {gender,aadharNo,panNo,accountNo,cardExpiry,occupation,address} = req.body;

    const user = await User.findOne({_id:req.user._id});
    
    const validate_check = validator.editValidation(req.body);
    if(validate_check) return res.status(400).send(validate_check);


    if(typeof gender !== undefined){
        user.gender = gender
    }
    if(typeof aadharNo !== undefined){
        user.aadharNo = aadharNo
    }
    if(typeof panNo !== undefined){
        user.panNo = panNo
    }
    if(typeof accountNo !== undefined){
        user.accountNo = accountNo
    }
    if(typeof cardExpiry !== undefined){
        user.cardExpiry = cardExpiry
    }
    if(typeof occupation !== undefined){
        user.occupation = occupation
    }
    
    if(typeof address !== undefined){
        user.address = address
    }
    await user.save();
    res.send(user);
      
});



// Forget Password



module.exports = router;
