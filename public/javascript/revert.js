// update an article with a past revision's content
const revert = async(article_id, content) => {
    const response = await fetch(`/api/articles/${article_id}`, {
        method: "PUT",
        body: JSON.stringify({
            content: content
        }),
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (response.ok) {
        window.location.href = `/article/${article_id}`;
    } else {
        alert(response.statusText);
    }
};