Router.configure({
    layoutTemplate: "main"
});


// Configure routes permissions
Router.onBeforeAction(function() {
    this.next();
    /*const actualRouteName = Router.current().route.getName();

    // Can only pass in home route
    if(actualRouteName == undefined){
        this.next();
    }

    // if user have'nt login, redirect to homepage
    if(!Meteor.user()){
        Router.go("/");
    }

    // Free route for normal users
    const normalUserAccessURLs = ["questions_list", "question_new", "question_edit", "question_view"];

    // Check if current route is a free route
    if(normalUserAccessURLs.indexOf(actualRouteName) > -1 || Meteor.user().profile.isAdmin){
        this.next();
    } else {
        Router.go("/");
    }*/

});