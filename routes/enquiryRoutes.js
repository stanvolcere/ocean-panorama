const { sendEnquiryEmail } = require("../emails/account");
const { requireAuth } = require('../middleware/requireAuth');

module.exports = app => {
    app.post('/api/sendenquiry', requireAuth, (req, res) => {
        sendEnquiryEmail(req.body);
        res.status(200).send();
    });
};