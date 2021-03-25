// when the revert button in an article's history page is clicked,
// then update the article with that past revision
const revisionButtonHandler = async event => {
    event.preventDefault();

    // if a button was clicked, grab its revision id
    const rev_id = 1;

    // prompt user to revert
    const ans = confirm("Do you wish to revert the article back to this revision?");

    if (ans) {
        // grab content from that revision and update the article
        const response = await fetch(`/api/revisions/${rev_id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const content = await response.json();
        revert(content.article_id, content.changes);
    }
};

// update an article with a past revision's content
const revert = async (article_id, content) => {

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
        document.location.replace(`/article/${article_id}`);
    }
    else {
        alert(response.statusText);
    }
};

document.querySelector("#revision-history").addEventListener("click", revisionButtonHandler);