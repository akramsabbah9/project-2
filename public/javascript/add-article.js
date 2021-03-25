async function newFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="article-title"]').value;
    const article_content = document.querySelector('input[name="article-content"]').value;

    const response = await fetch(`/api/articles`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            article_content
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if(response.ok) {
        document.location.replace('/');
    }else {
        alert(response.statusText);
    }
}

document.querySelector('.new-article-form').addEventListener('submit', newFormHandler);