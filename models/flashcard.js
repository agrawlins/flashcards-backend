const mongoose = require('mongoose');
const Joi = require('joi');

const flashcardSchema = new mongoose.Schema({
    name: {type: Number, required: true},
    question: {type: String, required: true},
    category: {type: String, required: true, minlength: 5, maxlength: 50},
    answer: {type: String, required: true, minlength: 2, maxlength: 500},
    explanation: {type: String, required: true, minlength: 10, maxlength: 500},
    dateModified: {type: Date, default: Date.now},
});

const Flashcard = mongoose.model('Flashcard', flashcardSchema);

function validateFlashcard(flashcard){
    const schema = Joi.object({
        name: Joi.number().required(),
        question: Joi.string().min(5).max(500).required(),
        category: Joi.string().min(5).max(50).required(),
        answer: Joi.string().min(1).max(500).required(),
        explanation: Joi.string().min(5).max(500).required(),
    });
    return schema.validate(flashcard);
}



exports.Flashcard = Flashcard;
exports.validate = validateFlashcard;
exports.flashcardSchema = flashcardSchema;