async function deleteFormHandler(event) {
    event.preventDefault();

    const url = window.location.toString().split("/");
    const id = url[url.length - 2];

    // prompt user to delete
    const ans = confirm("Are you sure you wish to delete this article?");

    if (ans) {
        const response = await fetch(`/api/articles/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if(response.ok){
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('#delete-btn').addEventListener('click', deleteFormHandler);