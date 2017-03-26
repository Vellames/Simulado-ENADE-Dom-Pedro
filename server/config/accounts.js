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

        // Configure emails templates
        Accounts.emailTemplates.from = 'no-reply@dpii.com.br';
        Accounts.emailTemplates.siteName = 'localhost:3000';

        // Email verification
        Accounts.emailTemplates.verifyEmail.subject(function(user){
            return 'oieeeeee';
        });

        Accounts.emailTemplates.verifyEmail.text(function(user, url){
            return url;
        });

    });
}
