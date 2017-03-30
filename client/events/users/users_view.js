import {FormHelper} from "../../../utils/form_helper"

Template.users_view.events({

    /**
     * Activate an user
     * @param event
     * @param instance
     */
    "click [data-action=activate-user]" : (event, instance) => {
        var _id = $(event.currentTarget).attr("data-id");
        Meteor.users.activateUser(_id, (err,res) => {
            if(err){
                alert(TAPi18n.__('user_activate_fail'));
            } else {
                alert(TAPi18n.__('user_activate_success'));
                Router.go("/users");
            }
        })
    },

    /**
     * Disable an user
     * @param event
     * @param instance
     */
    "click [data-action=disable-user]" : (event, instance) => {
        var _id = $(event.currentTarget).attr("data-id");
        Meteor.users.disableUser(_id, (err,res) => {
            if(err){
                alert(TAPi18n.__('user_disable_fail'));
            } else {
                alert(TAPi18n.__('user_disable_success'));
                Router.go("/users");
            }
        })
    },

    /**
     * Grant admin permissions for user
     * @param event
     * @param instance
     */
    "click [data-action=enable-admin]" : (event, instance) => {
        var _id = $(event.currentTarget).attr("data-id");
        Meteor.users.enableAdmin(_id, (err,res) => {
            if(err){
                alert(TAPi18n.__('admin_enable_fail'));
            } else {
                alert(TAPi18n.__('admin_enable_success'));
                Router.go("/users");
            }
        })
    },

    /**
     * Revoke admin permissions for user
     * @param event
     * @param instance
     */
    "click [data-action=disable-admin]" : (event, instance) => {
        var _id = $(event.currentTarget).attr("data-id");
        Meteor.users.disableAdmin(_id, (err,res) => {
            if(err){
                alert(TAPi18n.__('admin_disable_fail'));
            } else {
                alert(TAPi18n.__('admin_disable_success'));
                Router.go("/users");
            }
        })
    },

    'submit form' : (event, instance) => {
        event.preventDefault();
        const formData = FormHelper.getFormData($(event.currentTarget));
        instance.users.set(Meteor.users.select(formData, Session.get("orderByForm")));
    },

    "click table thead th" : (event, instance) => {
        const formData = FormHelper.getFormData($("form.filter-form"));
        FormHelper.setOrderBy(event);
        instance.users.set(Meteor.users.select(formData, Session.get("orderByForm")));
    },
});