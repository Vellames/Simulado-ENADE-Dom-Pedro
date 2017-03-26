Router.route("/questions", function(){
    this.render("questions_view");
});

Router.route("/questions/new", function(){
    this.render("questions_form");
});

Router.route("/question/:_id", function(){
    this.render("questions_form");
});