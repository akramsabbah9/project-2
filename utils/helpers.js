// helper functions for handlebars
const format_date = date => {
    const newDate = new Date(date);
    return `${newDate.getMonth() + 1}/${newDate.getDate()}/${newDate.getFullYear()}`;
};

const format_time = date => {
    const newDate = new Date(date);
    const hours = newDate.getHours();

    return `${(hours + 11) % 12 + 1}:${newDate.getMinutes()} ${(hours < 12) ? "AM" : "PM"}`;
};

module.exports = { format_date, format_time };