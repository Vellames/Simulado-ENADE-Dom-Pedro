import {Courses} from "../../models/courses"

Router.route("/courses", function(){

    /*if(Meteor.user() == null){
        this.redirect("/");
        return false;
    }*/

    this.subscribe("courses.select");
    this.render("courses_view", {
        data: function () {
            return {
                courses : Courses.select()
            }
        }
    }, {name : "courses_list"});
});

Router.route("/courses/new", function(){

    /*if(Meteor.user() == null){
     this.redirect("/");
     return false;
     }*/

    Session.set("formMode", "new");
    this.render("courses_form", {
        data: function () {
            return {
                newMode: true
            };
        }
    }, {name : "courses_new"});
});

Router.route("/courses/:_id/view", function(){
    this.subscribe("courses.select");

    var _id  = this.params._id;
    var course = Courses.loadOne(_id);

    this.render("courses_form", {
        data: function(){
            return {
                viewMode: true,
                course: course.fetch()[0]
            };
        }
    });
});

Router.route("/courses/:_id/edit", function(){
    this.subscribe("courses.select");

    var _id  = this.params._id;
    var course = Courses.loadOne(_id);

    Session.set("formMode", "edit");
    Session.set("_id", _id);
    this.render("courses_form", {
        data: function(){
            return {
                editMode: true,
                course: course.fetch()[0]
            };
        }
    });
});