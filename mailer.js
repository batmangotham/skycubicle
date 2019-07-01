const nodemailer = require("nodemailer");
const account = require("./mg.json");

let transporter = nodemailer.createTransport({
    host: "smtp.mailgun.org",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: account.user,
        pass: account.pass
    }
});

function mailContact(data) {
    let mailOptions = {
        from: '"lavi" <support@lavi.com>', // sender address
        to: "laviindiainc@gmail.com", // list of receivers
        subject: `${data.name} contacted you`, // Subject line
        html: `
    <p>Do not reply to this email</p>
    <div style="font-weight:600">
  <table>
  <tr>
    <td>Name :</td>
    <td>${data.name}</td>
  </tr>
    <tr>
    <td>Email :</td>
    <td>${data.email}</td>
  </tr>
    <tr>
    <td>Phone :</td>
    <td>${data.phone}</td>
</table>
<p>${data.message}</p>
</div>
    `
    };
    sendMail(mailOptions);
}



function sendMail(mailOptions) {
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log("Message sent: %s", info.messageId);
    });
}

exports.mailContact = mailContact;