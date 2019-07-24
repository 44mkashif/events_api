const db = require('../config/db');
const {Event, validate} = require('../models/Event');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const events = await Event.findAll();
    res.send(events);
});

router.get('/:id', async (req, res) => {
    const event = await Event.findAll({
        where: {
            id: req.params.id
        }
    });

    if(!event) return res.status(404).send('The event with the given ID was not found');

    res.send(event);
});

router.post('/', (req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let { title, start_date, end_date, thumbnail } = req.body;

    Event.create({
        title,
        start_date,
        end_date,
        thumbnail
    })
    
    .then(() => res.status(200).send('Event successfully added...'))
    .catch((err) => res.status(404).send('Error: ' + err));
    
});

router.put('/:id', (req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let { title, start_date, end_date, thumbnail } = req.body;

    Event.update({
        title,
        start_date,
        end_date,
        thumbnail
    },{
        where: {
            id: req.params.id
        }
    })
    .then(() => res.status(200).send('Event successfully updated...'))
    .catch(() => res.status(404).send('The event with the given id was not found'));
});

router.delete('/:id', (req, res) => {
    Event.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(() => res.status(200).send('Deleted successfully'))
        .catch(() => res.status(404).send('The Event with the given ID was not found'));
});

module.exports = router;

