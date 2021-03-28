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