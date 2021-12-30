const express=require('express');
const path=require('path');
const router=express.Router();

const User=require('../model/User.js');

let OTP;

router.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'../public/index.html'));
})

router.get('/VoterRegistration',(req,res)=>{
    // res.sendFile(__dirname,"./public/VoterRegistration.html");
    res.sendFile(path.join(__dirname,'../public/VoterRegistration.html')) 
})

router.post('/validate',(req,res)=>{
    const{adhar}=req.body;
    let errors=[];

    if(!adhar)
    {
        errors.push({msg:'Please enter the data'});
    }
    if(errors.length>0)
    {
        console.log("errors")
    }
    else{
        User.findOne({adhar:adhar})
        .then(user=>{
            if(user){
                //getting email
                const email=user.email;
                //forming otp
                const otp=Math.floor(Math.random()*101);
                OTP=otp;
                //sending mail
                const sgMail=require('@sendgrid/mail')
                const API_KEY="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"; 
                sgMail.setApiKey(API_KEY)
                const messege={
                    to: email,
                    from:'mahalenachiket77@gmail.com',
                    subject:'messege',
                    text:`Your Otp is ${otp}`,
                    html:`<p> Your Otp is ${otp}</p>`,
                    };
                    sgMail.send(messege).then(Response=>console.log('Email sent...')).catch(error=>console.log(error.messege));
                    //validating otp
                    res.redirect('/check');
                }
        });
    }
})
router.get('/Voting',(req,res)=>{
    res.sendFile(path.join(__dirname,'../public/VotingArea.html')) 
})

router.get('/check',(req,res)=>{
    res.sendFile(path.join(__dirname,'../public/check.html')) 
})

router.post('/check',(req,res)=>{
    if(OTP==req.body.otpfld)
    {
        res.redirect('/Voting');
    }
})


router.get('/Election.json', (req,res)=>{
    res.sendFile(path.join(__dirname,'../build/contracts/Election.json')) 
   }
   )


module.exports=router;