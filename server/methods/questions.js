import {Questions} from "../../models/questions";

Meteor.methods({
    "updateEmbedCourses" : function(courseId, name, user, newDate){
        Questions.updateCourses(courseId, name, user, newDate, (err,res) => {
            if(err){
                throw new Meteor.Error("Update Questions Error");
            }

            Meteor.users.updateCourses(courseId, name, user, newDate, (err,res) => {
                if(err){
                    throw new Meteor.Error("Update Users Error");
                }
            });
        });
    }
});