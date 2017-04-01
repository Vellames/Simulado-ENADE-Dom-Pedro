/**
 * Set all routes of users
 */

import {Courses} from "../../models/courses";

Router.route("/users", function(){

    this.subscribe("users.select").wait();
    this.render("users_view", {
        data : () => {
            return {
                users : Meteor.users.select({}, {"profile.name" : 1})
            }
        }
    });

});

Router.route("/user/:_id/edit", function(){

    var _id = this.params._id;

    this.subscribe("users.select");
    this.subscribe("courses.select");

    const user = Meteor.users.loadOne(_id).fetch()[0];
    const courses = Courses.select({}, {name : 1}).fetch();

    Session.set("edit_user", user);
    Session.set("edit_user_courses", courses);

    this.render("users_form", {
        data: () => {
            return {
                "user" : user,
                "courses" : courses,
                "editMode": true
            }
        }
    });
});

Router.route("/user/:_id", function(){

    var _id = this.params._id;

    this.subscribe("users.select").wait();
    this.subscribe("courses.select").wait();

    const user = Meteor.users.loadOne(_id).fetch()[0];
    const courses = Courses.select({}, {name : 1}).fetch();

    Session.set("edit_user", user);
    Session.set("edit_user_courses", courses);

    this.render("users_form", {
        data: () => {
            return {
                "user" : user,
                "courses" : courses,
                "viewMode": true
            }
        }
    });
});