const Joi = require("joi");
const mongoose = require("mongoose");


contactSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
    minlength:10
  },
  email: {
    type: String,
    required: true,
  },
  stream: {
    type: String,
    required: true,
  },
})

const Contact = mongoose.model("Contact", contactSchema);


function validateContact(contact) {
  const schema = {
    fullname: Joi.string().required(),
    mobile: Joi.string().required(),
    email: Joi.string().required().email().min(10),
    stream: Joi.string().required()
  }
  return Joi.validate(contact, schema);
}


exports.Contact = Contact;
exports.validate = validateContact;