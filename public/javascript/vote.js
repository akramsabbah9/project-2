// upvote and downvote an article.

// TODO: on startup get vote info about this page to style the upvote/downvote buttons

const upvoteHandler = async event => {
    event.preventDefault();

    // TODO: conditional logic to make this reset your vote if you already upvoted

    // get article_id from url
    const url = window.location.toString().split("/");
    const id = url[url.length - 1];

    // upvote the article
    const response = await fetch("/api/articles/vote", {
        method: "PUT",
        body: JSON.stringify({
            value: 1,
            article_id: id
        }),
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (response.ok) {
        document.location.reload();
    }
    else {
        alert(response.statusText);
    }
};

const downvoteHandler = async event => {
    event.preventDefault();

    // TODO: conditional logic to make this reset your vote if you already upvoted

    // get article_id from url
    const url = window.location.toString().split("/");
    const id = url[url.length - 1];

    // downvote the article
    const response = await fetch("/api/articles/vote", {
        method: "PUT",
        body: JSON.stringify({
            value: -1,
            article_id: id
        }),
        headers: {
            "Content-Type": "application/json"
        }
    });
    
    if (response.ok) {
        document.location.reload();
    }
    else {
        alert(response.statusText);
    }
};

/* TODO: DOCUMENT.QUERYSELECT THE PROPER ELEMENTS TO ADD THESE EVENT LISTENERS */
// document.querySelector("/*INSERT HERE*/").addEventListener("click", upvoteHandler);
// document.querySelector("/*INSERT HERE*/").addEventListener("click", downvoteHandler);