const {Event, validate} = require('../models/event');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const events = await Event.find().sort('start_date');
    res.send(events);
});

router.get('/:id', async (req, res) => {
    const event = await Event.findById(req.params.id);

    if(!event) return res.status(404).send('The event with the given ID was not found');

    res.send(event);
});

router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let event = new Event({
        title: req.body.title,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        thumbnail: req.body.thumbnail
    });

    event = await event.save();

    res.send(event);
});

router.put('/:id', async (req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const event = await Event.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        thumbnail: req.body.thumbnail
    }, { new: true });

    if(!event) return res.status(404).send('The event with the given id was not found');

    res.send(event);
});

router.delete('/:id', async (req, res) => {
    const event = await Event.findByIdAndRemove(req.params.id);

    if(!event) return res.status(404).send('The Event with the given ID was not found');

    res.send(event);
});

module.exports = router;

// POST
//return 400 bad request if title is not included
//return 200 if valid request

//PUT
//return 400 bad request if title is not included
//return 404 if the event with the given ID was not found
//return 200 if valid request


//GET:id
//return 404 if the event with the given ID was not found
//return 200 if valid request


//DELETE
//return 404 if the event with the given ID was not found
//return 200 if valid request


