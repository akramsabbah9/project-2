async function searchFormHandler(event) {
    event.preventDefault();
    
    let searchTerm = document.querySelector('input[name="search-bar"]').value;
    searchTerm = `*${searchTerm}*`;

    const response = await fetch(`/api/articles/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        const articles = await response.json();
        const idx = lunr(function() {
            this.field("title");
            this.field("content");

            for (let i = 0; i < articles.length; i++) {
                this.add(articles[i])
            }
        });


        function searchArticles(index, query, articlesArray) {
            const output = index.search(query);
            console.log(output);
            let ret = articlesArray.filter(article => output.find(item => parseInt(item.ref) === article.id));
            return ret;
        }

        const result = searchArticles(idx, searchTerm, articles)
        console.log(result);
        console.log(articles);
    } else {
        alert(response.statusText);
    }
}



document.querySelector('#search-form').addEventListener('submit', searchFormHandler);

const articleTest = [{
    "id": "1",
    "title": "Nuggles is the Queen",
    "content": "Stuff, Stuff, Stuff, Stuff, Stuff, Stuff, Stuff, Stuff, Stuff, Stuff",
    "created_at": "2021-03-23T03:54:01.000Z",
    "updated_at": "2021-03-23T03:54:01.000Z",
    "vote_count": null,
    "comments": [{
            "id": 1,
            "comment_text": "smeg",
            "user_id": 1,
            "article_id": 1,
            "created_at": "2021-03-23T03:54:20.000Z",
            "user": {
                "username": "arnyRimmer"
            }
        },
        {
            "id": 2,
            "comment_text": "smeg",
            "user_id": 2,
            "article_id": 1,
            "created_at": "2021-03-23T04:08:46.000Z",
            "user": {
                "username": "nuggles"
            }
        },
        {
            "id": 3,
            "comment_text": "smeg",
            "user_id": 2,
            "article_id": 1,
            "created_at": "2021-03-23T04:08:47.000Z",
            "user": {
                "username": "nuggles"
            }
        }
    ]
}]