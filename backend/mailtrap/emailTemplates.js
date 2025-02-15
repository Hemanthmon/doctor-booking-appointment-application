export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
  <style>
    body {
      font-family: 'Roboto', Arial, sans-serif;
      line-height: 1.8;
      color: #333;
      margin: 0;
      padding: 0;
      background-color: #f4f4f9;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    .header {
      background: linear-gradient(to right, #6a11cb, #2575fc);
      padding: 30px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
      color: #fff;
      font-weight: bold;
    }
    .content {
      padding: 25px;
      text-align: center;
    }
    .content p {
      margin: 15px 0;
      font-size: 16px;
      color: #555;
    }
    .verification-code {
      display: inline-block;
      margin: 30px 0;
      font-size: 36px;
      font-weight: bold;
      letter-spacing: 6px;
      color: #6a11cb;
      padding: 15px 25px;
      border: 2px dashed #6a11cb;
      border-radius: 5px;
      background-color: #f9f9f9;
    }
    .footer {
      padding: 20px;
      text-align: center;
      font-size: 12px;
      color: #aaa;
      background: #f4f4f9;
      border-top: 1px solid #ddd;
    }
    .footer p {
      margin: 5px 0;
    }
    .footer .social-links {
      margin-top: 10px;
    }
    .footer .social-links a {
      margin: 0 8px;
      color: #6a11cb;
      text-decoration: none;
      font-size: 18px;
    }
    .footer .social-links a:hover {
      color: #2575fc;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Verify Your Email</h1>
    </div>
    <div class="content">
      <p>Hello,</p>
      <p>Thank you for signing up! Your verification code is:</p>
      <div class="verification-code">{verificationCode}</div>
      <p>Please enter this code on the verification page to complete your registration.</p>
      <p>This code will expire in 15 minutes for security reasons.</p>
      <p>If you didn’t create an account with us, you can safely ignore this email.</p>
    </div>
    <div class="footer">
      <p>This is an automated message. Please do not reply.</p>
      <p>Need help? Contact us at <a href="mailto:support@example.com">support@example.com</a></p>
      <div class="social-links">
        <a href="https://facebook.com/example" target="_blank">Facebook</a> |
        <a href="https://twitter.com/example" target="_blank">Twitter</a> |
        <a href="https://instagram.com/example" target="_blank">Instagram</a>
      </div>
    </div>
  </div>
</body>
</html>

`;

export const WELCOME_MAIL_TEMPLATE = (name) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Prescripto</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f9f9f9;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
            background-color: #2d89ef;
            color: #ffffff;
            text-align: center;
            padding: 20px;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
        }
        .content {
            padding: 20px;
        }
        .content h2 {
            color: #2d89ef;
            margin-bottom: 10px;
        }
        .content p {
            line-height: 1.6;
            margin: 10px 0;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #2d89ef;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
            margin: 20px 0;
        }
        .features {
            margin: 20px 0;
            padding: 15px;
            background-color: #f4f4f4;
            border-left: 4px solid #2d89ef;
            border-radius: 4px;
        }
        .features h3 {
            margin: 0 0 10px;
        }
        .features ul {
            padding-left: 20px;
            margin: 0;
        }
        .features ul li {
            margin: 5px 0;
        }
        .footer {
            background-color: #333;
            color: #ffffff;
            text-align: center;
            padding: 10px;
            font-size: 14px;
        }
        .footer a {
            color: #2d89ef;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Welcome to Prescripto!</h1>
        </div>
        <div class="content">
            <h2>Hi ${name},</h2>
            <p>We’re thrilled to have you join the Prescripto community! At Prescripto, we make it simple and hassle-free to book appointments with the best doctors near you, tailored to your healthcare needs.</p>
            <div class="features">
                <h3>What you can do with Prescripto:</h3>
                <ul>
                    <li>Search for top-rated doctors in your area.</li>
                    <li>Book appointments online in just a few clicks.</li>
                    <li>Access personalized healthcare recommendations.</li>
                </ul>
            </div>
            <p>Ready to get started? Click below to explore Prescripto and book your first appointment.</p>
            <a href="[Website Link]" class="button">Discover Prescripto</a>
        </div>
        <div class="footer">
            <p>Need assistance? Contact us anytime at <a href="mailto:support@prescripto.com">support@prescripto.com</a>.</p>
            <p>Thank you for choosing Prescripto. Your health, simplified.</p>
            <p><a href="[Website Link]">Visit Our Website</a> | Call us: [Contact Number]</p>
        </div>
    </div>
</body>
</html>
`;

export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Successful</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Password Reset Successful</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>We're writing to confirm that your password has been successfully reset.</p>
    <div style="text-align: center; margin: 30px 0;">
      <div style="background-color: #4CAF50; color: white; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; display: inline-block; font-size: 30px;">
        ✓
      </div>
    </div>
    <p>If you did not initiate this password reset, please contact our support team immediately.</p>
    <p>For security reasons, we recommend that you:</p>
    <ul>
      <li>Use a strong, unique password</li>
      <li>Enable two-factor authentication if available</li>
      <li>Avoid using the same password across multiple sites</li>
    </ul>
    <p>Thank you for helping us keep your account secure.</p>
    <p>Best regards,<br>Your App Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Password Reset</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>We received a request to reset your password. If you didn't make this request, please ignore this email.</p>
    <p>To reset your password, click the button below:</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="{resetURL}" style="background-color: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
    </div>
    <p>This link will expire in 1 hour for security reasons.</p>
    <p>Best regards,<br>Your App Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;
export const APPOINTMENT_CONFIRMATION_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Appointment Confirmation</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Appointment Confirmed</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello {userName},</p>
    <p>Your appointment with Dr. {docName} is confirmed. Here are the details:</p>
    <ul>
      <li><strong>Date:</strong> {slotDate}</li>
      <li><strong>Time:</strong> {slotTime}</li>
      <li><strong>Doctor:</strong> {docName}</li>
      <li><strong>Consultation Fee:</strong> ₹{amount}</li>
    </ul>
    <p><strong>Instructions for Your Appointment:</strong></p>
    <ul>
      <li>Please arrive 15 minutes early to complete any necessary paperwork.</li>
      <li>Carry a valid photo ID and any previous medical records.</li>
      <li>If you have any symptoms or questions, note them down to discuss with the doctor.</li>
      <li>Wear a mask and follow COVID-19 guidelines, if applicable.</li>
    </ul>
    <p>We look forward to seeing you!</p>
    <p>Best regards,<br>Your App Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;


