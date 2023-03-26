const express = require('express')

const router = express.Router()

const User = require('../models/userModel')

const Token = require('../models/tokenModel')

const bcrypt = require("bcrypt")

const jwt = require("jsonwebtoken")
const sendEmail = require('../utils/sendEmail')

router.post('/register', async (req, res) => {

    try {
        const existingUser = await User.findOne({ email: req.body.email })

        if (existingUser)
            return res.status(200).send({ success: false, message: "User Already Registred" });

        const password = req.body.password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        req.body.password = hashedPassword

        const newuser = new User(req.body)
        const result = await newuser.save()
        await sendEmail(result, "verify-email")
        res.status(200).send({ success: true, message: ' Registeration successfully ,Please Verify your email' })

    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }

})

router.post('/login', async (req, res) => {

    try {

        const user = await User.findOne({
            email: req.body.email
        })
        if (user) {

            const passwordsMashed = await bcrypt.compare(req.body.password, user.password)
            if (passwordsMashed) {
                if(user.isVerified) {
                    const dataToBeSentToFrontEnd = { _id: user._id, email: user.email, name: user.name }

                    const token = jwt.sign(dataToBeSentToFrontEnd, 'SHEY', {
                        expiresIn: 60 * 60,
                    });
                    res.status(200).send({ success: true, message: 'User Login successfull', data: token })

                }else {
                    res.status(200).send({ success: false, message: 'Email not Verified' })

                }
             
            } else
                res.status(200).send({ success: false, message: 'Incorrect Password' })

        }

        else {
            res.send({ success: false, message: 'User Does Not exist', data: null })
        }
    } catch (error) {

        res.status(400).send(error)

    }

});

router.post("/verfiyemail", async (req, res) => {
    try {
        console.log(req.body.token)
        const tokenData = await Token.findOne({ token: req.body.token })
        if (tokenData) {
            await User.findOneAndUpdate({
                _id: tokenData.userid,
                    
                isVerified
                    : true
            })
            await Token.findOneAndDelete({ token: req.body.token })
            res.send({ success: true, message: 'Email Verified Successfuly' })
        }
        else {
            res.send({ success: false, message: 'Invalid token' })

        }

    } catch (error) {
        res.status(500).send(error)
    }
})
module.exports = router