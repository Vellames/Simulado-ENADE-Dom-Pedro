/**
 * This helper is used to do the filter in screen using reactive vars
 * The screen gets the user variable to show each element in the table.
 * The user is always updated when the user use the filter or change the order of registers
 */

import { ReactiveVar } from 'meteor/reactive-var';

/**
 * Create the variable to store the users
 * @author Cassiano Vellames <c.vellames@outlook.com>
 */
Template.users_view.onCreated(function (){
    this.users = new ReactiveVar(Meteor.users.select());
});

/** The return of users variable will be always the value set in the template instance
* @author Cassiano Vellames <c.vellames@outlook.com>
*/
Template.users_view.helpers({
    users() {
        return Template.instance().users.get();
    },
});


