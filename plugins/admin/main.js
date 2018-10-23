var mongoose = require('mongoose');

var information = {
    name: "Admin",
    author: "Sitation Team",
    version: "Alpha 2",
    routes: [
        {route: '/admin', router: 'admin_main'}
    ]
};

function databaseSetup() {
    var adminPageSchema = new mongoose.Schema({ name: String, link: String, cat: String });
    var adminPage = mongoose.model('adminPages', adminPageSchema);
    return;
}

function setup() {

}

module.exports = {information, databaseSetup, setup};