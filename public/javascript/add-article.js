async function newFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="article-title"]').value;
    const article_content = document.querySelector('textarea[name="article-content"]').value;

    const response = await fetch(`/api/articles`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            content: article_content
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if(response.ok) {
        const newArticle = await response.json();
        const newArticleId = newArticle.article_id;
        
        document.location.replace(`/article/${newArticleId}`);
    }else {
        alert(response.statusText);
    }
}

document.querySelector('.new-article-form').addEventListener('submit', newFormHandler);