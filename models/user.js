const mongoose = require('mongoose');
const Joi = require('Joi');
const {flashcardSchema} = require('./flashcard');

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    isGoldMember: {type: Boolean, default: false},
    deckCollection: {type: [flashcardSchema], default: []},
});

const User = mongoose.model('User', userSchema);

function validateUser(user){
    const schema = Joi.object({
        name: Joi.string().required(),
    });
    return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;