import {Courses} from "../models/courses";

if(Meteor.isServer){

    Router.route("/api/courses", {where : "server"})
        .get(function(){
            const courses = Courses.select({}, {name : 1}).fetch();
            this.response.setHeader('Content-Type','application/json');
            this.response.setHeader('Access-Control-Allow-Origin','*');
            this.response.end(JSON.stringify(courses));
        });

}