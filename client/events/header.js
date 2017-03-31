Template.header.events({

    /**
     * Change the language of application
     * @param event
     * @param instance
     */
    "click [data-i18n]" : (event, instance) => {
        var language = $(event.currentTarget).attr("data-i18n");
        TAPi18n.setLanguage(language);

        if(language == "br"){
            language = "pt-BR";
        }

        accountsUIBootstrap3.setLanguage(language);
    }
});