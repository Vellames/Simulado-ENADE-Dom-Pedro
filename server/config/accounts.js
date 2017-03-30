// Adding some personal informations in user creation
Accounts.onCreateUser((options, user) => {

    options.profile['isAdmin'] = false;
    options.profile['isActive'] = false;
    options.profile["courses"] = [];
    user.profile = options.profile;

    return user;
});

// Configure email
if(Meteor.isServer){

    Meteor.startup(function(){

        // Set Mail URL
        process.env.MAIL_URL='smtp://c.vellames@outlook.com:_cassiano1995@@@smtp-mail.outlook.com:587';

        // Configure accounts send verification email
        Accounts.config({
            sendVerificationEmail: true
        });

        Accounts.emailTemplates.siteName = "Simulado ENADE Dom Pedro II";

        // Activation email
        Accounts.emailTemplates.verifyEmail.subject = function (user) {
            return TAPi18n.__("verify_email_subject");
        };
        Accounts.emailTemplates.verifyEmail.text = function (user, url) {
            return TAPi18n.__("verify_email_body") + url;
        };

        // Resend password email
        Accounts.emailTemplates.resetPassword.subject = function (user) {
            return TAPi18n.__("reset_password_email_subject");
        };

        Accounts.emailTemplates.resetPassword.text = function (user, url) {
            return TAPi18n.__("reset_password_email_body") + url;
        };

    });
}
