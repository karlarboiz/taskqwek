class MailTemplate {

    constructor(message1,message2,message3) {
        this.message1 = message1;
        this.message2 = message2;
        this.message3 = message3;
    }
    static FIRST_MAIL_PART =`<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Invitation Email</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
    </style>
  </head>`

  static LAST_MAIL_PART = `</html>`;


  
}

module.exports = MailTemplate;