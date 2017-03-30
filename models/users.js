/**
 * Select users
 * @param filter Filter array
 * @param orderBy OrderBy array
 */
Meteor.users.select = (filter, orderBy) => {
    if(filter == undefined){
        filter = {}
    }

    if(orderBy == undefined){
        orderBy = {}
    }

    return Meteor.users.find(filter, {sort: orderBy});
};

/**
 * Load one user information
 * @param _id Id of user
 */
Meteor.users.loadOne = (_id) => {
  return Meteor.users.find({_id : _id});
};

/**
 * Edit only the courses of a user
 * @param _id Id of user
 * @param courses New courses array
 * @param callback Callback after execution
 */
Meteor.users.edit = (_id, courses, callback) => {
    Meteor.users.update(
        {_id : _id},
        {$set : {"profile.courses": courses}},
        (err, res) => callback(err,res)
    );
};

Meteor.users.updateCourses = (courseId, name, user, newDate, callback) => {
    Meteor.users.update(
        {"profile.courses._id" : courseId},
        {
            $set : {
                "profile.courses.$.name" : name,
                "profile.courses.$.editedBy" : user,
                "profile.courses.$.edited" : newDate
            }
        },
        {multi : true},
        (err,res) => callback(err,res)
    );
}

/**
 * Activate an user
 * @param _id Id of user to be activated
 * @param callback Callback after execution
 */
Meteor.users.activateUser = (_id, callback) => {
    Meteor.users.update(
        {_id : _id},
        {$set : {"profile.isActive": true}},
        (err, res) => callback(err,res)
    );
};

/**
 * Disable an user
 * @param _id Id of user to be disabled
 * @param callback Callback after execution
 */
Meteor.users.disableUser = (_id, callback) => {
    Meteor.users.update(
        {_id : _id},
        {$set : {"profile.isActive": false}},
        (err, res) => callback(err,res)
    );
};

/**
 * Grant admin permissions for an user
 * @param _id Id of user to be admin
 * @param callback Callback after execution
 */
Meteor.users.enableAdmin = (_id, callback) => {
    Meteor.users.update(
        {_id : _id},
        {$set : {"profile.isAdmin": true}},
        (err, res) => callback(err,res)
    );
};

/**
 * Revoke admin permissions for an user
 * @param _id Id of user to be revoked
 * @param callback Callback after execution
 */
Meteor.users.disableAdmin = (_id, callback) => {
    Meteor.users.update(
        {_id : _id},
        {$set : {"profile.isAdmin": false}},
        (err, res) => callback(err,res)
    );
};

/*
 Permissions:
 Only the admin can add, edit and remove a course
 */
Meteor.users.allow({
    insert: (userId, doc) => {
        return true;
    },
    update: (userId, doc, fields, modifier) => {
        var user = Meteor.user();
        return user.profile.isAdmin;
    },
    remove: (userId, doc) => {
        var user = Meteor.user();
        return user.profile.isAdmin;
    }
});