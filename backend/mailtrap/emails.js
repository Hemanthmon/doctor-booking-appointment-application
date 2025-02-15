import { brevoClient, sender } from './mailtrapConfig.js';
import {
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_MAIL_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  APPOINTMENT_CONFIRMATION_TEMPLATE
} from './emailTemplates.js'; // Import email templates

/// Send Verification Email
export const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }];
  try {
    const response = await brevoClient.sendTransacEmail({
      sender,
      to: recipient,
      subject: "Verify Your Email",
      htmlContent: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
      textContent: `Your verification code is: ${verificationToken}`, // Fallback
      category: ["Email Verification"],
    });
    console.log("Email sent successfully", response);
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw new Error(`Error in sending verification email: ${error.message}`);
  }
};

/// Send Welcome Email
export const sendWelcomeEmail = async (email, name) => {
  const recipient = [{ email }];
  try {
    const response = await brevoClient.sendTransacEmail({
      sender,
      to: recipient,
      subject: "Welcome to Prescripto",
      htmlContent: WELCOME_MAIL_TEMPLATE(name),
      textContent: `Welcome, ${name}!`, // Fallback
    });
    console.log("Welcome email sent successfully", response);
  } catch (error) {
    console.error("Error sending welcome email:", error);
    throw new Error(`Error in sending welcome email: ${error.message}`);
  }
};

/// Send Password Reset Email
export const sendPasswordResetEmail = async (email, resetURL) => {
  const recipient = [{ email }];
  try {
    const response = await brevoClient.sendTransacEmail({
      sender,
      to: recipient,
      subject: "Reset Your Password",
      htmlContent: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
      textContent: `Click the link to reset your password: ${resetURL}`, // Fallback
      category: ["Password Reset"],
    });
    console.log("Password reset email sent successfully", response);
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw new Error(`Error in sending password reset email: ${error.message}`);
  }
};

/// Send Password Reset Success Email
export const sendResetSuccessEmail = async (email) => {
  const recipient = [{ email }];
  try {
    const response = await brevoClient.sendTransacEmail({
      sender,
      to: recipient,
      subject: "Password Reset Successful",
      htmlContent: PASSWORD_RESET_SUCCESS_TEMPLATE,
      textContent: "Your password has been successfully reset.", // Fallback
      category: ["Password Reset"],
    });
    console.log("Password reset success email sent successfully", response);
  } catch (error) {
    console.error("Error sending password reset success email:", error);
    throw new Error(`Error sending password reset success email: ${error.message}`);
  }
};

/// Send Appointment Confirmation Email
export const sendAppointmentConfirmationEmail = async (email, userName, docName, slotDate, slotTime, amount) => {
  const recipient = [{ email }];
  try {
    const htmlContent = APPOINTMENT_CONFIRMATION_TEMPLATE
      .replace("{userName}", userName)
      .replace("{docName}", docName)
      .replace("{slotDate}", slotDate)
      .replace("{slotTime}", slotTime)
      .replace("{amount}", amount);

    const textContent = `Hello ${userName}, your appointment with Dr. ${docName} is confirmed for ${slotDate} at ${slotTime}. Amount: ${amount}`;

    const response = await brevoClient.sendTransacEmail({
      sender,
      to: recipient,
      subject: "Your Appointment is Confirmed",
      htmlContent,
      textContent, // Fallback for non-HTML clients
    });
    console.log("Appointment confirmation email sent successfully:", response);
  } catch (error) {
    console.error("Error sending appointment confirmation email:", error);
    throw new Error(`Error sending appointment confirmation email: ${error.message}`);
  }
};
