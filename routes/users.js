const {User} = require('../models/user');
const {Flashcard, validate} = require('../models/flashcard');
const express = require('express');
const router = express.Router();

router.post('/:userId/deckCollection/:flashcardId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) return res.status(400).send(`The user with id "${req.params.userId}" does not exist.`);

        const flashcard = await Flashcard.findById(req.params.flashcardId);
        if(!flashcard) return res.status(400).send(`The flashcard with id "${req.params.flashcardId}" does not exist`);

        user.deckCollection.push(flashcard);

        await user.save();
        return res.send(user.deckCollection);
    }catch(ex){
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

router.put('/:userId/deckCollection/:flashcardId', async (req, res) =>{
    try{
        const {error} = validate(req.body);
        if (error) return res.status(400).send(error);

        const user = await User.findById(req.params.userId);
        if(!flashcard) return res.status(400).send(`The flashcard with id "${req.params.flashcardId}" does not exist in ${req.params.userId}'s deck collection.`);

        flashcard.name = req.body.name;
        flashcard.description = req.body.description;
        flashcard.category = req.body.category;
        flashcard.dateModified = Date.now();

        await user.save();
        return res.send(flashcard);
    }catch(ex){
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

router.delete('/:userId/deckCollection/:flashcardId', async (req, res) =>{
    try{
        const user = await User.findById(req.params.userId);
        if (!flashcard) return res.status(400).send(`The flashcard with id "${req.params.flashcardId}" does not exist in ${req.params.userId}'s deck collection.`);

        flashcard = await flashcard.remove();

        await user.save();
        return res.send(flashcard);
    }catch(ex){
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

module.exports = router;