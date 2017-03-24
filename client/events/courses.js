import {Courses} from "../../models/courses"
import {FormHelper} from "../../utils/form_helper";

Template.courses_form.events({
   "submit form": (event, template) => {
       event.preventDefault();

       var name = template.find("#courses-name").value;
       if(Session.get("formMode") == "new"){
           Courses.add(name, (err) => {
               if(err){
                   alert(TAPi18n.__('register_insert_fail'));
               } else {
                   alert(TAPi18n.__('register_insert_success'));
                   Router.go("/courses");
               }
           });
       } else {
           Courses.edit(Session.get("_id"), name, (err) => {
               if(err){
                   alert(TAPi18n.__('register_update_fail'));
               } else {
                   alert(TAPi18n.__('register_update_success'));
                   Router.go("/courses");
               }
           })
       }
   }
});

Template.courses_view.events({
    'submit form' : (event, instance) => {
        event.preventDefault();
        const formData = FormHelper.getFormData($(event.currentTarget));
        instance.courses.set(Courses.select(formData, Session.get("orderByForm")));
    },

    "click table thead th" : (event, instance) => {
        const formData = FormHelper.getFormData($("form.filter-form"));
        FormHelper.setOrderBy(event);
        instance.courses.set(Courses.select(formData, Session.get("orderByForm")));
    },

    "click .btn-delete" : (event, instance) => {
        if(!confirm(TAPi18n.__("register_delete_confirm"))){
            return false;
        }

        const _id = $(event.currentTarget).attr("data-id");
        Courses.delete(_id, (err) =>{
            if(err){
                alert(TAPi18n.__('register_delete_fail'));
            } else {
                alert(TAPi18n.__('register_delete_success'));
                Router.go("/courses");
            }
        });
    }
});