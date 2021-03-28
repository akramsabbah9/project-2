let images = document.querySelector("#article-images");

const addNewImage = async event => {
    event.preventDefault();

    // prompt user for image_url
    const image_url = prompt("What is the url of the image you'd like to add?");

    // post the new image
    if (image_url) {
        const url = window.location.toString().split("/");
        const article_id = url[url.length - 2];

        const response = await fetch(`/api/images/`, {
            method: "POST",
            body: JSON.stringify({
                image_url: image_url,
                article_id: article_id
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });

        // if response was successful, render the image_url below the others.
        if (response.ok) {
            const newImage = await response.json();
            images.insertAdjacentHTML("beforeend", `
                <div class="columns">
                    <div class="column">
                        <input class='input' data-id="${newImage.id}" value="${newImage.image_url}" disabled>
                    </div>
                    <div class="column is-2 is-flex is-justify-content-flex-end">
                        <div class="is-grouped">
                            <button class="button is-warning">Edit</button>
                            <button class="button is-danger">Delete</button>
                        </div>
                    </div>
                </div>
            `);
        }
    }
};

images.addEventListener('submit', updateFormHandler);
document.querySelector("#add-img-btn").addEventListener("click", addNewImage);