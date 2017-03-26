Meteor.publish("users.select", function() {
    if(this.userId){
        const userCursor = Meteor.users.find({"_id" : this.userId});
        const user = userCursor.fetch()[0];
        return (user.profile.isAdmin && user.profile.isActive ? Meteor.users.find() : userCursor);
    }
});