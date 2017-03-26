import {Questions} from "../../models/questions"

/**
 * Questions publish
 * If user are'nt admin, only publish the questions created by it
 */
Meteor.publish("questions.select", function() {
    if(this.userId){
        const user = Meteor.users.find({"_id" : this.userId}).fetch()[0];
        return (user.profile.isAdmin ? Questions.find() : Questions.find({"createdBy._id" : this.userId}));
    }
});