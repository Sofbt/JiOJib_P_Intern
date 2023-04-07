const express = require("express")
const app = express()
const mongoose = require("mongoose")
const router = express.Router()
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

app.use(express.json())
const cors = require("cors")
app.use(cors())
const bcrypt = require("bcryptjs")

const jwt = require("jsonwebtoken")

const JWT_SECRET = "ajz&ojozajojdoqjodijaoizjfofoqvnoqsniqosnd17187639217412984OZANOSNCOIU19287931U9DDZJ983J"

const mongoUrl = "mongodb+srv://Sofbt:dofy4mzVHYhdgE43@cluster0.d7u6cqi.mongodb.net/?retryWrites=true&w=majority"

mongoose
.connect(mongoUrl,{
    useNewUrlParser:true,
})
.then(()=>{
    console.log("Connected to database");
})
.catch((e)=>console.log(e))


require("./userDetails")
require("./Products")



const form = require('./form') 
app.use('/api/form', form)




const User = mongoose.model("UserInfo");
const Product =  mongoose.model("product")

app.post("/register", async (req, res) => {
  const { fname, lname, email, password, gender } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }
    await User.create({
      fname,
      lname,
      email,
      password: encryptedPassword,
      gender,
    });
    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while creating user" });
  }
});


app.post("/signup", async (req, res) => {
    const {fname, lname, email, password,gender} = req.body;
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		await new User({ ...req.body, password: hashPassword }).save();
		res.status(201).send({ message: "User created successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

app.post("/login-user", async(req,res)=>{
  const { email, password, ph } = req.body

  const user = await User.findOne({email})
  const admin = await User.findOne({email, isAdmin : true})
  const phoneUser = await User.findOne({ph})
  

  if (admin) {
      if(await bcrypt.compare(password, admin.password)){
          const token = jwt.sign({email: admin.email}, JWT_SECRET)
          if(res.status(201)){
              return res.json({status : "admin logged in", data:token})
          } else {
              return res.json({error : "error"})
          }
      }
  } else {
      if (!user && !phoneUser) {
          return res.json({error : "User Not Found"})
      }
      if (user && await bcrypt.compare(password, user.password)){
          const token = jwt.sign({email: user.email}, JWT_SECRET)
          console.log(user);

          if(res.status(201)){
              return res.json({status : "user logged in", data: token})
          } else {
              return res.json({error : "error"})
          }
      } else if (phoneUser && await bcrypt.compare(password, phoneUser.password)) {
          const token = jwt.sign({email: phoneUser.email}, JWT_SECRET)
          console.log(phoneUser);

          if(res.status(201)){
              return res.json({status : "user logged in", data: token})
          } else {
              return res.json({error : "error"})
          }
      }
  }
  res.json({status : "error",error: "Invalid Password"})
})


app.post("/userData", async (req, res) => {
    const { token } = req.body

    try {
        const user = jwt.verify(token, JWT_SECRET)
        const useremail = user.email
        User.findOne({email : useremail}).then((data) => {
            res.send({ status: "ok", data: data })
        }).catch((error) => {
            res.send({status: "error", data: error})
        })
    } catch (error) {
        
    }

})

app.post("/userProducts", async (req, res) => {
  const { token } = req.body

  try {
      const user = jwt.verify(token, JWT_SECRET)
      const usermail = user.email
      Product.find({email : usermail})
      .then((data) => {
          res.send({ status: "ok", data: data })
      }).catch((error) => {
          res.send({status: "error", data: error})
      })
  } catch (error) {
      
  }
})

const getproducts = require('./getProducts') 

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next()
})


app.use('/api/getproducts', getproducts)
app.use('/api/getproducts/valid', getproducts)

// app.use('/api/getproducts/update', getproducts)

app.use('/api/getproducts/update', getproducts)
app.use('/api/getproducts/update_notif', getproducts)



const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));





