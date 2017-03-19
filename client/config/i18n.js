Meteor.startup(function(){
    TAPi18n.setLanguage("br").fail(function(error){
        console.log(error);
    });
});