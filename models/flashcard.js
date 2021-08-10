const mongoose = require('mongoose');
const Joi = require('joi');

const flashcardSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 2, maxlength: 255},
    description: {type: String, required: true},
    category: {type: String, required: true, minlength: 5, maxlength: 50},
    dateModified: {type: Date, default: Date.now},
});

const Flashcard = mongoose.model('Flashcard', flashcardSchema);

function validateFlashcard(flashcard){
    const schema = Joi.object({
        name: Joi.string().min(2).max(50).required(),
        description: Joi.string().required(),
        category: Joi.string().min(5).max(50).required(),
    });
    return schema.validate(flashcard);
}



exports.Flashcard = Flashcard;
exports.validate = validateFlashcard;
exports.flashcardSchema = flashcardSchema;