// Next.js API route support: https://nextjs.org/docs/api-routers/introduction
const mail = require("@sendgrid/mail");
const jwt = require("jsonwebtoken");

mail.setApiKey(process.env.SENDGRID_API_KEY);
console.log(process.env.SENDGRID_API_KEY);

const JWT_SECRET = process.env.JWT_SECRET;

export default (req, res) => {
  console.log(req.body);
  const email = req.body.email;
  const name = req.body.name;
  const secret = JWT_SECRET + req.body.email;
  const payload = {
    email: email,
  };
  const token = jwt.sign(payload, secret, { expiresIn: "15m" });
  const link = `${process.env.NEXT_API}/reset-password/${email}/${token}`;

  //change email to into your own email to test this functionality
  const data = {
    to: email,
    from: "vincentbesuyen@gmail.com",
    subject: "Lima: Reset your password!",
    template_id: process.env.PASSWORD_RESET_TEMPLATE_ID,
    dynamic_template_data: {
      name: name,
      email: email,
      link: link,
    },
  };

  mail
    .send(data)
    .then((response) => {
      console.log(response[0].statusCode);
    })
    .catch((error) => {
      console.error(error);
    });

  res.status(200).json({ status: "Ok" });
};
