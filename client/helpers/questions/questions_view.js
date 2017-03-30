import { ReactiveVar } from 'meteor/reactive-var';
import {Questions} from "../../../models/questions";

Template.questions_view.onCreated(function (){
    this.questions = new ReactiveVar(Questions.select({}, {"course.name" : 1, "question" : 1}));
});

Template.questions_view.helpers({
    questions() {
        return Template.instance().questions.get();
    },
});


