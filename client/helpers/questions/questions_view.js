/**
 * This helper is used to do the filter in screen using reactive vars
 * The screen gets the question variable to show each element in the table.
 * The question is always updated when the user use the filter or change the order of registers
 */

import { ReactiveVar } from 'meteor/reactive-var';
import {Questions} from "../../../models/questions";

/**
 * Create the variable to store the questions
 * @author Cassiano Vellames <c.vellames@outlook.com>
 */
Template.questions_view.onCreated(function (){
    this.questions = new ReactiveVar(Questions.select({}, {"course.name" : 1, "question" : 1}));
});

/**
 * The return of questions variable will be always the value set in the template instance
 * @author Cassiano Vellames <c.vellames@outlook.com>
 */
Template.questions_view.helpers({
    questions() {
        return Template.instance().questions.get();
    },
});


