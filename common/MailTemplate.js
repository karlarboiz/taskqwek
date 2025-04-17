class MailTemplate {

    constructor(message1,message2,message3) {
        this.message1 = message1;
        this.message2 = message2;
        this.message3 = message3;
    }
    static FIRST_MAIL_PART =`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>Invitation Email</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
        </style>
      </head>
      `
      static MIDDLE_MAIL_PART = `
      <body style="margin: 0; padding: 0; font-family: 'Roboto', sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f4f4f4; padding: 20px;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden;">
              <tr>
                <td style="background-color: #007bff; padding: 20px; color: white; text-align: center;">
                  <h1>You're Invited!</h1>
                </td>
              </tr>
              <tr>
                <td style="padding: 30px; text-align: left; color: #333;">
                  <p>Hi there 👋,</p>
               `;
    static LAST_MAIL_PART = 
    `   
                  <p>If the button above doesn't work, copy and paste this link into your browser:</p>

                  <br />
                  <p>Cheers,<br />TaskQwek</p>
                </td>
              </tr>
              <tr>
                <td style="background-color: #f1f1f1; padding: 20px; text-align: center; font-size: 12px; color: #888;">
                  © 2025 TaskQwek, Inc. All rights reserved.
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>`

  static SUBJECT_MEMBERSHIP_JOIN = "You have been invited under Organization ";

  constructMailContent(){
    return `<p>
          You've been invited to join <strong>${this.message1}</strong>! Click the button below to accept the invitation and get started.
        </p>
        
        <p> Here's your invite code: ${this.message2} </p>`
  }

  
}

module.exports = MailTemplate;