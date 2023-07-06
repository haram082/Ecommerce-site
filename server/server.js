const express = require("express")
const app = express()
const cors = require("cors")
require("dotenv").config()
const port = process.env.PORT


app.use(cors())
const bodyParser = require("body-parser")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

//create a route for payment
app.post("/pay", async(req,res)=>{
    console.log(req.body)
    await stripe.charges.create({
        source: req.body.token.id,
        amount: req.body.amount,
        currency: "usd",
        })
        .then(data=>{
            res.send(data)
            })
            })




console.log("hello")
app.listen(port,()=>{
    console.log(`port${port}`)
})