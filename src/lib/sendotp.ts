import nodemailer from "nodemailer";


export async function sendOtpEmail(email: string, otp: string) {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER, // your Gmail address
                pass: process.env.EMAIL_PASS, // app-specific password
            },
        });

        const mailOptions = {
            from: `"Path Catalyst Support" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Your OTP Code for Password Reset",
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee;">
                    <h2 style="color: #2c3e50;">Password Reset OTP</h2>
                    <p>Your One-Time Password (OTP) is:</p>
                    <h3 style="background: #f0f0f0; padding: 10px; display: inline-block; border-radius: 5px;">${otp}</h3>
                    <p>This OTP is valid for 10 minutes. Do not share it with anyone.</p>
                </div>
            `,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: " + info.response);
        return true;
    } catch (error) {
        console.error("Error sending OTP email:", error);
        return false;
    }
}
