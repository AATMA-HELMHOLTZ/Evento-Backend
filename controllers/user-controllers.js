const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const User = require("../models/user");
const RequestError = require("../models/request-error");




const signUp = async (req,res,next) => {
    console.log("in HERE")
    const { email, password} = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({email: email});
    } catch (err) {
        const error = new RequestError("Error querying database", 500, err);
        return next(error);
    }
    console.log(existingUser)
    if (existingUser) {
        const error = new RequestError('User exists already, please login instead.',422);
        return next(error);
    }

    let hashedPassword;
    console.log(email)
    console.log(password)
    const saltRounds = 12
    try {
        hashedPassword = await bcrypt.hash( password ,12);
    } catch (err) {
        const error = new RequestError('Could not create user, please try again.', 500, err);
        return next(error);
    }

    const createdUser = new User({
        email,
        // image: 'https://win75.herokuapp.com/' + filePath,
        password: hashedPassword
    });
    let token;
    try {
        token = jwt.sign(
            {userId: createdUser.id, email: createdUser.email},
            process.env.Jwt_Key,{
                expiresIn: '2d' // expires in 2d
            }
        );
    } catch (err) {
        const error = new RequestError('Signing up failed, please try again later.', 500, err);
        return next(error);
    }

    await res
        .status(201)
        .json({"status":"success",user: createdUser, email: createdUser.email, token: token});

}





exports.signUp= signUp;


