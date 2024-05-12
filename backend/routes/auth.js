const express = require('express');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

const JWT_SECRET = 'Ayushisagood$oy'


//creating a new user using POST "/api/auth/createuser"
router.post('/createuser', [
    body('name', 'thoda bada likh na badhwe hathon mei mehndi lagi hai kya ?').isLength({ min: 3 }),
    body('email', 'chutiya mat bana asli email de').isEmail(),
    body('password', 'phir backchodi de raha hai').isLength({ min: 5 })
],
    async (req, res) => {
        //check if the any of the validation fails and will return the error according to those validation fails
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            //checks whether user already exists or not
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ error: "user already exists" });
            }

            //Using bcryptjs
            const salt = await bcrypt.genSalt(10);
            const secPass = bcrypt.hashSync(req.body.password, salt);

            //create a new user
            user = await User.create({
                name: req.body.name,
                password: secPass,
                email: req.body.email,
            });
            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET);
            res.json(authToken)
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error")
        }
    })


// Authenticate a user using : POST "/api/auth/login"
router.post('/login', [
    body('email', 'naa badhwae koi account nahi hai tera account bana').isEmail(),
    body('password', 'phir backchodi de raha hai').exists(),
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        try{
            let user = await User.findOne({email});
            if(!user){
                return res.status(400).json({error: "wrong credentials"})
            }
            const passwordCompare = await bcrypt.compare(password, user.password);
            if(!passwordCompare){
                return res.status(400).json({error: "wrong credentials"})
            }
            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET);
            res.send("Logged In successfully!!")
        }
        catch(error){
            console.error(error.message);
            res.status(500).send("Internal Server Error")
        }

        
    })

module.exports = router