async function updateFormHandler(event) {
    event.preventDefault();

    const content = document.querySelector('textarea[name="content"]').value;

    const url = window.location.toString().split("/");
    const id = url[url.length - 2];

    console.log(content);

    const response = await fetch(`/api/articles/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            content: content
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if(response.ok){
        document.location.replace(`/article/${id}`);
    } else {
        alert(response.statusText);
    }
}

document.querySelector('#update-form').addEventListener('submit', updateFormHandler);