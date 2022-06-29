const mongoose=require('mongoose');
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');
//mongoose.connect(" mongodb://127.0.0.1:27017/matrimonial").then(()=>console.log("connection established")).catch((err)=>console.log(err));

const userSchema = new mongoose.Schema({
    name:String,
    age:Number,
    dob:String,
    gender:{
        type:String,
        enum:["Male","Female"]
    },
    phone:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    marital_status:{
        type:String,
        required:true
    },
    mother_tongue: {
        type:String,
        required:true
    },
    religion:{
        type:String,
        required:true
    },
    city: {
        type:String,
        required:true
    },
    pincode: {
        type:String,
        required:true
    },
    tokens:[
    {
        token:{
            type:String,
        }
    }],
    profile:String
    
});
// hasing the password
userSchema.pre('save',async function (next){
    if(this.isModified('password')){
        this.password= await bcrypt.hash(this.password,12);
    }
    next();
})

//generating authentication token
userSchema.methods.generateAuthToken = async (userLogin) =>
{
    try{
        let token = jwt.sign({_id:this._id},"OURPROJECTISMATRIMONIALADISAGARSHAIL");
        console.log(token);
        userLogin.tokens=userLogin.tokens.concat({token:token});
        await userLogin.save();
        return token;
    }
    catch(err){
        console.log(err);
    }
}
const User=new mongoose.model("User",userSchema);

module.exports=User;