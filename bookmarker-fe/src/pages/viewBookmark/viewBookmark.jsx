import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ROUTE_EDIT_BOOKMARK, createDynamicRoute } from '../../utils/constants';
import { deleteBookmark, fetchBookmarkById } from '../../apis/bookmark';
import { copyToClipboard, ensureHttps } from '../../utils/utilFunctions';

function ViewBookmark() {
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();

  const [bookmarkDetails, setBookmarkDetails] = useState({});

  useEffect(() => {
    fetchBookmarkById(id)
      .then(res => {
        setBookmarkDetails(res.data)
        return res;
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      {bookmarkDetails.bookmark &&
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-12">
              <div className="card mt-5 mx-md-0 mx-3">
                <div className="card-header text-center">
                  <h2>{bookmarkDetails.bookmark.title}</h2>
                </div>
                <div className="card-body">
                  <h5 className="card-title">URL:</h5>
                  <p className="card-text">{bookmarkDetails.bookmark.url}</p>
                  <h5 className="card-title">Description:</h5>
                  <p>{bookmarkDetails.bookmark.description}</p>
                </div>
                <div className="card-footer text-body-secondary">
                  <h5>Tags:</h5>
                  <div className="d-flex">
                    <ul className="list-group d-inline-flex p-2">
                      {bookmarkDetails.bookmark.tags.map((tag, index) => (
                        <li className="list-group-item px-3 py-1" key={index}>#{tag}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container-fluid p-0">
            <div className="row justify-content-start">
              <div className="col-12 col-lg-6">
                <div className="d-flex flex-wrap gap-4 mt-4">
                  <a href={ensureHttps(bookmarkDetails.bookmark._id)} target="_blank" rel="noopener noreferrer" className="flex-grow-1 flex-lg-grow-0">
                    <button className="btn btn-success w-100">Visit Link</button>
                  </a>
                  <a className="flex-grow-1 flex-lg-grow-0">
                    <button className="btn btn-primary w-100" onClick={e => copyToClipboard(bookmarkDetails.bookmark.url, e)}>Copy Link</button>
                  </a>
                  <a href={createDynamicRoute(ROUTE_EDIT_BOOKMARK, bookmarkDetails.bookmark._id)} className="flex-grow-1 flex-lg-grow-0">
                    <button className="btn btn-warning w-100">Edit</button>
                  </a>
                  <a onClick={e => {
                    deleteBookmark(bookmarkDetails.bookmark._id, e);
                    navigate('/');
                  }} className="flex-grow-1 flex-lg-grow-0">
                    <button className="btn btn-danger w-100">Delete</button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </div>

  )
}

export default ViewBookmark;