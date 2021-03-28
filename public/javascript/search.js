  async function searchFormHandler(event) {
      event.preventDefault();
      let searched = document.querySelector('input[name="search-bar"]').value;

      window.location.href = `/search/${searched}`;
  }


  /* async function getSearch(searchTerm) {
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
              let ret = articlesArray.filter(article => output.find(item => parseInt(item.ref) === article.id));
              return ret;
          }

          const result = searchArticles(idx, searchTerm, articles)
          console.log(result);

          return result;

      } else {
          alert(response.statusText);
      }
  }
*/


  document.querySelector('#search-form').addEventListener('submit', searchFormHandler);