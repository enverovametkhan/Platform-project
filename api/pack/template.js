// async function generateTemplate(type, url, swapEmailData) {
//   const template = {};

//   if (type === "SIGNUP") {
//     template.html = `
//         <!DOCTYPE html>
//         <html lang="en">
//         <head>
//           <meta charset="UTF-8">
//           <meta name="viewport" content="width=device-width, initial-scale=1.0">
//           <title>Email Confirmation</title>
//         </head>
//         <body>
//           <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
//             <h2>Email Confirmation</h2>
//             <p>Dear User,</p>
//             <p>Thank you for signing up. Please click the button below to confirm your email:</p>
//             <a href="${url}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 5px;">Confirm Email</a>
//             <p>If you didn't sign up for this service, you can ignore this email.</p>
//             <p>Best regards</p>
//           </div>
//         </body>
//         </html>`;
//   } else if (type === "RESET_PASSWORD") {
//     template.html = `
//         <!DOCTYPE html>
//         <html lang="en">
//         <head>
//           <meta charset="UTF-8">
//           <meta name="viewport" content="width=device-width, initial-scale=1.0">
//           <title>Password Reset</title>
//         </head>
//         <body>
//           <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
//             <h2>Password Reset</h2>
//             <p>Dear User,</p>
//             <p>We received a request to reset your password. Click the button below to reset it:</p>
//             <a href="${url}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 5px;">Reset Password</a>
//             <p>If you didn't initiate this request, you can ignore this email.</p>
//             <p>Best regards</p>
//           </div>
//         </body>
//         </html>`;
//     template.subject = "Reset Password";
//   } else if (type === "EMAIL_SWAP") {
//     template.html = `
//         <!DOCTYPE html>
//         <html lang="en">
//         <head>
//           <meta charset="UTF-8">
//           <meta name="viewport" content="width=device-width, initial-scale=1.0">
//           <title>Email Swap Confirmation</title>
//         </head>
//         <body>
//           <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
//             <h2>Email Swap Confirmation</h2>
//             <p>Dear User,</p>
//             <p>Thank you for initiating an email swap. Please click the button below to confirm the email swap:</p>
//             <p>Email will be changed from ${swapEmailData.oldEmail} to ${swapEmailData.newEmail}</p>
//             <a href="${url}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 5px;">Confirm Email Swap</a>
//             <p>If you didn't request this email swap, you can ignore this email.</p>
//             <p>Best regards</p>
//           </div>
//         </body>
//         </html>`;
//     template.subject = "Email Swap Confirmation";
//   }

//   return template;
// }

// module.exports = { generateTemplate };
