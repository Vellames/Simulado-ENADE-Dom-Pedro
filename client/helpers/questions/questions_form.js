Template.questions_form.onCreated(function (){
    this.answers = new ReactiveVar([]);
});

Template.questions_form.onRendered(function(){

    const data = Template.instance().data;

    const courseId =  data.question.course._id;
    $("#course").val(courseId);

    const answers = data.question.responses;
    Template.instance().answers.set(answers);
});

Template.questions_form.helpers({
    answers: () => {
        return Template.instance().answers.get();
    }
});
