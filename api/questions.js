import {Questions} from "../models/questions";

if(Meteor.isServer){

    Router.route("/api/questions/:course/:limit", {where : "server"})
        .get(function(){

            // Get params variables
            const course = this.params.course;
            var limit = this.params.limit;

            // Questions of this courses
            const questions = Questions.select({"course._id" : course}, {name : 1}).fetch();

            //Check limit
            if(limit > questions.length){
                limit = questions.length;
            }

            // Add possible indexes array
            var possibleIndexes = [];
            for(var i = 0; i < questions.length; i++){
                possibleIndexes.push(i);
            }

            // Put questions in sendQuestions variable
            var index = 0;
            var sendQuestions = [];
            for(var i = 0; i < limit; i++){
                index = Math.floor(Math.random() * possibleIndexes.length);
                sendQuestions.push(questions[possibleIndexes[index]]);
                possibleIndexes.splice(index, 1);
            }

            this.response.setHeader('Content-Type','application/json');
            this.response.setHeader('Access-Control-Allow-Origin','*');
            this.response.end(JSON.stringify(sendQuestions));
        });

}