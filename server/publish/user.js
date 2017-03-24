Meteor.publish("users.select", () => {
    return Meteor.users.find();
    //return Meteor.users.find({"emails.address": {$not: "admin@admin.com"}});
    //({"emails.address": {"$not" : { "$eq" : "admin@admin.com"}}});
});