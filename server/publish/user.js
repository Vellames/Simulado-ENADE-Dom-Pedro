/**
 * Publish of user
 * If user are'nt admin, only publish your information
 */
Meteor.publish("users.select", function() {
    if(this.userId){
        const userCursor = Meteor.users.find({"_id" : this.userId});
        const user = userCursor.fetch()[0];
        return (user.profile.isAdmin ? Meteor.users.find() : userCursor);
    }
});