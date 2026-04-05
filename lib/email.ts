import nodemailer from 'nodemailer';

// Configure your email service here
// For production, use environment variables for SMTP credentials
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendApplicationNotification(
  studentEmail: string,
  studentName: string,
  internshipTitle: string,
  internshipCompany: string
) {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || 'noreply@internshipscheme.com',
      to: studentEmail,
      subject: `Application Submitted: ${internshipTitle} at ${internshipCompany}`,
      html: `
        <h2>Application Submitted Successfully</h2>
        <p>Hi ${studentName},</p>
        <p>Your application for <strong>${internshipTitle}</strong> at <strong>${internshipCompany}</strong> has been submitted.</p>
        <p>You can track the status of your application in your dashboard.</p>
        <p>Best regards,<br>Internship Scheme Team</p>
      `,
    });
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

export async function sendApplicationStatusUpdate(
  studentEmail: string,
  studentName: string,
  internshipTitle: string,
  status: string
) {
  const statusMessage = {
    shortlisted: 'Your application has been shortlisted!',
    rejected: 'Thank you for your interest. Unfortunately, you were not selected.',
    accepted: 'Congratulations! Your application has been accepted!',
  };

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || 'noreply@internshipscheme.com',
      to: studentEmail,
      subject: `Application Status Update: ${internshipTitle}`,
      html: `
        <h2>Application Status Update</h2>
        <p>Hi ${studentName},</p>
        <p>${statusMessage[status as keyof typeof statusMessage] || 'Your application status has been updated.'}</p>
        <p>For <strong>${internshipTitle}</strong></p>
        <p>Best regards,<br>Internship Scheme Team</p>
      `,
    });
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

export async function sendNewApplicationNotification(
  recruiterEmail: string,
  recruiterName: string,
  studentName: string,
  internshipTitle: string,
  matchScore: number
) {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || 'noreply@internshipscheme.com',
      to: recruiterEmail,
      subject: `New Application: ${internshipTitle}`,
      html: `
        <h2>New Application Received</h2>
        <p>Hi ${recruiterName},</p>
        <p><strong>${studentName}</strong> has applied for <strong>${internshipTitle}</strong>.</p>
        <p><strong>Match Score:</strong> ${matchScore}%</p>
        <p>Log in to your dashboard to review the application.</p>
        <p>Best regards,<br>Internship Scheme Team</p>
      `,
    });
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

export async function sendWelcomeEmail(email: string, name: string) {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || 'noreply@internshipscheme.com',
      to: email,
      subject: 'Welcome to Internship Scheme!',
      html: `
        <h2>Welcome to Internship Scheme!</h2>
        <p>Hi ${name},</p>
        <p>Thank you for signing up! We're excited to help you find your perfect internship.</p>
        <p>Get started by:</p>
        <ul>
          <li>Completing your profile with your skills and interests</li>
          <li>Browsing available internships</li>
          <li>Getting personalized recommendations</li>
        </ul>
        <p>Best regards,<br>Internship Scheme Team</p>
      `,
    });
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}
