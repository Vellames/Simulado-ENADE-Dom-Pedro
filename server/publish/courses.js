import {Courses} from "../../models/courses"

/**
 * Publish the courses
 * If user are'nt admin, only publish the courses assigned to it
 */
Meteor.publish("courses.select", function() {
    if(this.userId){
        const user = Meteor.users.find({"_id" : this.userId}).fetch()[0];

        if(!user.profile.isAdmin){
            var courses = [];
            for(var i = 0; i < user.profile.courses.length; i++){
                courses.push(user.profile.courses[i]._id);
            }

            return Courses.find({"_id" : {$in : courses}});
        }
        return Courses.find();
    }
});