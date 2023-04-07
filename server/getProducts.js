const express = require('express');
const mongoose = require("mongoose");

const router = express.Router();

const app = express();
const Product = mongoose.model("product");
const User = mongoose.model("UserInfo","product");


app.use(express.json());

router.get("/", async(req, res) => {
    try {
        const products = await Product.find({ isConfirmed : false })
        return res.json(products)
    } catch (error) {
        return res.status(400).json({message : error})
    }

}) 

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

router.post("api/update_notif", async(req ,res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
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
    
});

router.post("/api/phonesignup", async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    try {
      const phonesignup = new User({
        fname: req.body.fname,
        lname: req.body.lname,
        password: req.body.password,
        ph: req.body.ph,
      });
  
      await phonesignup.save();
      res.status(200).json({ message: "Phone number saved successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

router.put("/updatesuiv", async(req ,res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    try {
        const confirmed = await Product.findByIdAndUpdate({ _id: req.body._id }, { Delivred : true } )
        if (!confirmed) {
            return res.status(404).send('User not found')
        }

        res.send('Product confirmed')
    } catch (error) {
        console.log(error)
        return res.status(500).send('Error updating document')
    }
});

module.exports = router;
