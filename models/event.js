const Joi = require('joi');
const mongoose = require('mongoose');

const EventSchema  = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    start_date: {
        type: Date
    },
    end_date: {
        type: Date
    },
    thumbnail: {
        type: String
    }
});

const Event = mongoose.model('Event', EventSchema);

function validate(event){
    const schema = {
        title: Joi.string().required(),
        thumbnail: Joi.string()
    }

    return Joi.validate(event, schema);
}

exports.Event = Event;
exports.validate = validate;