const express = require('express')
const  connectDB = require ('./config/mongodbConnection')
const colors = require ('colors')

require('dotenv').config()
connectDB()


const app = express()

const port = 5000

app.get('/', (req, res) => res.send('Hello world'))
app.listen(port, () => console.log(`Node Js server is running on Port ${port}!`))
