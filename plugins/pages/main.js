var mongoose = require('mongoose');
var information = {
    name: "Pages",
    author: "Sitation Team",
    version: "Alpha 2",
    routes: [
        {route: '/admin/addpage', router: 'admin/addpage'},
        {route: '/admin/editpage', router: 'admin/editpage'},
        {route: '/admin/listpages', router: 'admin/listpages'},
        {route: '/processing/addpage', router: 'addpage'},
        {route: '/processing/deletepage', router: 'deletepage'},
        {route: '/processing/editpage', router: 'editpage'},
        {route: '/viewpage', router: 'viewpage'}
    ]
};

function databaseSetup() {
    var pageSchema = new mongoose.Schema({ body: String, name: String, permreq: Number /*TODO: Implement Permission requirements for certain routes.*/ });
    var Page = mongoose.model('Page', pageSchema);
    return;
}

function setup() {

}

module.exports = {information, databaseSetup, setup};