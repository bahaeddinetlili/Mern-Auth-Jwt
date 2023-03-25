const express = require('express')
const connectDB = require('./config/mongodbConnection')
const colors = require('colors')
const cors = require('cors');
require('dotenv').config()
connectDB()


const app = express()
app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(express.json())
const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')



app.use('/api/auth/', authRoute)
app.use('/api/user', userRoute)

app.get('/', (req, res) => res.send('Hello world'))
const port = 5000
app.listen(port, () => console.log(`Node Js server is running on Port ${port}!`))
