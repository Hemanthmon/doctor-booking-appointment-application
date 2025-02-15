import dotenv from 'dotenv';
import brevo from '@getbrevo/brevo';

dotenv.config();

const apiInstance = new brevo.TransactionalEmailsApi();

apiInstance.authentications.apiKey.apiKey = process.env.BREVO_API_KEY;




  const sender = {
    name :"Prescripto",
    email : "hemheart1234@gmail.com"
  }

  export { apiInstance as brevoClient, sender };

