async function newFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="article-title"]').value;
    const article_content = document.querySelector('textarea[name="article-content"]').value;
    const imgUrl = document.querySelector("input[name='img-url']").value;

    // error checking: if title/content is null, stop the user from continuing.
    if (!title)
        return alert("You cannot leave the title of this article blank!");
    if (!article_content)
        return alert("You cannot leave the content of this article blank!");

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

        // post image to the database if one was added.
        if (imgUrl) {
            const imagefetch = await fetch(`/api/images`, {
                method: 'POST',
                body: JSON.stringify({
                    image_url: imgUrl,
                    article_id: newArticleId
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!imagefetch.ok) alert("The image you used could not be added.");
        }
        
        document.location.replace(`/article/${newArticleId}`);
    }
    else {
        alert(response.statusText);
    }
}

document.querySelector('.new-article-form').addEventListener('submit', newFormHandler);