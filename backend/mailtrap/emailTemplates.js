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
     
    </div>
  </div>
</body>
</html>

`;

// export const WELCOME_MAIL_TEMPLATE = (name) => `<!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Welcome to Prescripto</title>
//     <style>
//         body {
//             font-family: 'Arial', sans-serif;
//             margin: 0;
//             padding: 0;
//             background-color: #f9f9f9;
//             color: #333;
//         }
//         .container {
//             max-width: 600px;
//             margin: 20px auto;
//             background: #ffffff;
//             border-radius: 8px;
//             box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//             overflow: hidden;
//         }
//         .header {
//             background-color: #2d89ef;
//             color: #ffffff;
//             text-align: center;
//             padding: 20px;
//         }
//         .header h1 {
//             margin: 0;
//             font-size: 28px;
//         }
//         .content {
//             padding: 20px;
//         }
//         .content h2 {
//             color: #2d89ef;
//             margin-bottom: 10px;
//         }
//         .content p {
//             line-height: 1.6;
//             margin: 10px 0;
//         }
//         .button {
//             display: inline-block;
//             padding: 10px 20px;
//             background-color: #2d89ef;
//             color: #ffffff;
//             text-decoration: none;
//             border-radius: 5px;
//             font-size: 16px;
//             margin: 20px 0;
//         }
//         .features {
//             margin: 20px 0;
//             padding: 15px;
//             background-color: #f4f4f4;
//             border-left: 4px solid #2d89ef;
//             border-radius: 4px;
//         }
//         .features h3 {
//             margin: 0 0 10px;
//         }
//         .features ul {
//             padding-left: 20px;
//             margin: 0;
//         }
//         .features ul li {
//             margin: 5px 0;
//         }
//         .footer {
//             background-color: #333;
//             color: #ffffff;
//             text-align: center;
//             padding: 10px;
//             font-size: 14px;
//         }
//         .footer a {
//             color: #2d89ef;
//             text-decoration: none;
//         }
//     </style>
// </head>
// <body>
//     <div class="container">
//         <div class="header">
//             <h1>Welcome to Prescripto!</h1>
//         </div>
//         <div class="content">
//             <h2>Hi ${name},</h2>
//             <p>We’re thrilled to have you join the Prescripto community! At Prescripto, we make it simple and hassle-free to book appointments with the best doctors near you, tailored to your healthcare needs.</p>
//             <div class="features">
//                 <h3>What you can do with Prescripto:</h3>
//                 <ul>
//                     <li>Search for top-rated doctors in your area.</li>
//                     <li>Book appointments online in just a few clicks.</li>
//                     <li>Access personalized healthcare recommendations.</li>
//                 </ul>
//             </div>
//             <p>Ready to get started? Click below to explore Prescripto and book your first appointment.</p>
//             <a href="[Website Link]" class="button">Discover Prescripto</a>
//         </div>
//         <div class="footer">
//             <p>Need assistance? Contact us anytime at <a href="mailto:support@prescripto.com">support@prescripto.com</a>.</p>
//             <p>Thank you for choosing Prescripto. Your health, simplified.</p>
  
//         </div>
//     </div>
// </body>
// </html>
// `;
export const WELCOME_MAIL_TEMPLATE = (name) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Prescripto</title>
    <style>
        body {
            font-family: 'Inter', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f7fc;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            border-radius: 12px;
            box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            padding: 20px;
            text-align: center;
        }
        .header {
            padding: 20px;
            background: linear-gradient(135deg, #6C63FF, #4B0082);
            color: #ffffff;
            border-top-left-radius: 12px;
            border-top-right-radius: 12px;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .content {
            padding: 15px;
            font-size: 16px;
            line-height: 1.6;
            text-align: center;
        }
        .about {
            background: #eef2ff;
            padding: 15px;
            border-radius: 8px;
            margin-top: 15px;
            text-align: left;
            border-left: 4px solid #6C63FF;
        }
        .about h3 {
            color: #6C63FF;
            margin-bottom: 10px;
            font-size: 18px;
        }
        .about p {
            font-size: 14px;
            margin: 5px 0;
        }
        .button-container {
            margin-top: 20px;
        }
        .button {
            display: inline-block;
            padding: 12px 20px;
            background-color: #6C63FF;
            color: #ffffff;
            text-decoration: none;
            border-radius: 8px;
            font-size: 14px;
            font-weight: bold;
            transition: background 0.3s ease-in-out;
            margin: 5px;
        }
        .button:hover {
            background-color: #574b90;
        }
        .footer {
            text-align: center;
            padding: 10px;
            font-size: 12px;
            color: #6C63FF;
            margin-top: 15px;
        }
        .footer a {
            color: #6C63FF;
            text-decoration: none;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Welcome to Prescripto!</h1>
        </div>
        <div class="content">
            <p>Hi ${name},</p>
            <p>We’re excited to welcome you to <strong>Prescripto Healthcare</strong>, your digital healthcare companion designed to simplify your medical journey.</p>
            <div class="about">
                <h3>About Prescripto</h3>
                <p>Prescripto is a smart healthcare platform that helps you connect with top doctors, book appointments, and stay informed about important health updates—all in one place.</p>
                <h3>Key Benefits</h3>
                <p>✔ Easily search and filter doctors by specialty.</p>
                <p>✔ Book appointments with a seamless experience.</p>
                <p>✔ Receive real-time health alerts and tips.</p>
                <p>✔ Enjoy a secure and user-friendly platform.</p>
            </div>
            <p>Start managing your healthcare today. Log in now to book your next appointment.</p>
            <div class="button-container">
                <a href="https://doctor-booking-appointment-application.vercel.app/login" class="button">Login</a>
                <a href="https://doctor-booking-appointment-application.vercel.app/doctors" class="button">Explore Doctors</a>
            </div>
        </div>
        <div class="footer">
            <p>Need help? Contact us at <a href="mailto:support@prescripto.com">support@prescripto.com</a></p>
            <p><em>"Revolutionizing healthcare, one appointment at a time."</em></p>
        </div>
    </div>
</body>
</html>
`;


export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Password Reset Successful</title>
</head>
<body style="font-family: 'Segoe UI', sans-serif; background-color: #f4f3fc; color: #333; margin: 0; padding: 0;">
  <div style="max-width: 600px; margin: 40px auto; background-color: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
    <div style="background: linear-gradient(to right, #7b2cbf, #9d4edd); padding: 20px; text-align: center;">
      <h1 style="color: #fff; margin: 0;">Prescripto</h1>
    </div>
    <div style="padding: 30px;">
      <h2 style="color: #6A0DAD;">Password Reset Successful</h2>
      <p>Hello,</p>
      <p>We’re confirming that your password has been successfully reset.</p>
      <div style="text-align: center; margin: 30px 0;">
        <div style="background-color: #7b2cbf; color: white; width: 60px; height: 60px; line-height: 60px; border-radius: 50%; display: inline-block; font-size: 30px;">
          ✓
        </div>
      </div>
      <p>If you did not perform this action, please contact our support team immediately.</p>
      <p>Your account security is important to us. If you notice any suspicious activity, don't hesitate to reach out.</p>
      <p>Need help? Email us at <a href="mailto:hemmon963@gmail.com" style="color: #6A0DAD;">hemmon963@gmail.com</a>.</p>
      <p>Thank you for using Prescripto.</p>
      <p>Best regards,<br/>Team Prescripto</p>
    </div>
    <div style="background-color: #f0eaff; text-align: center; padding: 10px; font-size: 12px; color: #888;">
      <p>This is an automated message. Please do not reply to this email.</p>
    </div>
  </div>
</body>
</html>
`;



export const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Reset Your Password</title>
</head>
<body style="font-family: 'Segoe UI', sans-serif; background-color: #f4f3fc; color: #333; margin: 0; padding: 0;">
  <div style="max-width: 600px; margin: 40px auto; background-color: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
    <div style="background: linear-gradient(to right, #7b2cbf, #9d4edd); padding: 20px; text-align: center;">
      <h1 style="color: #fff; margin: 0;">Prescripto</h1>
    </div>
    <div style="padding: 30px;">
      <h2 style="color: #6A0DAD;">Reset Your Password</h2>
      <p>Hello,</p>
      <p>We received a request to reset your password. If you didn't make this request, you can safely ignore this email.</p>
      <p>Click the button below to reset your password:</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="{resetURL}" style="background-color: #7b2cbf; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Reset Password</a>
      </div>
      <p>This link will expire in 1 hour for security reasons.</p>
      <p>If you have any questions, reach out to us at <a href="mailto:hemmon963@gmail.com" style="color: #6A0DAD;">hemmon963@gmail.com</a>.</p>
      <p>Best regards,<br/>Team Prescripto</p>
    </div>
    <div style="background-color: #f0eaff; text-align: center; padding: 10px; font-size: 12px; color: #888;">
      <p>This is an automated message. Please do not reply to this email.</p>
    </div>
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
  <style>
    body {
      margin: 40px;
      padding: 20px;
      font-family: 'Georgia', serif;
      color: black;
      background: #faf5ff;
    }
    .container {
      max-width: 600px;
      margin: auto;
      padding: 30px;
      border: 2px solid #4a148c;
      box-shadow: 2px 2px 10px rgba(106, 27, 154, 0.2);
      background: #fff;
      border-radius: 8px;
    }
    .letterhead {
      text-align: left;
      margin-bottom: 30px;
      color: black;
    }
    .letterhead p {
      margin: 5px 0;
      font-size: 14px;
    }
    .content {
      text-align: left;
      font-size: 16px;
      line-height: 1.6;
    }
    .details {
      margin-top: 20px;
      padding: 15px;
      border-left: 4px solid #4a148c;
      border-radius: 5px;
    }
    .details p {
      font-size: 18px;
      font-weight: bold;
      color: black;
      margin: 8px 0;
    }
    .quote {
      margin-top: 30px;
      font-size: 16px;
      font-style: italic;
      text-align: center;
      color: #4a148c;
      font-weight: bold;
    }
    .footer {
      margin-top: 30px;
      font-size: 16px;
      font-weight: bold;
      text-align: left;
      padding-top: 15px;
      color: black;
    }
    .signature {
      margin-top: 40px;
      font-size: 16px;
      color: black;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="letterhead">
      <p><strong>Prescripto Healthcare</strong></p>
      <p>Bangalore, India</p>
      <p>Email: hemmon963@gmail.com | Phone: +91 99803 50455</p>
    </div>
    <div class="content">
      <p>Dear <strong>{userName}</strong>,</p>
      <p>We are pleased to confirm your appointment with Dr. <strong>{docName}</strong>. Below are the appointment details:</p>
      <div class="details">
        <p><strong>Date:</strong> {slotDate}</p>
        <p><strong>Time:</strong> {slotTime}</p>
        <p><strong>Consultation Fee:</strong> ₹{amount}</p>
      </div>
      <p>Kindly ensure you:</p>
      <ul>
        <li>Arrive 15 minutes early to complete any necessary paperwork.</li>
        <li>Carry a valid photo ID and relevant medical records.</li>
        <li>Prepare any symptoms or queries in advance to discuss with the doctor.</li>
      </ul>
      <p>For any rescheduling or inquiries, feel free to contact us.</p>
    </div>
    <div class="quote">"The body achieves what the mind believes. – Unknown"</div>
    <div class="footer">Best regards,<br>Prescripto Team</div>
    <div class="signature">Authorized Signatory<br>Prescripto Healthcare</div>
  </div>
</body>
</html>
`;







export const WELCOME_DOCTOR_TEMPLATE = (name, email, password) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Priscripto</title>
    <style>
        body {
            font-family: 'Georgia', serif;
            background-color: #f8f8f8;
            color: #2c2c2c;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 50px auto;
            background: #ffffff;
            border-radius: 8px;
            padding: 40px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            border: 1px solid #ddd;
            text-align: center;
        }
        .header {
            text-align: left;
            font-size: 18px;
            color: #555;
        }
        .logo {
            display: block;
            margin: 0 auto 20px;
            max-width: 120px;
        }
        h1 {
            font-size: 28px;
            font-weight: bold;
            color: #333;
        }
        p {
            font-size: 16px;
            line-height: 1.8;
            color: #444;
            text-align: justify;
        }
        .credentials {
            margin-top: 20px;
            font-size: 16px;
            text-align: left;
        }
        .credentials strong {
            color: #333;
        }
        .login-link {
            display: inline-block;
            margin-top: 10px;
            padding: 10px 20px;
            background: #0077b6;
            color: #ffffff;
            text-decoration: none;
            font-size: 16px;
            border-radius: 6px;
        }
        .signature {
            margin-top: 30px;
            font-size: 16px;
            font-style: italic;
            text-align: left;
        }
        .footer {
            margin-top: 30px;
            font-size: 14px;
            color: #999;
            text-align: center;
            border-top: 1px solid #ddd;
            padding-top: 15px;
        }
    </style>
</head>
<body>
    <div class="container">
        <img src="https://res.cloudinary.com/deeqkisit/image/upload/v1741765946/logo_ecap4l.svg" alt="Priscripto Logo" class="logo">
        <h1>Welcome to Priscripto, Dr. ${name}</h1>
        <p>Dear Dr. ${name},</p>
        <p>
            We are honored to welcome you to Priscripto, where innovation meets excellence in healthcare. 
            As a distinguished medical professional, your expertise is invaluable in our mission to enhance 
            patient care through cutting-edge solutions and seamless practice management.
        </p>
        <p>
            At Priscripto, we prioritize efficiency, precision, and support for doctors like you. 
            Your journey with us is just beginning, and we are committed to ensuring your experience is 
            both enriching and impactful.
        </p>
        <div class="credentials">
            <p><strong>Login Details:</strong></p>
            <p><strong>Username:</strong> ${email}</p>
            <p><strong>Password:</strong> ${password}</p>
        </div>
        <a href="https://doctor-booking-appointment-application-6gu7.vercel.app/" class="login-link">Login to Your Account</a>
        <p>
            Please explore our platform and feel free to reach out for any assistance.
        </p>
        <p class="signature">Best Regards,<br><strong>John Doe</strong><br>CEO, Priscripto</p>
        <p class="footer">
            If you have any questions, feel free to contact our support team at support@priscripto.com.<br>
            © 2025 Priscripto. All rights reserved.
        </p>
    </div>
</body>
</html>
`

export const PAYMENT_RECEIPT_TEMPLATE = (name, amount, paymentId, doctorName, speciality, clinicAddress, slotDate, slotTime, paymentDate, paymentTime) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Payment Confirmation</title>
  <style>
    body {
      margin: 0;
      padding: 20px;
      background: #f3e5f5;
      font-family: Arial, sans-serif;
      color: #4a148c;
    }
    .container {
      max-width: 600px;
      background: #fff;
      border-radius: 8px;
      box-shadow: 0 4px 10px rgba(74, 20, 140, 0.2);
      overflow: hidden;
      margin: auto;
    }
    .header {
      background: linear-gradient(to right, #6a1b9a, #ab47bc);
      padding: 20px;
      text-align: center;
      color: #fff;
      font-size: 20px;
      font-weight: bold;
    }
    .content {
      padding: 20px;
      text-align: center;
    }
    .success-icon {
      width: 50px;
      margin-bottom: 15px;
    }
    .details {
      background: #ede7f6;
      padding: 15px;
      border-radius: 8px;
      text-align: left;
      margin-top: 15px;
    }
    .details p {
      margin: 8px 0;
      color: #4a148c;
      font-size: 14px;
    }
    .btn {
      background: #6a1b9a;
      color: #fff;
      padding: 12px 24px;
      border-radius: 5px;
      text-decoration: none;
      display: inline-block;
      font-weight: bold;
      margin-top: 20px;
    }
    .footer {
      background: #d1c4e9;
      padding: 15px;
      text-align: center;
      font-size: 14px;
      color: #4a148c;
      margin-top: 20px;
    }
    @media screen and (max-width: 480px) {
      .container {
        width: 90%;
      }
      .header {
        font-size: 18px;
      }
      .btn {
        padding: 10px 20px;
        font-size: 14px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">Payment Successful</div>
    <div class="content">
      <img src="https://res.cloudinary.com/deeqkisit/image/upload/v1741773939/check_mark_efqjgf.png" alt="Success" class="success-icon">
      <p>Dear <strong>${name}</strong>,</p>
      <p>Your payment of <strong style="font-size: 18px; color: #6a1b9a;">₹${amount}</strong> has been successfully processed.</p>
      <div class="details">
        <p><strong>Payment ID:</strong> ${paymentId}</p>
        <p><strong>Payment Date & Time:</strong> ${paymentDate} at ${paymentTime}</p>
        <p><strong>Doctor Name:</strong> Dr. ${doctorName}</p>
        <p><strong>Speciality:</strong> ${speciality}</p>
        <p><strong>Clinic Address:</strong> ${clinicAddress}</p>
        <p><strong>Appointment Date & Time:</strong> ${slotDate} at ${slotTime}</p>
      </div>
      <a href="#" class="btn">View Appointment Details</a>
    </div>
    <div class="footer">Best regards,<br><strong>Prescripto Team</strong></div>
  </div>
</body>
</html>
`;





