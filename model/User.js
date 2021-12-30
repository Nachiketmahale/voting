const mongoose=require('mongoose');

const UserSchema=new mongoose.Schema({
    adhar:{
        type:String
    },
    email:{
        type:String
    },
    voterId:{
        type:String
    },
    date:{
        type:String
    },
})

const User=mongoose.model('User',UserSchema);

module.exports=User;