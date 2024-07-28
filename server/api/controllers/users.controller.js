const User = require('../modules/users.module');
const bcrypt = require("bcryptjs")
const httpStatusText = require('../utils/httpStatusText')
const generateJWT = require('../utils/generateJWT');
const nodemailer = require('nodemailer');
const { use } = require('../routers/users.routers');


const getAllUsers = async (req,res)=>{
    // get all courses from mongodb using Course model
    const users = await User.find({},{"__v":false});
    res.json({status: httpStatusText.SUCCESS ,data: {users}});
}
const getOnlyUser = async (req,res)=>{
    try{
        const userId = req.params.id;
        const user = await User.findById(userId);
        if(!user){
            res.status(404).json({status: httpStatusText.FAIL ,Message: 'user not found'});
        }
        return res.json({status: httpStatusText.SUCCESS ,data: {user}});
    }catch(error){
        return res.status(400).json({status: httpStatusText.ERROR ,Message: error.Message});
    }
}

const register = async(req,res)=>{
    
    console.log('========= req.body ========');
    console.log(req.body);
    try{
        const {userName, email, password, businessInfo} = req.body;
        const oldUser = await User.findOne({email:email});

        if(oldUser){
            return res.status(400).json({status: httpStatusText.FAIL,Message: "The user email is alerady exit"});
        }

        // password hashing
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = new User({
            userName,
            email,
            password: hashedPassword,
            businessInfo
        });
        
        // generate jwt token
        const token = await generateJWT({email: newUser.email, id: newUser._id});
        // console.log("token ==>",token);
        newUser.token = token;
        await newUser.save();

        return res.status(201).json({status: httpStatusText.SUCCESS,data: {users:newUser}})

    }catch(error){
        console.error('error',error)
        return res.status(400).json({status: httpStatusText.ERROR, Message: error.Message});
    }
}
const login = async (req,res)=>{
    console.log("req.body");
    console.log(req.body);
    console.log('===============')
    const {email,password} = req.body;
    console.log('Password:', password); // Check password value
    
    if(!email || !password){
        return res.status(400).json({status: httpStatusText.ERROR, Message: "email and password are both require"});
    }

    try{
        console.log('Request Body:', req.body); // Check if email and password are present in the request body
        console.log('Password:', password); // Check the value of the password variable

        const loginUser = await User.findOne({email:email});
    if(!loginUser){
        return res.status(400).json({status: httpStatusText.FAIL,Message: "User not exists"});

    }else{
        const matchedPassword = await bcrypt.compare(password,loginUser.password);
        if(matchedPassword){

            const token = await generateJWT({email: loginUser.email, id: loginUser._id});
            return res.status(200).json({status: httpStatusText.SUCCESS, Message: "Login is success",data:{'token':token , 'id':loginUser._id}});
        }else{
            return res.status(400).json({status: httpStatusText.ERROR, Message: "The password is wrong"});
        }
    }
    }catch(error){
        console.error('Login Error:', error);
        return res.status(500).json({ status: httpStatusText.ERROR, Message: "Internal Server Error" });
    }
}
const updateUser = async (req,res)=>{
    const userId = req.params.id;
    try{
        const updatedUser = await User.updateOne({_id: userId}, {$set: {...req.body}});
        return res.status(200).json({status: httpStatusText.SUCCESS, data: {user:updatedUser}});

    }catch(error){
        return res.status(400).json({status: httpStatusText.ERROR, Message: error.Message});
    }
}

const logout = async (req, res) => {
    try {
        // Invalidate token logic if you maintain a token blacklist
        // For now, just send a success response
        return res.status(200).json({ status: httpStatusText.SUCCESS, Message: "Logout successful" });
    } catch (error) {
        console.error('Logout Error:', error);
        return res.status(500).json({ status: httpStatusText.ERROR, Message: "Internal Server Error" });
    }
};

const foregetPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ status: httpStatusText.FAIL, message: 'User not found' });
        }

        // Generate a reset token
        const token = await generateJWT({email: user.email, id: user._id});
        
        // Set token and expiration on the user object
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        await user.save();

        // Send the email
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            to: user.email,
            from: process.env.EMAIL_USER,
            subject: 'Password Reset',
            text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
                Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n
                http://localhost:3000/reset-password/${token}\n\n
                If you did not request this, please ignore this email and your password will remain unchanged.\n`,
        };

        try {
            console.log('========= start send email function =======');
            await transporter.sendMail(mailOptions);
            console.log('Password reset email sent to:', user.email);
            res.status(200).json({ status: 'success', message: 'Password reset email sent' });

        } catch (error) {
            console.error('Error sending password reset email:', error);
            res.status(500).json({ status: 'error', message: 'Failed to send email' });

        }
        
    } catch (error) {
        console.error('Error in forgetPassword function:', error);
        res.status(500).json({ status: 'error', message: `Internal server error ${error}` });
    }
}
module.exports = {
    getAllUsers,
    getOnlyUser,
    register,
    login,
    updateUser,
    logout,
    foregetPassword,
}