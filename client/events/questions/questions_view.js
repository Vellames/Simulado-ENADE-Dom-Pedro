import {Questions} from "../../../models/questions";

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
    }
});