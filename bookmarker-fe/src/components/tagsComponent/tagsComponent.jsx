import React, { useEffect, useState } from 'react';
import AddTagModal from '../addTagModal/addTagModal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faPlus, faCircleMinus } from '@fortawesome/free-solid-svg-icons'
import { useLocation } from 'react-router-dom';
import { api } from '../../apis/api.js';

export const FilteredBookmarksContext = React.createContext();

function Tags({ onFilteredBookmarks }) {
  const [tagsData, setTagsData] = useState({});
  const [selectedTags, setSelectedTags] = useState([]);
  const [filteredBookmarks, setFilteredBookmarks] = useState([]);


  const location = useLocation();
  const tags = new URLSearchParams(location.search).get('tags');

  const fetchTags = async () => {
    api.get('/tags')
      .then(res => {
        setTagsData(res.data);
      })
      .catch(err => console.log(err));
  };

  const refreshTags = () => {
    fetchTags();
  };

  const handleTagClick = (tag, e) => {
    e.stopPropagation();

    setSelectedTags(prevSelectedTags => {
      if (prevSelectedTags.includes(tag)) {
        // Tag is already selected, so remove it
        return prevSelectedTags.filter(selectedTag => selectedTag !== tag);
      } else {
        // Tag is not selected, so add it
        return [...prevSelectedTags, tag];
      }
    });
  };

  const handleApplyFilters = () => {
    api.get(`/bookmarks/filter?tags=${selectedTags}`)
    .then(res => {
        setFilteredBookmarks(res.data);
        onFilteredBookmarks(res.data);
    })
    .catch(err => console.log(err));
  };

  const handleResetFilters = () => {
    setFilteredBookmarks([]);
    setSelectedTags([]);
    onFilteredBookmarks([]);
  }

  useEffect(() => {
    fetchTags();
  }, []);

  return (
    <FilteredBookmarksContext.Provider value={filteredBookmarks}>
      <div className="container ms-0">
        <div className="dropdown ms-0">
          <button className="btn btn-dark btn-sm-sm btn-lg-lg dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            Filter by Tags
          </button>
          <ul className="dropdown-menu">
            <li className="dropdown-item text-primary" data-bs-toggle="modal" data-bs-target="#addTagModal">
              <FontAwesomeIcon icon={faPlus} className="me-1" /><b>Create New Tag</b>
            </li>
            <li><hr className="dropdown-divider" /></li>
            {tagsData.tags && tagsData.tags.map((tag, index) => (
              <li
                key={tag._id}
                className="p-2"
                onClick={(e) => handleTagClick(tag.tag, e)}
                >
                <input
                  type="checkbox"
                  className="me-2"
                  checked={selectedTags.includes(tag.tag)}
                  readOnly // Prevent direct checkbox manipulation
                />
                <label htmlFor="" className="me-1">{tag.tag}</label>
              </li>
            ))}
            <li><hr className="dropdown-divider" /></li>
            <li className="dropdown-item text-success" onClick={handleApplyFilters}>
              <FontAwesomeIcon icon={faFilter} className="me-1" /><b>Apply Filters</b>
            </li>
            <li className="dropdown-item text-danger" onClick={handleResetFilters}>
              <FontAwesomeIcon icon={faCircleMinus} className="me-1" /><b>Reset Filters</b>
            </li>
          </ul>
        </div>
      </div>
      <AddTagModal onTagAdded={fetchTags}/>
    </FilteredBookmarksContext.Provider>
  );
}

export default Tags;