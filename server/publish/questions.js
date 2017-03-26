import {Questions} from "../../models/questions"

Meteor.publish("questions.select", () => {
    return Questions.find();
});