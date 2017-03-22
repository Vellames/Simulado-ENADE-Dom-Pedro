import {Courses} from "../../models/courses"

Meteor.publish("courses.select", () => {
    return Courses.find();
});