import {Questions} from "../../models/questions";

Meteor.methods({

    /**
     * Update all embed courses documents in qustions and users.
     * @author Cassiano Vellames <c.vellames@outlook.com>
     * @param courseId Id of course
     * @param name new name
     * @param user User informations
     * @param newDate Actual date
     */
    "updateEmbedDocuments" : function(courseId, name, user, newDate){
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