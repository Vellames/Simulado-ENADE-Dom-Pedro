/**
 * Configure the Accounts of application
 */

Accounts.ui.config({
    requestPermissions: [],
    extraSignupFields: [
        {
            fieldName: 'name',
            fieldLabel: 'Nome',
            inputType: 'text',
            visible: true,
            validate: function(value, errorFunction) {
                if (!value) {
                    errorFunction("Please write your name");
                    return false;
                } else {
                    return true;
                }
            }
        }
    ]
});

accountsUIBootstrap3.setLanguage('pt-BR');