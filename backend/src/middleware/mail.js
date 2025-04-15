import { transporter } from '../lib/emailConfig.js';
import { Verification_Email_Template, Welcome_Email_Template } from '../lib/EmailTemplates.js';


export const WelcomeEmail = async function (email, name) {
    try {
      const mailOptions = {
        from: "Chatapp <tushar2471.be22@chitkara.edu.in>",
        to: email,
        subject: "Welcome to our website",
        text: "Welcome to our website",
        html: Welcome_Email_Template
          .replace("{name}", name)
          .replace("{link}", "http://localhost:5173/profile"),
      };
  
      const response = await transporter.sendMail(mailOptions);
      console.log("Welcome email sent successfully:", response.messageId);
    } catch (error) {
      console.log("Error sending welcome email:", error);
    }
  };



export const SendVerificationCode = async function (email, verificationCode) {
    try {
      const mailOptions = {
        from: "ChatApp <tushar2471.be22@chitkara.edu.in>", // Proper 'from'
        to: email,
        subject: "Verify your email",
        text: "Verify your email",
        html: Verification_Email_Template.replace("{verificationCode}", verificationCode),
      };
  
      const response = await transporter.sendMail(mailOptions);
      console.log("Email sent successfully:", response.messageId);
    } catch (error) {
      console.log("Error sending verification email:", error);
    }
  };