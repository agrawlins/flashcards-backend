const mongoose = require('mongoose');
const Joi = require('joi');


//Flashcards
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


//Decks
const deckSchema = new mongoose.Schema({
    title: {type: String, required: true},
    category: {type: String, required: true, minlength: 5, maxlength: 50},
    cards: [flashcardSchema],
    dateModified: {type: Date, default: Date.now},
});

const Deck = mongoose.model('Deck', deckSchema);

function validateDeck(deck){
    const schema = Joi.object({
        title: Joi.string().min(5).max(50).required(),
        category: Joi.string().min(5).max(50).required(),
        cards: Joi.array(),
    });
    return schema.validate(deck);
}

exports.Flashcard = Flashcard;
exports.validateFC = validateFlashcard;
exports.flashcardSchema = flashcardSchema;

exports.Deck = Deck;
exports.validateD = validateDeck;
exports.deckSchema = deckSchema;