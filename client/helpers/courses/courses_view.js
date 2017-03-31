/**
 * This helper is used to do the filter in screen using reactive vars
 * The screen gets the course variable to show each element in the table.
 * The course is always updated when the user use the filter or change the order of registers
 */

import { ReactiveVar } from 'meteor/reactive-var';
import {Courses} from "../../../models/courses";

/**
 * Create the variable to store the courses
 * @author Cassiano Vellames <c.vellames@outlook.com>
 */
Template.courses_view.onCreated(function (){
    this.courses = new ReactiveVar(Courses.select());
});

/**
 * The return of answers variable will be always the value set in the template instance
 */
Template.courses_view.helpers({
    courses() {
        return Template.instance().courses.get();
    },
});


