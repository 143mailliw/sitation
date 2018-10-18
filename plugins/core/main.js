var mongoose = require('mongoose');

var information = {
    name: "Sitation Core",
    author: "Sitation Team",
    version: "Alpha 2",
    routes: [
        {route: '/', router: 'index'},
        {route: '/login', router: 'login'},
        {route: '/register', router: 'register'},
        {route: '/processing/addtopbar', router: 'addtopbar'},
        {route: '/processing/deletetopbar', router: 'deletetopbar'},
        {route: '/admin/listtopbars', router: 'admin/listtopbars'},
        {route: '/admin/addtopbar', router: 'admin/addtopbar'}
    ]
};

function databaseSetup() {
    var topbarSchema = new mongoose.Schema({ name: String, url: String, permreq: Number, /*TODO: Implement Permission requirements for certain routes.*/ });
    var Topbar = mongoose.model('Topbar', topbarSchema);
    return;
}

function setup() {

}

module.exports = {information, databaseSetup, setup};