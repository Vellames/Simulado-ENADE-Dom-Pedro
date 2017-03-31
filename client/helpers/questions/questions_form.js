/**
 * This helper is used to get the answers of the question and show in the screen
 * Is used a reactive var to show the info
 */

/**
 * Create the variable to store the answers
 */
Template.questions_form.onCreated(function (){
    this.answers = new ReactiveVar([]);
});

/**
 * When the page is rendered the data of template is recovery
 * The data contains the id of selected course, this value is used to set the initial value of select
 * The answers are sent to the reactive variable that are used for the screen to show the values
 * @author Cassiano Vellames <c.vellames@outlook.com>
 */
Template.questions_form.onRendered(function(){

    const data = Template.instance().data;

    const courseId =  data.question.course._id;
    $("#course").val(courseId);

    const answers = data.question.responses;
    Template.instance().answers.set(answers);
});

/**
 * The return of answers variable will be always the value set in the template instance
 */
Template.questions_form.helpers({
    answers: () => {
        return Template.instance().answers.get();
    }
});
