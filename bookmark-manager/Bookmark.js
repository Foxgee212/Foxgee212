document.getElementById('bookmarkForm').addEventListener('submit', saveBookmark);

    function saveBookmark(e) {
      e.preventDefault();

      let siteName = document.getElementById('siteName').value;
      let siteUrl = document.getElementById('siteUrl').value;

      if (!siteName || !siteUrl) {
        alert("Please fill in both fields.");
        return;
      }

      let bookmark = {
        name: siteName,
        url: siteUrl
      };

      let stored = localStorage.getItem('bookmarks');
      let bookmarks = stored ? JSON.parse(stored) :[];

      bookmarks.push(bookmark);
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

      document.getElementById('bookmarkForm').reset();
      displayBookmarks();
    }

   

    function displayBookmarks() {
      let bookmarks = localStorage.getItem('bookmarks') 
        ? JSON.parse(localStorage.getItem('bookmarks')) 
        : [];

      let output = '';
      bookmarks.forEach(bookmark => {
        output += `
          <div class="bookmark">
            <span class="delete-btn" onclick="deleteBookmark('${bookmark.url}')">🗑️</span>
            <a href="${bookmark.url}" target="_blank">${bookmark.name}</a>
          </div>
        `;
      });

      document.getElementById('bookmarksList').innerHTML = output;
    }
    function deleteBookmark(url) {
          let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
          bookmarks = bookmarks.filter(bookmark => bookmark.url !== url);
          localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
          displayBookmarks();
        }
    // Load bookmarks on page load
    window.onload = displayBookmarks;