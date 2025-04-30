import dotenv from "dotenv";
import brevo from "@getbrevo/brevo";

dotenv.config();

// Initialize API instance
const apiInstance = new brevo.TransactionalEmailsApi();
apiInstance.authentications.apiKey.apiKey = process.env.BREVO_API_KEY;

const sendEmail = async (emailParams) => {
  try {
    const response = await apiInstance.sendTransacEmail(emailParams);
    return response;
  } catch (error) {
    console.error("❌ Error sending email:", error.response?.data || error.message);
    throw error;
  }
};

const sender = {
  name: "Prescripto",
  email: "hemheart1234@gmail.com",
};

export { sendEmail, sender };
