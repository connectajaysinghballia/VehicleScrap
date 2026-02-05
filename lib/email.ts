import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendB2BApprovalEmail(
  to: string,
  businessName: string,
  userId: string,
  password: string
) {
  const subject = 'Welcome to AutoScrap - Your B2B Partner Account Details';
  const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
            <div style="text-align: center; margin-bottom: 20px;">
                <h1 style="color: #ea580c;">AutoScrap Partner Program</h1>
            </div>
            
            <p>Dear <strong>${businessName}</strong>,</p>
            
            <p>Congratulations! Your request to become a B2B Partner with AutoScrap has been approved.</p>
            
            <p>You can now access your partner dashboard using the credentials below:</p>
            
            <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 5px 0;"><strong>User ID:</strong> ${userId}</p>
                <p style="margin: 5px 0;"><strong>Password:</strong> ${password}</p>
            </div>
            
            <p>Please log in at <a href="http://localhost:3000/login" style="color: #ea580c;">AutoScrap Partner Login</a>.</p>
            
            <p>We recommend changing your password after your first login.</p>
            
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
            
            <p style="font-size: 12px; color: #888; text-align: center;">
                This is an automated email. Please do not reply directly to this message.
            </p>
        </div>
    `;

  try {
    const info = await transporter.sendMail({
      from: `"AutoScrap Admin" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });
    console.log('Email sent: %s', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}
