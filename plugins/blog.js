var mongoose = require('mongoose');

var information = {
    name: "Blog",
    author: "Sitation Team",
    version: "Alpha 2",
    routes: [
        {route: '/admin/addblogpost', router: 'blog/admin/addblogpost'},
        {route: '/admin/editblogpost', router: 'blog/admin/editblogpost'},
        {route: '/admin/listposts', router: 'blog/admin/listposts'},
        {route: '/processing/addpost', router: 'blog/addpost'},
        {route: '/processing/deletepost', router: 'blog/deletepost'},
        {route: '/processing/editpost', router: 'blog/editpost'},
        {route: '/viewpost', router: 'blog/viewpost'}
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

function afterSetup() { }

module.exports = {information, databaseSetup, setup, afterSetup};