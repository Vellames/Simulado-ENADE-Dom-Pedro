import {Courses} from "../../../models/courses"
import {FormHelper} from "../../../utils/form_helper";

Template.courses_view.events({

    /**
     * Apply the filter in select
     * @author Cassiano Vellames <c.vellames@outlook.com>
     * @param event
     * @param instance
     */
    'submit form' : (event, instance) => {
        event.preventDefault();
        const formData = FormHelper.getFormData($(event.currentTarget));
        instance.courses.set(Courses.select(formData, Session.get("orderByForm")));
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
        instance.courses.set(Courses.select(formData, Session.get("orderByForm")));
    },

    /**
     * Delete a course
     * @author Cassiano Vellames <c.vellames@outlook.com>
     * @param event
     * @param instance
     */
    "click .btn-delete" : (event, instance) => {
        if(!confirm(TAPi18n.__("register_delete_confirm"))){
            return false;
        }

        const _id = $(event.currentTarget).attr("data-id");
        try{
            Courses.delete(_id, (err) =>{
                if(err){
                    alert(TAPi18n.__('register_delete_fail'));
                } else {
                    alert(TAPi18n.__('register_delete_success'));
                    Router.go("/courses");
                }
            });
        } catch (ex) {
            alert(ex.error);
        }

    }
});