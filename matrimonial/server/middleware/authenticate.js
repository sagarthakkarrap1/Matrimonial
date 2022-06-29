const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");

const Authenticate = async (req, res, next) => {
    try {

        const token =  req.cookies.jwtoken;
        console.log(token+"abcdefghij");
        const verifyToken = jwt.verify(token, "OURPROJECTISMATRIMONIALADISAGARSHAIL");
        console.log("token verified->");
        console.log( verifyToken);
        const rootUser = await User.findOne({"tokens.token": token });

        if(!rootUser){
            throw new Error("user not found")
        }
        req.token=token;
        req.rootUser=rootUser;
        req.userID=rootUser._id;
        next();
    }
    catch (err) {
        res.status(401).send("Unauthorized: No token provided");
        console.log(err);
    }
}

module.exports = Authenticate;