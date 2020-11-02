const mongoose = require('mongoose');
const schema = mongoose.Schema;


let Questionanswer = new schema({
    asker: String,
    time: String,
    title: String,
    question: String,
    tags: [],
    answers: [],
});

module.exports = mongoose.model('Questionanswer', Questionanswer, 'Questionanswers');