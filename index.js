const express = require('express')
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')

dotenv.config({path:'./confit.env'})

app.use(cors({
    origin:'*', 
}));
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.get('/',(req,res)=>{
    res.cookie("cookienAME","cookie")
})
app.use(require('./Routings/auth'))
require('./DB/connection.js')

const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log("Listening to PORT")
})