import {Courses} from "../../models/courses"

Router.route("/courses", function(){
    this.subscribe("courses.select");
    this.render("courses_view", {
        data: () => {
            return {
                courses : Courses.select({}, {name: 1})
            }
        }
    });
});

Router.route("/courses/new", function(){
    Session.set("formMode", "new");
    this.render("courses_form", {
        data: () => {
            return {
                newMode: true
            };
        }
    });
});

Router.route("/courses/:_id", function(){
    this.subscribe("courses.select");

    var _id  = this.params._id;
    var course = Courses.loadOne(_id);

    this.render("courses_form", {
        data: () => {
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
        data: () => {
            return {
                editMode: true,
                course: course.fetch()[0]
            };
        }
    });
});