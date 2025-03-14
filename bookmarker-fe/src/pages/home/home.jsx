import React, { useContext, useEffect, useState } from 'react';
import Tags from '../../components/tagsComponent/tagsComponent';
import BookmarkCard from '../../components/card/card';
import { useLocation } from 'react-router-dom';
import { fetchBookmarks } from '../../apis/bookmark';

function Home() {
  const [bookmarksData, setBookmarksData] = useState({ bookmarks: [] });
  const [filteredBookmarks, setFilteredBookmarks] = useState([]);
  const location = useLocation();

  const refreshBookmarks = () => {
    fetchBookmarks()
      .then(res => setBookmarksData(res.data));
  };

  const handleFilteredBookmarks = (bookmarks) => {
    setFilteredBookmarks(bookmarks);
  };

  useEffect(() => {
    fetchBookmarks()
      .then(res => {
        setBookmarksData(res.data);
      })
      .catch(e => console.log(e));
  }, []);

  useEffect(() => refreshBookmarks, []);
  useEffect(() => {
    if (location.pathname === '/') {
      setFilteredBookmarks([]);
    }
  }, [location]);


  if (bookmarksData.bookmarks.length === 0) {
    return (
      <div className="container">
        <h1>Oops you don't have any bookmarks</h1>
        <h5>Create a bookmark to get started: <a href="/bookmarks/new">Add New Bookmark</a></h5>
      </div>
    );
  } else {

    return (


      <div className="container-fluid mt-3">
        <div className="row flex-column flex-lg-row">
          <div className="col-12 col-lg-auto mb-3 mb-lg-0 order-1 order-lg-1" style={{ width: 'auto', maxWidth: '250px' }}>
            <Tags onFilteredBookmarks={handleFilteredBookmarks} />
          </div>
          <div className="col order-2 order-lg-2">
            <div className="row row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-3">
              {(filteredBookmarks.length > 0 ? filteredBookmarks : bookmarksData.bookmarks)?.map(bookmark => (
                <div className="col" key={bookmark._id}>
                  <BookmarkCard
                    id={bookmark._id}
                    title={bookmark.title}
                    url={bookmark.url}
                    refreshBookmarks={refreshBookmarks}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;