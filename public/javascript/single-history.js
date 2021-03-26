// when the revert button is clicked, then update the article with that past revision
const revisionButtonHandler = async event => {
    event.preventDefault();

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

document.querySelector("#revise").addEventListener("click", revisionButtonHandler);