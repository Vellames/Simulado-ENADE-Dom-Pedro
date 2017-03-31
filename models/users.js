/**
 * All methods of Courses Questions
 */

/**
 * Select users
 * @author Cassiano Vellames <c.vellames@outlook.com>
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
 * @author Cassiano Vellames <c.vellames@outlook.com>
 * @param _id Id of user
 */
Meteor.users.loadOne = (_id) => {
  return Meteor.users.find({_id : _id});
};

/**
 * Edit only the courses of a user
 * @author Cassiano Vellames <c.vellames@outlook.com>
 * @param _id Id of user
 * @param courses New courses array
 * @param callback Callback after execution
 */
Meteor.users.edit = (_id, courses, callback) => {

    // Cant edit user Admin
    const user = Meteor.users.find({"_id" : _id}).fetch()[0];
    if(user.masterUser){
        return false;
    }

    Meteor.users.update(
        {_id : _id},
        {$set : {"profile.courses": courses}},
        (err, res) => callback(err,res)
    );
};

/**
 * Update the embed course in user based in passed id
 * @author Cassiano Vellames <c.vellames@outlook.com>
 * @param courseId Id to search
 * @param name New name
 * @param user New user
 * @param newDate New date
 * @param callback Callback of function
 */
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
 * @author Cassiano Vellames <c.vellames@outlook.com>
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
 * @author Cassiano Vellames <c.vellames@outlook.com>
 * @param _id Id of user to be disabled
 * @param callback Callback after execution
 */
Meteor.users.disableUser = (_id, callback) => {

    // Cant edit user Admin
    const user = Meteor.users.find({"_id" : _id}).fetch()[0];
    if(user.masterUser){
        return false;
    }

    Meteor.users.update(
        {_id : _id},
        {$set : {"profile.isActive": false}},
        (err, res) => callback(err,res)
    );
};

/**
 * Grant admin permissions for an user
 * @author Cassiano Vellames <c.vellames@outlook.com>
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
 * @author Cassiano Vellames <c.vellames@outlook.com>
 * @param _id Id of user to be revoked
 * @param callback Callback after execution
 */
Meteor.users.disableAdmin = (_id, callback) => {

    // Cant edit user Admin
    const user = Meteor.users.find({"_id" : _id}).fetch()[0];
    if(user.masterUser){
        return false;
    }

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