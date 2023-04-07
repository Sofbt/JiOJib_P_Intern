const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");

const{ validate,Product } = require("./Products");



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname);
  },
  filename: function (req, file, cb) {
    const timestamp = new Date().toISOString().replace(/:/g, '-').replace(/\./g, '-');
    cb(null, timestamp + '-' + file.originalname);
  }
});

// Define file filter function
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG and PNG files are allowed.'), false);
  }
};

// Set up multer middleware
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5 // limit file size to 5MB
  },
  fileFilter: fileFilter
});
router.post("/", upload.single('photo'), async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { location, productName, description } = req.body;

    const newProduct = new Product({
      location,
      productName,
      description,
      photo: req.file.path,
    });

    await newProduct.save();
    
    res.status(201).json({
      message: 'Product created successfully',
      data: newProduct
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Failed to create product'
    });
  }
});






router.get('/', (req, res) => {
  Product.find()
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        products: docs.map(doc => {
          return {
            location: doc.location,
            productName: doc.productName,
            description: doc.description,
            photo: doc.photo,
            _id: doc._id
          };
        })
      };
      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});



module.exports = router;