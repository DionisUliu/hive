import sgMail from '@/config/sendGrid';
import mjml from 'mjml';

export const sendEmail = ({ toAddress, subject, template }: any) => {
  const { html } = mjml(template);
  const msg = {
    to: toAddress,
    from: 'dionis.uliu@softup.co',
    subject: subject,
    html: html,
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent successfully');
    })
    .catch((error: any) => {
      console.error('Error sending email:', error);
    });
};
