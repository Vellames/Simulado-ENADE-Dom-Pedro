Router.route("/users", function(){
    this.subscribe("users.select").wait();
    this.render("users_view", {
        data : () => {
            return {
                "users" : Meteor.users.select({}, {})
            }
        }
    });
});