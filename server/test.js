const express = require('express')
const mongoose = require("mongoose")
const router = express.Router()
const Product =  mongoose.model("product")


router.put("/update", async(req ,res) => {
    try {
        const confirmed = await Product.findByIdAndUpdate({_id: req.body._id}, { isConfirmed: true } )
        if (!confirmed) {
            return res.status(404).send('User not found')
        }
        res.send('Product confirmed')
    } catch (error) {
        console.log(error)
        return res.status(500).send('Error updating document')        
    }
    
})

router.put("/update_notif", async(req ,res) => {
    try {
        const confirmed = await Product.findByIdAndUpdate({_id: req.body._id}, { Notif: false } )
        if (!confirmed) {
            return res.status(404).send('User not found')
        }
        res.send('Notification removed')
    } catch (error) {
        console.log(error)
        return res.status(500).send('Error removing notification from document')        
    }
    
})