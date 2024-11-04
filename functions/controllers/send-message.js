const twilio = require("twilio"); 

const accountSid = 'AC8070500bd0449e5d2e5ba666ad2cd132';
const authToken = 'ed03b1b8405c9a17ef87cc1c01304c86';
const client = twilio(accountSid, authToken);

const sendMessage = async (to, text) => {
  const message = await client.messages.create({
    body: text,
    from: "+18337726880",
    to: to,
  });

  console.log(message.body);
}

module.exports = sendMessage;