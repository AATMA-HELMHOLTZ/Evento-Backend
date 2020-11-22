const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const User = require("../models/user");
const RequestError = require("../middlewares/request-error");


const validationResult = require("express-validator").validationResult;

//To get all users
const getUsers = async (req,res,next) =>{
    let Users;
    try {
        Users = await User.find();
    } catch (err) {
        const error = new RequestError('Fetching users failed, please try again later.', 500, err);
        return next(error);
    }
    await res.json(
        {
            "status":"success",
            "Users": Users.map(User => User.toObject({getters: true}))
        }
        );
}


//To get details of a particular user
const getUserById = async (req, res, next) => {
    const userId = req.userData.userId;
    let user;
    try {
        user = await User.findById(userId)
    } catch (err) {
        const error = new RequestError("Something went wrong can't get user.", 500, err);
        return next(error);
    }
    if (!user) {
        const error = new RequestError("Can't find user for provided id", 404);
        return next(error);
    }
    res.status(200).json({
        "status":"success",
        data: user.toObject(
            {getters: true}
        )
    });
};


// Sign Up
const signUp = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        let params = "";
        errors.array().forEach((e) => {
            params += `${e.param}, `
        });
        params += "triggered the error!!";
        return next(
            new RequestError(params, 422)
        );
    }
    const {name,username, appPassword,mobile,city} = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({username: username});
    } catch (err) {
        const error = new RequestError("Error querying database", 500, err);
        return next(error);
    }
    // console.log(existingUser)
    if (existingUser) {
        // console.log("in here")
        let hashedPassword;
        const saltRounds = 12
        try {
            hashedPassword = await bcrypt.hash(appPassword, 12);
        } catch (err) {
            const error = new RequestError('Could not create user, please try again.', 500, err);
            return next(error);
        }
        try{
            existingUser.appPassword = hashedPassword;
            await existingUser.save();
            let token;
            try {
                token = jwt.sign(
                    {userId: existingUser.id, username: existingUser.username},
                    process.env.Jwt_Key, {
                        expiresIn: '2d' // expires in 2d
                    }
                );
            } catch (err) {
                const error = new RequestError('Signing up failed, please try again later.', 500, err);
                return next(error);
            }

            await res
                .status(201)
                .json({"status": "success", user: existingUser, username: existingUser.username, token: token});
        }catch(err){
            const error = new RequestError('ajsdhf',500,err);
            return next(error);

        }

    }
    else{
        let hashedPassword;
        // console.log(username)
        // console.log(appPassword)
        const saltRounds = 12
        try {
            hashedPassword = await bcrypt.hash(appPassword, 12);
        } catch (err) {
            const error = new RequestError('Could not create user, please try again.', 500, err);
            return next(error);
        }

        const createdUser = new User({
            name,
            username,
            // image: 'https://win75.herokuapp.com/' + filePath,
            appPassword: hashedPassword,
            mobile,
            city
        });

        await createdUser.save();
        let token;
        try {
            token = jwt.sign(
                {userId: createdUser.id, username: createdUser.username},
                process.env.Jwt_Key, {
                    expiresIn: '2d' // expires in 2d
                }
            );
        } catch (err) {
            const error = new RequestError('Signing up failed, please try again later.', 500, err);
            return next(error);
        }

        await res
            .status(201)
            .json({"status": "success", user: createdUser, username: createdUser.username, token: token});
    }


}


//Login
const login = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        let params = "";
        errors.array().forEach((e) => {
            params += `${e.param}, `
        });
        params += "triggered the error!!";
        return next(
            new RequestError(params, 422)
        );
    }

    const {username, appPassword} = req.body;
    let existingUser;

    try {
        existingUser = await User.findOne({username: username});
    } catch (err) {
        const error = new RequestError(
            err.message,
            500
        );
        return next(error);
    }

    if (!existingUser) {
        const error = new RequestError(
            'You are not registered!!!',
            403
        );
        return next(error);
        // res.json(
        //     {error: error, existingUser}
        // );
    }

    let isValidPassword = false;
    try {
        isValidPassword = await bcrypt.compare(appPassword, existingUser.appPassword);
    } catch (err) {
        const error = new RequestError(
            'Could not log you in, please check your credentials and try again.',
            500
        );
        return next(error);
    }

    if (!isValidPassword) {
        const error = new RequestError(
            'Incorrect appPassword entered.',
            403
        );
        return next(error);
    }

    let token;
    try {
        token = jwt.sign(
            {userId: existingUser.id, username: existingUser.username,},
            process.env.Jwt_Key,
        );
    } catch (err) {
        const error = new RequestError(
            'Logging in failed, please try again later.',
            500
        );
        console.log(err);
        return next(error);
    }

    const existingUserObj = existingUser.toObject();
    // Delete appPassword from local existingUser variable to avoid sending it to the User.
    delete existingUserObj.appPassword;
    await res.json({
        "status": "success",
        "user": existingUserObj,
        "token": token
    });
};

const editUser = async (req, res, next) => {
    const userId = req.userData.userId;
    let user;
    try{
        user = await User.findById(userId);
    }catch (err){
        const error = new RequestError("Something went wrong, can't get the user",500)
        next(error);
    }
    if (!user){
        const error = new RequestError("Can't find user for provided id",404);
        next(error);
    }
    const errors = validationResult(req);

    if (!errors.isEmpty()){
        return next(
            new RequestError('Invalid inputs passed, please check your data.',422)
        );
    }

    const {name,username,mobile,city}= req.body;

    let filePath;
    try {
        if (req.file) {
            filePath = req.file.path;
        } else {
            filePath = 'uploads/images/DUser.jpeg'
        }
    } catch (err) {
        const error = new RequestError(err.message + "olol", err.code);
        return next(error);
    }
    user.name = name;
    user.username = username;
    user.mobile = mobile;
    user.city = city;
    user.image = 'http://localhost:5000/' + filePath;
    try {
        await user.save();
    } catch (err) {
        const error = new RequestError(
            err.message,
            500
        );
        return next(error);
    }
    res.status(200).json({
        user: user.toObject(
            {getters: true})
    });

}

const deleteUser = async  (req,res,next) => {
    let user;
    try{
        user = User.deleteMany()
    }catch (err) {
        const error = new RequestError('Deleting events failed, please try again later.', 500, err);
        return next(error);
    }

    await res.json(
        {
            "status":"success"

        })
}
exports.deleteAll = deleteUser;
exports.editUser = editUser;
exports.getUserById = getUserById;
exports.getUsers = getUsers;
exports.login = login;
exports.signUp = signUp;


