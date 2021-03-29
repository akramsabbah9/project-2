// For Revisions and Reverting Articles

// when the revert button in an article's history page is clicked,
// then update the article with that past revision
const revisionButtonHandler = async event => {
    event.preventDefault();

    // if the view button was clicked, go to its corresponding link
    let data_link = event.target.getAttribute("data-link");
    if (data_link) {
        window.location.href = `/revision/${data_link}`;
        return;
    }

    // if the revert button was clicked, grab its data id, otherwise return
    let rev_id = event.target.getAttribute("data-id");
    if (!rev_id) return;

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

// Allows a user to Go Back to the Article they were looking at before the Revision History
function goBack() {
    window.history.back();
}

document.querySelector("#go-back").addEventListener("click", goBack);
document.querySelector("#revision-history").addEventListener("click", revisionButtonHandler);