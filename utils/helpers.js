// helper functions for handlebars
const format_date = date => {
    const newDate = new Date(date);
    return `${newDate.getMonth() + 1}/${newDate.getDate()}/${newDate.getFullYear()}`;
};

module.exports = { format_date };