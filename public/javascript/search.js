// Search the database for something specific

async function searchFormHandler(event) {
    event.preventDefault();
    let searched = document.querySelector('input[name="search-bar"]').value;

    window.location.href = `/search/${searched}`;
}


document.querySelector('#search-form').addEventListener('submit', searchFormHandler);