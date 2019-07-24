const Joi = require('joi');
const Sequelize = require('sequelize');
const db = require('../config/db');

const Event = db.define('event', {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        len: [5,100]
    },
    start_date: {
        type: Sequelize.DATE
    },
    end_date: {
        type: Sequelize.DATE
    },
    thumbnail: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    timestamps: false
});

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