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

/**
 * Edit a course
 * @param _id Id of course
 * @param name New name of course
 * @param callback Callback of function
 */
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
 * Delete one course
 * @param _id Id of course
 * @param callback Callback of function
 */
Courses.delete = (_id, callback) => {
    Courses.remove({_id : _id}, (err,res) => callback(err, res));
};

/**
 * @param filter JSON with filters
 * @param orderBy JSON with orderBy params
 * @returns {Cursor} Returns a cursor with courses
 */
Courses.select = (filter, orderBy) => {
    if(filter == undefined){
        filter = {};
    }

    if(orderBy == undefined){
        orderBy = {};
    }

    return Courses.find(filter, {sort: orderBy});
};

/**
 * @param id Id of course
 * @returns {Cursor} Return one course based in passed id
 */
Courses.loadOne = (id) => {
    return Courses.find({_id: id});
};


/*
    Permissions:
        Only the admin can add, edit and remove a course
 */
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