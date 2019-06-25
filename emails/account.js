const sgmail = require('@sendgrid/mail');
const moment = require('moment');
const keys = require('../config/keys');

sgmail.setApiKey(keys.sendgridApiKey);

const sendBookingConfirmationEmail = ({ guestName, guestEmail, bookingTotalPrice, bookingStartDate, bookingEndDate, roomTitle}) => {

    const getHtml = () => {

        const displayStartDate = moment(bookingStartDate).format('LLL');
        const displayEndDate = moment(bookingEndDate).format('LLL');

        return `
            <html>
                <body>
                    <div style="text-align: center;">
                        <h3>Thank you for booking ${roomTitle}, ${guestName}!</h3>
                        <p>We look forward to seeing your group.</p>
                        <p>Check-In: ${displayStartDate}</p>
                        <p>Check-Out: ${displayEndDate}</p>
                        <h3>Total Price: £ ${bookingTotalPrice}</h3>
                    </div>
                </body>
            </html>
        `
    }

    sgmail.send({
        to: guestEmail,
        from: {
            name: "Ocean Panorama",
            email: "booking@oceanpanorama.com",
        },
        replyTo: "hellooceanpanorama@gmail.com",
        subject: "Your booking is confirmed!",
        html: getHtml()
    });

}

module.exports = { sendBookingConfirmationEmail }