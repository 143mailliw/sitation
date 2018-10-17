var mongoose = require('mongoose');

var information = {
    name: "Sitation Core",
    author: "Sitation Team",
    version: "Alpha 2",
    routes: [
        {route: '/', router: 'core/index'},
        {route: '/login', router: 'core/login'},
        {route: '/register', router: 'core/register'},
        {route: '/processing/addtopbar', router: 'core/addtopbar'},
        {route: '/processing/deletetopbar', router: 'core/deletetopbar'},
        {route: '/admin/listtopbars', router: 'core/admin/listtopbars'},
        {route: '/admin/addtopbar', router: 'core/admin/addtopbar'}
    ]
};

function databaseSetup() {
    var topbarSchema = new mongoose.Schema({ name: String, url: String, permreq: Number, /*TODO: Implement Permission requirements for certain pages.*/ });
    var Topbar = mongoose.model('Topbar', topbarSchema);
    return;
}

function setup() {

}

module.exports = {information, databaseSetup, setup};