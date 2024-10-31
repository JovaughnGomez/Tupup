import nodemailer from 'nodemailer'


const transporter = nodemailer.createTransport({
    host: 'smtp.resend.com',
    secure: false,
    port: 587,
    auth: {
        user: 'resend',
        pass: process.env.RESEND_API_KEY,
    }
});

function CreateMainOptions(from, to, subject, html)
{
    return {
        from,
        to,
        subject,
        html,
    }
}

export async function SendEmailVerificationLink(email, link)
{
    const fromEmail = "GameHavenTT <noreply@gamehaventt.com>";
    const subject = "Verify Your Email Address"
    const text = `Thanks for registering for an account on Game Haven! Before we get started, <br>
    we just need to confirm that this is you. Click the link below to verify your email address. <br /> ${link}`

    const mailOptions = CreateMainOptions(fromEmail, email, subject, text);
    const results = await transporter.sendMail(mailOptions);
    if(results.accepted.length > 0)
        return { success: results.accepted.length > 0 };
}

export async function SendPasswordResetLink(toEmail, link)
{
    const fromEmail = "GameHavenTT <noreply@gamehaventt.com>";
    const subject = "Account Password Reset"
    const text = `We've received a password change request for your Game Haven account. <br>
    This link will expire in 1 hour. If you did not request a password change, please ignore this email, no changes will be made to your account. <br>
    Another user may have entered your email by mistake. <br> ${link}`

    const mailOptions = CreateMainOptions(fromEmail, toEmail, subject, text);
    const results = await transporter.sendMail(mailOptions);
    if(results.accepted.length > 0)
        return { success: results.accepted.length > 0 };
}