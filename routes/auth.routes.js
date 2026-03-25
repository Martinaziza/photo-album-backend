import express from "express"
const router = express.Router()
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.model.js"
import isAuthenticated from "../middleware/jwt.middleware.js"

router.post("/signup", async (req, res)=>{
    try {
    const {username, email, password} = req.body
    if (!username || !email || !password){
        return res.status(400).json({message: "Please provide all info"})
    }

    const foundUser = await User.findOne({ $or: [{email}, {username}]})
    if (foundUser) {
        return res.status(400).json({message: "Email or username already taken"} )
    }

    if (!password.match("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$",)){
return res.status(400).json({message: "Password needs at least 8 characters, and numbers"})
    }
    
    const salts = await bcrypt.genSalt(12)
    const hashedPassword = await bcrypt.hash(password, salts)
   
    const createdUser = await User.create({
        username, email, password: hashedPassword
    })


return res.status(201).json({message: "User created", createdUser})

    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}
)


router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body

    if (!username || !password) {
      return res.status(400).json({ message: "Please provide all info" })
    }

    const foundUser = await User.findOne({ username })
    if (!foundUser) {
      return res.status(400).json({ message: "You shall not pass" })
    }

    if (!bcrypt.compareSync(password, foundUser.password)) {
      return res.status(400).json({ message: "You shall not pass" })
    }

    const payload = {
      _id: foundUser._id,
      username: foundUser.username,
    }

    const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
      expiresIn: "6h",
      algorithm: "HS256",
    })

    return res.status(200).json({ message: "Successfuly logged in", authToken })
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
})

router.get("/verify", isAuthenticated, (req, res) => {
  console.log(req.payload)

  res.status(200).json({message: "verified backend", currentUser: req.payload._id})
})

router.get("/users", async (req, res)=>{
try {
  const user = await User.find()
  res.status(200).json(user)
} catch (error) {
  console.log(error)
}

})

router.get ("/users/:id", isAuthenticated, async (req, res)=>{
    
    try{
 
const user = await User.findById(req.params.id).select("-password");
res.status(200).json(user)

    }
    catch (error){
console.log(error)
res.status(500).json(error)
    }
   
})
export default router