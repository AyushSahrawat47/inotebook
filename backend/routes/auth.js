const express = require('express');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const router = express.Router();


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
            user = await User.create({
                name: req.body.name,
                password: req.body.password,
                email: req.body.email,
            })
            res.json(user)
        } catch{
            console.log(error.message);
            res.status(500).send("Internal Server Error")   
        }
    })

module.exports = router