Template.header.events({
    "click [data-i18n]" : (event, instance) => {
        const language = $(event.currentTarget).attr("data-i18n");
        TAPi18n.setLanguage(language);
    }
});