var moment = require('moment');
module.exports = {
    date_format: date => {
        return ` ${moment(date).format("llll").toString()}`;
        // format a Date object into the preffered display format using moment.js

    },
    word_format: (word, amount) => {
        if (amount !== 1) {
            return `${word}s`;
        }
        return word;
        // adapts a word to be plural or singular based on the quantity
    }
}