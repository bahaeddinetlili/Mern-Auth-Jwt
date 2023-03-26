const nodemailer = require('nodemailer');
const bcrypt = require("bcrypt");
const Token = require('../models/tokenModel')
module.exports = async (user, mailType) => {

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 587,
            secure: true, // upgrade later with STARTTLS
            auth: {
                user: "bahaeddinetlili9@gmail.com",
                pass: "cpqtfyfdcucybfsa",
            },
        });

        const enryptedToken = bcrypt.hashSync(user._id.toString(), 10).replaceAll("/","")
        const token = new Token({ userid: user._id, token: enryptedToken.replaceAll('/', "") })
        await token.save();
        const emailContent = `<div><h1>Please Click on The Below Link to verify your email adress</h1> <a href="http://localhost:3000/verifyemail/${enryptedToken}">${enryptedToken}</a> </div>`
        const mailOptions = {
            from: "bahaeddinetlili9@gmail.com",
            to: user.email,
            subject: "Verify Email For Mon Auth",
            html: emailContent,
        }

        await transporter.sendMail(mailOptions)
    } catch (error) {
        console.log(error)
        console.log(user.email + "invalid")
    }
}