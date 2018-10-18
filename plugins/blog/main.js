var mongoose = require('mongoose');

var information = {
    name: "Blog",
    author: "Sitation Team",
    version: "Alpha 2",
    routes: [
        {route: '/admin/addblogpost', router: 'admin/addblogpost'},
        {route: '/admin/editblogpost', router: 'admin/editblogpost'},
        {route: '/admin/listposts', router: 'admin/listposts'},
        {route: '/processing/addpost', router: 'addpost'},
        {route: '/processing/deletepost', router: 'deletepost'},
        {route: '/processing/editpost', router: 'editpost'},
        {route: '/viewpost', router: 'viewpost'}
    ]
};

function databaseSetup() {
    var postSchema = new mongoose.Schema({ body: String, name: String, author: String, date: String });
    var Post = mongoose.model('Post', postSchema);
    var commentSchema = new mongoose.Schema({ body: String, author: String, date: String, postid: String });
    var Comment = mongoose.model('Comment', commentSchema);
    return;
}

function setup() {

}

module.exports = {information, databaseSetup, setup};