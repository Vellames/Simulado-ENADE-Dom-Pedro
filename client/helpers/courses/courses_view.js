import { ReactiveVar } from 'meteor/reactive-var';
import {Courses} from "../../../models/courses";

Template.courses_view.onCreated(function (){
    this.courses = new ReactiveVar(Courses.select());
});

Template.courses_view.helpers({
    courses() {
        return Template.instance().courses.get();
    },
});


