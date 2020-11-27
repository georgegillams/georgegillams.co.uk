import { EMAIL_OUTER, EMAIL_LOGO_HEADER, sendEmail, EMAIL_OUTER_END, FONT_SIZE_SM } from 'server-utils/emails';
import appConfig from 'helpers/appConfig';

export default function sendPaymentReceiptEmail(payment, charge) {
  const email = {
    from: `payments@${appConfig.emailDomain}`,
    to: payment.email,
    subject: 'Payment received',
    text: `Thank you for your recent payment of £${charge.amount / 100}.`,
    html: `${EMAIL_OUTER}
      ${EMAIL_LOGO_HEADER}
      <tr>
        <td bgcolor="white" style="padding: 24px 24px 0 24px;">
          <p>
            Thank you for making an online payment.
            <br><br>
            Please find the receipt for this transaction below.
          </p>
        </td>
      </tr>
      <tr>
        <td bgcolor="white" style="padding: 0 24px 24px 24px; font-size: ${FONT_SIZE_SM};">
          <hr/>
          <p>
            TRANSACTION RECEIPT FOR YOUR RECORDS:
            <br>
            Payment name: George Gillams - online payment ${payment.id}
            <br>
            Payment amount: £${charge.amount / 100}
            <br>
            Payment method: ${charge.payment_method_details.card.brand}-${charge.payment_method_details.card.last4}
            <br>
            Transaction ID: ${charge.id}
            <br>
            Timestamp: ${new Date(charge.created * 1000).toString()}
          </p>
        </td>
      </tr>
    ${EMAIL_OUTER_END}`,
  };

  return sendEmail(email);
}
