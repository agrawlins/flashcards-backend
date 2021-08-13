const {Flashcard, validateFC} = require('../models/flashcard');
const {Deck, validateD} = require('../models/flashcard');
const express = require('express');
const router = express.Router();


//Deck
router.post('/', async (req, res) => {
    try{
        const{error} = validateD(req.body);
        if(error) return res.status(400).send(error);
        const deck = new Deck({
            title: req.body.title,
            category: req.body.category,
            cards: req.body.answer
        });
        await deck.save();
        return res.send(deck);
    }catch(ex){
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

router.get('/', async (req, res) => {
    try{
        const deck = await Deck.find();
        return res.send(deck);
    }catch (ex) {
        return res.status(500).sendStatus(`Internal Server Error: ${ex}`);
    }
});

router.get('/:id', async (req, res) => {
    try{
        const deck = await Deck.findById(req.params.id);
        if(!deck){
        return res.status(400).send(`The deck with id "${req.params.id}" does not exist.`);
    }
    return res.send(deck);
    }catch (ex){
        return res.status(500).sendStatus(`Internal Server Error: ${ex}`);
    }
});

router.put('/:id', async (req, res) => {
    try{
        const {error} = validateD(req.body);
        if (error) return res.status(400).send(error);
        
        const deck = await Deck.findByIdAndUpdate(
            req.params.id,
            {
                title: req.body.title,
                category: req.body.category,
                cards: req.body.answer
            },
            {new: true}
        );
        
        if (!deck)
        return res.status(400).send(`The deck with id "${req.params.id}" does not exist.`);
        await deck.save();
        
        return res.send(deck);
    }catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

router.delete('/:id', async (req, res) => {
    try{
        const deck = await Deck.findByIdAndRemove(req.params.id);
        if(!deck)
        return res.status(400).send(`The deck with id "${req.params.id}" does not exist.`);
        return res.send(deck);
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
}); 



//Flashcards
router.post('/', async (req, res) => {
    try{
        const{error} = validateFC(req.body);
        if(error) return res.status(400).send(error);
        const flashcard = new Flashcard({
            name: req.body.name,
            question: req.body.question,
            category: req.body.category,
            answer: req.body.answer,
            explanation: req.body.explanation,
        });
        await flashcard.save();
        return res.send(flashcard);
    }catch(ex){
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

router.get('/', async (req, res) => {
    try{
        const deck = await Flashcard.find();
        return res.send(deck);
    }catch (ex) {
        return res.status(500).sendStatus(`Internal Server Error: ${ex}`);
    }
});

router.get('/:id', async (req, res) => {
    try{
        const flashcard = await Flashcard.findById(req.params.id);
        if(!flashcard){
        return res.status(400).send(`The flashcard with id "${req.params.id}" does not exist.`);
    }
    return res.send(flashcard);
    }catch (ex){
        return res.status(500).sendStatus(`Internal Server Error: ${ex}`);
    }
});

router.put('/:id', async (req, res) => {
    try{
        const {error} = validateFC(req.body);
        if (error) return res.status(400).send(error);
        
        const flashcard = await Flashcard.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                question: req.body.question,
                category: req.body.category,
                answer: req.body.answer,
                explanation: req.body.explanation,
            },
            {new: true}
        );
        
        if (!flashcard)
        return res.status(400).send(`The flashcard with id "${req.params.id}" does not exist.`);
        await flashcard.save();
        
        return res.send(flashcard);
    }catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

router.delete('/:id', async (req, res) => {
    try{
        const flashcard = await Flashcard.findByIdAndRemove(req.params.id);
        if(!flashcard)
        return res.status(400).send(`The flashcard with id "${req.params.id}" does not exist.`);
        return res.send(flashcard);
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});


module.exports = router;