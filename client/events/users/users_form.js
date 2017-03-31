import {FormHelper} from "../../../utils/form_helper"

Template.users_form.events({

    /**
     * Add a new course choose in DOM
     * @author Cassiano Vellames <c.vellames@outlook.com>
     * @param event
     * @param instance
     */
    "click [data-action=add-user-course]" : (event, instance) => {

        // Get work variables
        const userCourses = instance.userCourses.get();
        const courses = Session.get("edit_user_courses");
        const courseId = $("select#courses").val();

        // Reset select value
        $("select#courses").val("");

        // Verify if value already exists in userCourses
        if(FormHelper.getIdIndexInCollection(userCourses, courseId) > -1){
            alert(TAPi18n.__("user_course_already_pushed"));
            return false;
        }

        // Push the course selected in reactive var
        userCourses.push(courses[FormHelper.getIdIndexInCollection(courses, courseId)]);
        instance.userCourses.set(userCourses);

        event.preventDefault();
    },

    /**
     * Remove a course choose in DOM
     * @author Cassiano Vellames <c.vellames@outlook.com>
     * @param event
     * @param instance
     */
    "click [data-action=delete-user-course]" : (event, instance) => {
        var userCourses = instance.userCourses.get();

        // Get the id of course to remove
        const inputCourseId = $(event.currentTarget).parent().parent().find("input").attr("data-id");

        // Get index of id selected in reactive courses array
        userCourses.splice(FormHelper.getIdIndexInCollection(userCourses, inputCourseId), 1);
        instance.userCourses.set(userCourses);

        event.preventDefault();
    },

    /**
     * Edit the courses of an user
     * @author Cassiano Vellames <c.vellames@outlook.com>
     * @param event
     * @param instance
     */
    "submit form": (event, instance) => {
        event.preventDefault();

        const userCourses = instance.userCourses.get();
        Meteor.users.edit(instance.data.user._id, userCourses, (err,res) => {
            if(err){
                alert(TAPi18n.__('register_update_fail'));
            } else {
                alert(TAPi18n.__('register_update_success'));
                Router.go("/users");
            }
        });
    }

});