import {Questions} from "../../../models/questions";
import {FormHelper} from "../../../utils/form_helper";

Template.questions_view.events({

    /**
     * Remove a question from databas
     * @author Cassiano Vellames <c.vellames@outlook.com>
     * @param event
     * @param instance
     */
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

    /**
     * Apply the filter in select
     * @author Cassiano Vellames <c.vellames@outlook.com>
     * @param event
     * @param instance
     */
    'submit form' : (event, instance) => {
        event.preventDefault();
        const formData = FormHelper.getFormData($(event.currentTarget));
        instance.questions.set(Questions.select(formData, Session.get("orderByForm")));
    },

    /**
     * Change the sort order
     * @author Cassiano Vellames <c.vellames@outlook.com>
     * @param event
     * @param instance
     */
    "click table thead th" : (event, instance) => {
        const formData = FormHelper.getFormData($("form.filter-form"));
        FormHelper.setOrderBy(event);
        instance.questions.set(Questions.select(formData, Session.get("orderByForm")));
    },
});