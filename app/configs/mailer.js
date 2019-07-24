const nodemailer = require("nodemailer");
const account = require("./mg.json");
const ejs = require("ejs");
const path = require("path");
let transporter = nodemailer.createTransport({
  service:"Gmail",
  // port: 587,
  // secure: false, // true for 465, false for other ports
  auth: {
    user: account.user,
    pass: account.pass
  }
});

async function mailContact(contact) {
  const dir = path.join(path.resolve(), "app", "views", "skycubicle.ejs");
  const template = ejs.renderFile(dir, { data : contact });
  ejs.renderFile(dir, { data : contact },(err,file) => {
    if (file) {
        // console.log(file);
      let mailOptions = {
        from: '"Skycubicle Team" <support@skycubicle.com>', // sender address
        to: contact.email, // list of receivers
        subject: `Skycubicle Early Access`, // Subject line
        html: file
      };
      sendMail(mailOptions);
    } else {
      console.log("Mail failed");
    }
  })

}

function sendMail(mailOptions) {
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) 
       console.log(error);
     else 
        console.log("Message sent: %s", info.messageId);
  });
}

exports.mailContact = mailContact;
