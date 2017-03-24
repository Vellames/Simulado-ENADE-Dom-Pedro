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

Router.route("/users/:_id/edit", function(){
    this.subscribe("users.select").wait();
    this.render("users_form", {
       data: () => {
           return {

           }
       }
    });
});