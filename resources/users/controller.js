const User = require("./model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
// Create a new user

exports.Register = async (req, res,next) => {
  try {
    const { name ,email, password } = req.body

    // Check if user already exists
    const userExists = await User.findOne({ email })
    if (userExists) {
      return res.status(400).json({ message: "User already exists" })
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create a new user
    //const user = new User({ name, email, password: hashedPassword })
   // await user.save()
    const user = await User.create({
        name, 
        email,
        password: hashedPassword,
    });

    // Generate and send JWT
   
    res.json({ user })
  } catch (error) {
    res.status(500).json({ message: "Server error" })
    next(error)
  }
}

// Login a user

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    // Check if user exists
    const user = await User.findOne({ email }).select("+password")
    if (!user) {
      return res.status(400).json({ message: "User not found" })
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" })
    }

    // Generate and send JWT

    
    // expiresIn is in seconds
    const expiresIn = 3600 // 1 hour
    res.json({
      user,
      token: jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn }),
    })

    // const token = jwt.sign({user},process.env.JWT_SECRET)
    // res.json({ user, token })
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
}