import {Courses} from "../models/courses";

if(Meteor.isServer){

    /**
     * This method list all courses in database
     * @author Cassiano Vellames <c.vellames@outlook.com>
     */
    Router.route("/api/courses", {where : "server"})
        .get(function(){

            // Get only the _id and name of courses. Ordered by the name
            const courses = Courses.select(
                {},
                {name : 1},
                {name : 1}
            ).fetch();

            // Set JSON return header and enable CORS.
            this.response.setHeader('Content-Type','application/json');
            this.response.setHeader('Access-Control-Allow-Origin','*');

            // Final response
            this.response.end(JSON.stringify(courses));
        });

}