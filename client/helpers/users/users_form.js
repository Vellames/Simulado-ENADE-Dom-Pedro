Template.users_form.onCreated(function (){
    this.userCourses = new ReactiveVar([]);
});

Template.users_form.onRendered(function(){
    const courses = Template.instance().data.user.profile.courses;
    Template.instance().userCourses.set(courses);
});

Template.users_form.helpers({
   userCourses: () => {
        return Template.instance().userCourses.get();
   }
});
