// helper functions for handlebars
const format_date = date => {
    const newDate = new Date(date);
    return `${newDate.getMonth() + 1}/${newDate.getDate()}/${newDate.getFullYear()}`;
};

const format_time = date => {
    const newDate = new Date(date);
    return `${newDate.getHours() + 1}:${newDate.getMinutes()}`;
};

module.exports = { format_date, format_time };