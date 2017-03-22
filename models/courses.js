var Courses = new Mongo.Collection("courses");

/**
 * Insert a new course
 * @param name Name of course
 * @param callback Callback of operation
 */
Courses.add = (name, callback) => {
    Courses.insert({
        name: name,
        created: new Date(),
        createdBy: Meteor.user(),
        edited: null,
        editedBy: null
    }, function(err, res){
        callback(err, res);
    });
};

Courses.edit = (_id, name, callback) => {
    Courses.update(
        {_id : _id},
        {$set :
            {
                name: name,
                editedBy: Meteor.user(),
                edited: new Date()
            }
        }
    , function(err) {
        callback(err);
    });
};

/**
 * Select courses using the filter sent by the client
 * @returns {Cursor}
 */
Courses.select = (name, createdBy) => {
    var filter = {};
    if(name){
        filter["name"] = new RegExp(name, 'i');
    }

    if(createdBy){
        filter["createdBy.profile.name"] = new RegExp(createdBy, 'i');
    }
    return Courses.find(filter);
};

/**
 *
 * @param id
 * @returns {Cursor}
 */
Courses.loadOne = (id) => {
    return Courses.find({_id: id});
};


// Permissions
Courses.allow({
    insert: (userId, doc) => {
        var user = Meteor.user();
        return user.profile.isAdmin;
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

export {Courses}