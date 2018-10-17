var mongoose = require('mongoose');
var information = {
    name: "Pages",
    author: "Sitation Team",
    version: "Alpha 2",
    routes: [
        {route: '/admin/addpage', router: 'pages/admin/addpage'},
        {route: '/admin/editpage', router: 'pages/admin/editpage'},
        {route: '/admin/listpages', router: 'pages/admin/listpages'},
        {route: '/processing/addpage', router: 'pages/addpage'},
        {route: '/processing/deletepage', router: 'pages/deletepage'},
        {route: '/processing/editpage', router: 'pages/editpage'},
        {route: '/viewpage', router: 'pages/viewpage'}
    ]
};

function databaseSetup() {
    var pageSchema = new mongoose.Schema({ body: String, name: String, permreq: Number /*TODO: Implement Permission requirements for certain pages.*/ });
    var Page = mongoose.model('Page', pageSchema);
    return;
}

function setup() {

}

function afterSetup() { }

module.exports = {information, databaseSetup, setup, afterSetup};