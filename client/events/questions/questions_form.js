import {Questions} from "../../../models/questions";
import {FormHelper} from "../../../utils/form_helper";

Template.questions_form.events({

    /**
     * Push a new answer in array of answers
     * @author Cassiano Vellames <c.vellames@outlook.com>
     * @param event
     * @param instance
     */
   "click #new-answers" : (event, instance) => {
        event.preventDefault();
        var answers = instance.answers.get();
        answers.push({
            answer : "",
            correct: false
        });

        instance.answers.set(answers);
   },

    /**
     * Remove an answer in array of answers
     * @author Cassiano Vellames <c.vellames@outlook.com>
     * @param event
     * @param instance
     */
    "click [data-action=remove-answer]" : (event, instance) => {
       event.preventDefault();
       const index = $(event.currentTarget).parent().parent().parent().attr("data-index");
       var answers = instance.answers.get();

       answers.splice(index,1);
       instance.answers.set(answers);
    },

    /**
     * Data bind in text area to put the current value of answer in text area
     * @author Cassiano Vellames <c.vellames@outlook.com>
     * @param event
     * @param instance
     */
    "input #answers textarea" : (event, instance) => {
        event.preventDefault();
        const answerIndex = $(event.currentTarget).parent().parent().attr("data-index");
        var answers = instance.answers.get();
        answers[answerIndex].answer = $(event.currentTarget).val();

        instance.answers.set(answers);
    },

    /**
     * Data bind in radio button to put the current value of attr "correct" in array
     * @author Cassiano Vellames <c.vellames@outlook.com>
     * @param event
     * @param instance
     */
    "click #answers input[type=radio]" : (event, instance) => {
        const answerIndex = $(event.currentTarget).parent().parent().parent().parent().attr("data-index");
        var answers = instance.answers.get();
        var correct = $(event.currentTarget).val();


        if(numberOfCorrectsAnswers(answers) > 0 && JSON.parse(correct)){
            alert(TAPi18n.__("questions_alert_only_one_correct_answer"));
            return false;
        }

        answers[answerIndex].correct = JSON.parse(correct);

        instance.answers.set(answers);
    },

    /**
     * Add a new question in database
     * @author Cassiano Vellames <c.vellames@outlook.com>
     * @param event
     * @param instance
     */
    "submit form" : (event, instance) => {

        // Validate answers:
        const answers = instance.answers.get();

        // Number of answers must be more than 1
        if(answers.length <= 1){
            alert(TAPi18n.__("questions_alert_minimal_answer"));
            return false;
        }

        // Check number of corrects answers
        if(numberOfCorrectsAnswers(answers) == 0){
            alert(TAPi18n.__("questions_alert_zero_correct_answer"));
            return false;
        }

        const coursesList = instance.data.courses.fetch();
        // Add in collection
        const question = $("#question").val();
        const course = coursesList[FormHelper.getIdIndexInCollection(coursesList, $("#course").val())];

        // Insert or edit document, depending on the mode of form
        if(instance.data.newMode){
            Questions.new(question, course, answers, (err,res) => {
                if(err){
                    alert(TAPi18n.__('register_insert_fail'));
                } else {
                    alert(TAPi18n.__('register_insert_success'));
                    Router.go("/questions");
                }
            });
        }
        else if(instance.data.editMode){
            const questionId = instance.data.question._id;
            Questions.edit(questionId,question, course, answers, (err,res) => {
                if(err){
                    alert(TAPi18n.__('register_update_fail'));
                } else {
                    alert(TAPi18n.__('register_update_success'));
                    Router.go("/questions");
                }
            });
        }

        event.preventDefault();
    }
});

/**
 * @param answers Answers array
 * @author Cassiano Vellames <c.vellames@outlook.com>
 * @returns {number} Returns the actual number of corrects answers in question
 */
const numberOfCorrectsAnswers = (answers) => {
    var correctAnswers = 0;
    for(var i =0 ; i < answers.length; i++){
        if(answers[i].correct){
            correctAnswers++;
        }
    }
    return correctAnswers;
};