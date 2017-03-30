import {Questions} from "../../../models/questions";
import {FormHelper} from "../../../utils/form_helper";

Template.questions_view.events({
    "click button.btn-delete" : (event, instance) => {
        if(!confirm(TAPi18n.__("register_delete_confirm"))){
            return false;
        }

        const _id = $(event.currentTarget).attr("data-id");
        Questions.delete(_id, (err) =>{
            if(err){
                alert(TAPi18n.__('register_delete_fail'));
            } else {
                alert(TAPi18n.__('register_delete_success'));
                Router.go("/questions");
            }
        });
    },

    'submit form' : (event, instance) => {
        event.preventDefault();
        const formData = FormHelper.getFormData($(event.currentTarget));
        instance.questions.set(Questions.select(formData, Session.get("orderByForm")));
    },

    "click table thead th" : (event, instance) => {
        const formData = FormHelper.getFormData($("form.filter-form"));
        FormHelper.setOrderBy(event);
        instance.questions.set(Questions.select(formData, Session.get("orderByForm")));
    },
});