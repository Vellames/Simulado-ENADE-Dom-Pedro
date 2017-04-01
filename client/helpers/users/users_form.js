/**
 * This helper is used to get the courses of the user and show in the screen
 * Is used a reactive var to show the info
 */

/**
* Create the variable to store the courses
 * @author Cassiano Vellames <c.vellames@outlook.com>
*/
Template.users_form.onCreated(function (){
    this.userCourses = new ReactiveVar([]);
});

/**
 * When the page is rendered the data of template is recovery
 * The courses are sent to the reactive variable that are used for the screen to show the values
 * @author Cassiano Vellames <c.vellames@outlook.com>
 */
Template.users_form.onRendered(function(){
    const courses = Template.instance().data.user.profile.courses;
    Template.instance().userCourses.set(courses);
});

/**
 * The return of answers variable will be always the value set in the template instance
 * @author Cassiano Vellames <c.vellames@outlook.com>
 */
Template.users_form.helpers({
   userCourses: () => {
        return Template.instance().userCourses.get();
   }
});
