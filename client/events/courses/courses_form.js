import {Courses} from "../../../models/courses"

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