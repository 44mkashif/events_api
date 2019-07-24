const Joi = require('joi');
const mongoose = require('mongoose');

const EventSchema  = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 5
    },
    start_date: {
        type: Date
    },
    end_date: {
        type: Date
    },
    thumbnail: {
        type: String,
        required: true
    }
});

const Event = mongoose.model('Event', EventSchema);

function validate(event){
    const schema = {
        title: Joi.string().min(5).required(),
        thumbnail: Joi.string().required(),
        start_date: Joi.date(),
        end_date: Joi.date()
    }

    return Joi.validate(event, schema);
}

exports.Event = Event;
exports.validate = validate;