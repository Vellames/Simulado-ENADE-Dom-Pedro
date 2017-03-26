import {Courses} from "../../models/courses";
import {Questions} from "../../models/questions";

Router.route("/questions", function(){
    this.subscribe("questions.select");
    this.subscribe("courses.select");
    this.render("questions_view", {
        data: () => {
            return {
                questions: Questions.select({}, {name : 1}),
                courses: Courses.select({}, {name : 1})
            }
        }
    });
});

Router.route("/questions/new", function(){
    this.subscribe("courses.select");
    Session.set("formMode", "new");
    this.render("questions_form", {
        data: () => {
            return {
                courses: Courses.select({}, {name : 1}),
                newMode: true
            }
        }
    });
});

Router.route("/question/:_id/edit", function(){

    this.subscribe("questions.select");
    this.subscribe("courses.select");

    this.render("questions_form", {
        data: () => {
            return {
                courses: Courses.select({}, {name : 1}),
                question: Questions.loadOne(this.params._id).fetch()[0],
                editMode: true
            }
        }
    });
});

Router.route("/question/:_id", function(){
    this.subscribe("questions.select");
    this.subscribe("courses.select");

    this.render("questions_form", {
        data: () => {
            return {
                courses: Courses.select({}, {name : 1}),
                question: Questions.loadOne(this.params._id).fetch()[0],
                viewMode: true
            }
        }
    });
});