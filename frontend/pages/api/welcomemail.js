// Next.js API route support: https://nextjs.org/docs/api-routers/introduction
const mail = require("@sendgrid/mail");

mail.setApiKey(process.env.SENDGRID_API_KEY);

// for testing purposes the field data.to can be set to your personal email.

export default (req, res) => {
  console.log(req.body);
  const data = {
    to: req.body.email,
    from: "vincentbesuyen@gmail.com",
    subject: "Welcome to the Lima Dashboard",
    template_id: process.env.WELCOME_TEMPLATE_ID,
    dynamic_template_data: {
      name: req.body.name,
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
