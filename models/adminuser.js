const { Console } = require('console');
const mongoose = require('mongoose');
const schema = mongoose.Schema;


let Adminuser = new schema({
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    username: {
        type: String,
    },
    password: {
        type: String,
    },
    confirmpassword: {
        type: String,
    },
    email: {
        type: String,
    },
    mobile: {
        type: Number
    },
    follower: [],
    following: [],
    contribution: Number
});

module.exports = mongoose.model('Adminuser', Adminuser, 'Adminusers');