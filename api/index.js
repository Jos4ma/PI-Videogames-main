const express = require('express')
const Stripe = require('stripe')
const cors = require('cors')

const app = express()

const stripe = new Stripe("sk_test_51LUuaPGOqvRgizQ9MjapMBUmqYBnQzTuvRRkhH2vRh65om1regbCAn9dsvOIG61xxa9kbA8hnNk2NqozaQ91W1mA00ieJAWgCf")


app.use(cors({origin: `http://localhost:3000`}))
app.use(express.json())

app.post('/api/checkout',  async (req,res) => {
    const {id, amount} = req.body
    const payment = await stripe.paymentIntents.create({
        amount,
        currency: "USD",
        description: "Saxophone",
        payment_method: id,
        confirm: true,
    })
    console.log(payment)
    res.send({message:'Successfull payment'})
})

app.listen(3001, ()=>{
    console.log('Server on port 3001')
})