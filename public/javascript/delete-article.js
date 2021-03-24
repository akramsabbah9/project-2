async function deleteFormHandler(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/articles/${id}`, {
        method: 'DELETE',
        body: JSON.stringify({
            post_id: id
        }),
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

// not entirely sure what the ID for the delete button will be so here's a placeholder
document.querySelector('.delete-article-btn').addEventListener('click', deleteFormHandler);