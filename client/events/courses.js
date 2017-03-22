import { ReactiveVar } from 'meteor/reactive-var';
import {Courses} from "../../models/courses"

Template.courses_form.events({
   "submit form": (event, template) => {
       event.preventDefault();

       var name = template.find("#courses-name").value;
       if(Session.get("formMode") == "new"){
           Courses.add(name, (err, res) => {
               if(err){
                   alert(err.reason);
               } else {
                   alert("Registro inserido com sucesso");
                   Router.go("/courses");
               }
           });
       } else {
           Courses.edit(Session.get("_id"), name, (err) => {
               if(err){
                   alert(err.reason);
               } else {
                   alert("Registro editado com sucesso");
                   Router.go("/courses");
               }
           })
       }
   }
});

Template.courses_view.events({
    'submit form'(event, instance) {
        event.preventDefault();

        var name = Template.instance().find("#filter_name").value;
        var createdBy = Template.instance().find("#filter_created_by").value;

        instance.courses.set(Courses.select(name, createdBy));
    },
});