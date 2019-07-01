const express = require("express");
const {
    mailContact
} = require("./mailer");
const Joi = require("joi");


const router = express.Router();




router.post("/",(req, res) => {
    const {
        error
    } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    mailContact(req.body); //mail
    res.send({
        status: true,
        data: req.body
    });
})

router.get("/", (req, res) => {
    res.send({
        data: "Api working",
        status: true
    })
})


function validate(contact) {
    const schema = {
        name: Joi.string().required(),
        phone: Joi.string().min(10).required(),
        email: Joi.string().required().email(),
        message: Joi.string().required()
    }
    return Joi.validate(contact, schema);
}



module.exports = router;