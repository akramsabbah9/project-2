const submitCommentHandler = async event => {
    event.preventDefault();

    /* TODO: DOCUMENT.QUERYSELECT THE PROPER ELEMENTS FOR COMMENT TEXT, ETC. */
    // get article_id from url
    const url = window.location.toString().split("/");
    const article_id = url[url.length - 1]; // TODO: change urls to article names?

    // get comment_text from document
    const comment_text; // = document.querySelector("textarea[name='comment-body']").value.trim();

    if (comment_text) {
        const response = await fetch("/api/comments", {
            method: "POST",
            body: JSON.stringify({
                article_id,
                comment_text
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
};

/* TODO: DOCUMENT.QUERYSELECT THE PROPER ELEMENT TO ADD THIS EVENT LISTENER */
// document.querySelector("/*INSERT HERE*/").addEventListener("submit", submitCommentHandler);