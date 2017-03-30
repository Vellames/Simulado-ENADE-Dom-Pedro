var Questions = new Mongo.Collection("questions");

/**
 * Select the questions based in params
 * @param filter Filter json
 * @param orderBy Order By json
 * @param fields JSON with fields in find
 * @returns {Cursor} Returns a list of Question
 */
Questions.select = (filter, orderBy, fields) => {
    if(filter == undefined){
        filter = {};
    }

    var othersParams = {};
    if(orderBy != undefined){
        othersParams["sort"] = orderBy
    }

    if(fields != undefined){
        othersParams["fields"] = fields
    }

    console.log(JSON.stringify(filter));
    return Questions.find(filter, othersParams);
};

/**
 * Select one question by id
 * @param _id id of question
 * @returns {Cursor} Returns a cursor with one question
 */
Questions.loadOne = (_id) => {
    return Questions.find({_id : _id});
};

/**
 * Add a new question in collection
 * @param question Description of question
 * @param course Course of question
 * @param responses Responses of question
 * @param callback Callback of function
 */
Questions.new = (question, course, responses, callback) => {
    Questions.insert({
        question : question,
        course: course,
        responses : responses,
        createdBy: Meteor.user(),
        created: new Date(),
        editedBy : null,
        edited: null
    }, (err,res) => callback(err,res));
};

/**
 * Edit a question
 * @param _id id of question to be edited
 * @param question Question description
 * @param course Course of question
 * @param responses Responses of question
 * @param callback Callback of function
 */
Questions.edit = (_id, question, course, responses, callback) => {
    Questions.update(
        {_id : _id},
        {
            $set : {
                question: question,
                course: course,
                responses: responses,
                editedBy: Meteor.user(),
                edited: new Date()
            }
        },
        (err, res) => callback(err,res)
    );
};

/**
 * Delete a question
 * @param _id Id of question
 * @param callback Callback of function
 */
Questions.delete = (_id, callback) =>{
    Questions.remove({_id: _id}, (err,res) => callback(err,res));
};


/**
 * Update courses values
 * @param courseId Id of course
 * @param name new name
 * @param user User informations
 * @param newDate Actual date
 * @param callback callback of function
 */
Questions.updateCourses = (courseId, name, user, newDate, callback) => {
    Questions.update(
        {"course._id" : courseId},
        {
            $set : {
                "course.name" : name,
                "course.editedBy" : user,
                "course.edited" : newDate
            }
        },
        {multi : true},
        (err,res) => callback(err,res)
    );
}

Questions.allow({
    insert: (userId, doc) => {
        var user = Meteor.user();
        return user.profile.isActive;
    },
    update: (userId, doc, fields, modifier) => {
        var user = Meteor.user();
        return (user.profile.isActive && doc.createdBy._id == userId) || user.profile.isAdmin;
    },
    remove: (userId, doc) => {
        var user = Meteor.user();
        return (user.profile.isActive && doc.createdBy._id == userId) || user.profile.isAdmin;
    }
});

export {Questions};