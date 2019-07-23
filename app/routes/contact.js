const express = require('express');
const {
  Contact,
  validate
} = require("../models/contact");

const {
  mailContact
} = require("../configs/mailer");

const router = express.Router();


router.post("/", async (req, res) => {
    const {
      error
    } = validate(req.body);
  
    if (error) return res.status(400).send(error.details[0].message);    
    let contact = new Contact(req.body)
    contact = await contact.save();
    res.send({
      status: true,
      data: contact
    });
    mailContact(contact);  
  })


router.get("/",async (req,res) => {
  const pageNum = req.query.pageNum;
  const pageSize = req.query.pageSize;
  const contacts =  Contact.find().skip((pageNum - 1) * pageSize).limit(+pageSize).sort("-_id");
  const count =  Contact.count();
  const result = await Promise.all([contacts,count]);
  const items = result[0].map(user => 
     {
      return `  <tr>
    <td>${user.fullname}</td>
    <td>${user.email}</td>
    <td>${user.mobile}</td>
    <td>${user.stream}</td>
    </tr>`
    }
    ).join("")
  const table = `<table style="width: 100%;">
  <tr style="text-align: left">
      <th>Full name</th>
      <th>Email</th>
      <th>Mobile</th>
      <th>Stream</th>
      ${items}
  </tr>
</table>`

// const template = path.join(path.resolve(),'app','views','index')
// console.log(template);
  res.send(table);
  // data = { fullname: 'Hey', message: 'Hello there!'}
  // res.render('skycubicle',data);

})



  module.exports = router;