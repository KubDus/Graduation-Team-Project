import nodemailer from 'nodemailer';

const sendEmail = function(user, body) {

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAILER_USERNAME,
            pass: process.env.MAILER_PASSWORD
        },
        tls: {
            rejectUnauthorized: false
        },
    });
    let mailOptions = {
        from: process.env.MAILER_USERNAME,
        to: user.email,
        subject: 'Registration confirmation',
        html: body
    };
    transporter.sendMail(mailOptions, function (error, success) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent successfully ');
        }
    });
};

export { sendEmail };