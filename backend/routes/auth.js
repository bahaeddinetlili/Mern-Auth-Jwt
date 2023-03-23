const express = require('express')

const router = express.Router()

const User = require('../models/userModel')

router.post('/register', async(req, res) => {

    try {
        const newuser = new User(req.body)
        await newuser.save()
        res.status(200).send({ success: true, message: 'User Registered successfully' })
    } catch (error) {
       
        res.status(400).send(error)
    }

})

router.post('/login', async (req, res) => {

    try {

        const user = await User.findOne({email:req.body.email,password :req.body.password})
        if(user)
        {
            res.send({success :true,message:'User Login successfull',data :user})

        }
        else {
            res.send({success :false,message:'User Login failed',data :null})

        }
    } catch (error) {

        res.status(400).send(error)
    }

});

module.exports = router