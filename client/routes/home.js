Router.route("/", function () {
    this.render("home", {
        data: function(){
            return {
                isActive: Meteor.user()
            };
        }
    });
});