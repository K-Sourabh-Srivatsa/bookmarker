import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import BookmarkCard from '../../components/card/card';
// import api from '../../apis/api';
import { api } from '../../apis/api';

function SearchBookmarks() {
  const [bookmarksData, setBookmarksData] = useState({ bookmarks: [] });
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    api.get(`/bookmarks/search?query=${query}`)
      .then(res => {
        setBookmarksData(res.data);
      })
      .catch(e => console.log(e));
  }, [query]);

  useEffect(() => console.log(bookmarksData.bookmarks));

  if (!bookmarksData.bookmarks || bookmarksData.bookmarks.length === 0) {
    return (
      <div className="container mt-3">
        <h1>No bookmarks found for '{query}'</h1>
      </div>
    )
  }
  else return (
    <div className="container mt-3">
        <h5>Search results for '{query}'</h5>
      <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4">
        {bookmarksData.bookmarks && bookmarksData.bookmarks.map(bookmark => (
          <div className="col" key={bookmark._id}>
            <BookmarkCard id={bookmark._id} title={bookmark.title} url={bookmark.url} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchBookmarks;