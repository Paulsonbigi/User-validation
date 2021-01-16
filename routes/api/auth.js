const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const config = require("config")
const jwt = require("jsonwebtoken")
const auth =require("../../middleware/auth")

// Item model
const User = require("../../model/user")

// @route GET api/auth
// desc Login user for existing user by athentication
// @access Private
router.post("/", (req, res) => {
    const { email, password } = req.body

    //simple validation
    if(!email ||!password) return res.status(400).json({msg: "Please enter all fields"})

    //check if user exists
    User.findOne({ email })
        .then(user => {
            if(!user) return res.status(400).json({msg: "User does not exists"})
            
            // validating password
            bcrypt.compare(password, user.password)
                .then(isMatch =>{
                    if(!isMatch) return res.status(400).json({ msg: "Invalid password"})

                    jwt.sign(
                        { id: user.id },
                        config.get("jwtSecret"),
                        { expiresIn: 3600 }, 
                        (err, token) => {
                            if(err) throw err;

                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email
                                }
                            })
                        }
                    )
                }) 

           
        })
})


// @route GET api/auth/user
// desc get user data
// @access Private
router.get("/user", auth, (req, res) => {
    User.findById(req.user.id)
        // so not to return password
        .select('-password')
        .then(user => res.json(user))
})

module.exports = router