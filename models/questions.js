var Questions = new Mongo.Collection("questions");

/**
 * Select the questions based in params
 * @param filter Filter json
 * @param orderBy Order By json
 * @returns {Cursor} Returns a list of Question
 */
Questions.select = (filter, orderBy) => {
    if(filter == undefined){
        filter = {};
    }

    if(orderBy == undefined){
        orderBy = {};
    }

    return Questions.find(filter, {sort: orderBy});
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

Questions.allow({
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

export {Questions};