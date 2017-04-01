import {Questions} from "../models/questions";

if(Meteor.isServer){

    /**
     * This method return random questions of a course
     * @param :course Id of course
     * @param :limit Limit of questions to get
     * @author Cassiano Vellames <c.vellames@outlook.com>
     */
    Router.route("/api/questions/:course/:limit", {where : "server"})
        .get(function(){

            // Get params variables
            const course = this.params.course;
            var limit = this.params.limit;

            // Questions of this courses
            const questions = Questions.select(
                {"course._id" : course},
                {},
                {question : 1, responses: 1},
            ).fetch();

            //Check if limit is bigger than the number of questions of the course in database
            if(limit > questions.length){
                limit = questions.length;
            }

            /*
                Logic to do the return random questions
             */

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

            // Set JSON return header and enable CORS
            this.response.setHeader('Content-Type','application/json');
            this.response.setHeader('Access-Control-Allow-Origin','*');

            // Send the response
            this.response.end(JSON.stringify(sendQuestions));
        });

}