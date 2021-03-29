// Commenting an Article

async function commentFormHandler(event) {
    event.preventDefault();

    const comment_text = document.querySelector('textarea[name="comment-body"]').value.trim();

    const article_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ]; // TODO: change urls to article names?

    if (comment_text) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                comment_text,
                article_id
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
}

document.getElementById('comment-form').addEventListener('submit', commentFormHandler);