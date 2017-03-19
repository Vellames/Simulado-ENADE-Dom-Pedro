Router.route("/classes", function(){

    /*if(Meteor.user() == null){
        this.redirect("/");
        return false;
    }*/

    this.render("classes_view", {
        data: function () {
            return {};
        }
    }, {name : "classes_view"});
});

Router.route("/classes/new", function(){

    /*if(Meteor.user() == null){
     this.redirect("/");
     return false;
     }*/

    this.render("class_form", {
        data: function () {
            return {
                mode: "new"
            };
        }
    }, {name : "classes_view"});
});