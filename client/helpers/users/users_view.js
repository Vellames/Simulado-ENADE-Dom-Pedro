import { ReactiveVar } from 'meteor/reactive-var';

Template.users_view.onCreated(function (){
    this.users = new ReactiveVar(Meteor.users.select());
});

Template.users_view.helpers({
    courses() {
        return Template.instance().users.get();
    },
});


