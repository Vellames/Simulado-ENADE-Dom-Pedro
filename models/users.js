/**
 * Select users
 * @param filter
 * @param orderBy
 */
Meteor.users.select = (filter, orderBy) => {
    if(filter == undefined){
        filter = {}
    }

    if(orderBy == undefined){
        orderBy = {}
    }

    return Meteor.users.find(filter, orderBy);
};