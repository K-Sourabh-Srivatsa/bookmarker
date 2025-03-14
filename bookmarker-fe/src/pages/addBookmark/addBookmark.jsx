import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTE_HOME } from '../../utils/constants';
import AddTagModal from '../../components/addTagModal/addTagModal';
import { addBookmark } from '../../apis/bookmark';
// import api from '../../apis/api';
import { api } from '../../apis/api';

function AddBookmark() {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    description: '',
    tags: [],
  });
  const [tagData, setTagData] = useState({});
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prevState => {
      if (checked) {
        return { ...prevState, tags: [...prevState.tags, value] };
      } else {
        return { ...prevState, tags: prevState.tags.filter(tag => tag !== value) };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      addBookmark(formData);
      navigate(ROUTE_HOME);
    } catch (err) {
      console.error('Error while adding Bookmark:', err);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      url: '',
      description: '',
      tags: []
    });
  };
  const fetchTags = async () => {
    const response = await api.get('/tags')
    setTagData(response.data);
  }

  useEffect(() => {
    api.get('/tags')
      .then(res => {
        setTagData(res.data);
      })
      .catch(err => console.error(err));
  }, []);



  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-10">
          <p className="text-danger">Pressing the <b>Enter key</b> on PCs will add the bookmark</p>
          <h1>Add a new Bookmark</h1>

          <form onSubmit={handleSubmit} onReset={resetForm}>
            <div className="mb-3">
              <label className="form-label"><h3>Title</h3></label>
              <input
                type="text"
                className="form-control"
                placeholder="Example Title (optional)"
                id="title"
                name="title"
                onChange={handleChange}
                value={formData.title}
              />
            </div>

            <div className="mb-3">
              <label className="form-label"><h3>URL</h3></label>
              <input
                type="text"
                className="form-control"
                placeholder="Link you want to bookmark (mandatory)"
                id="url"
                name="url"
                onChange={handleChange}
                value={formData.url}
              />
            </div>

            <div className="mb-3">
              <label className="form-label"><h3>Description</h3></label>
              <textarea
                className="form-control"
                rows="3"
                placeholder="Example Description (optional)"
                id="description"
                name="description"
                onChange={handleChange}
                value={formData.description}
              >
              </textarea>
            </div>


            <div className="mb-3">
              <label className="form-label pb-0 me-5"><h3>Tags</h3></label>

              <div className="form-check">
                {tagData.tags && tagData.tags.map(tagObj => (
                  <div key={tagObj._id}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value={tagObj.tag}
                      id={`tag-${tagObj._id}`}
                      checked={formData.tags.includes(tagObj.tag)}
                      onChange={handleCheckboxChange}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`tag-${tagObj._id}`}
                    >
                      {tagObj.tag}
                    </label>
                  </div>
                ))}
              </div>
              <div className="d-flex justify-content-between mt-2">
                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Add Bookmark</button>
                <input type="reset" className="btn btn-outline-danger" onClick={resetForm} />
                <button className="btn btn-danger" onClick={e => { e.preventDefault(); e.stopPropagation(); navigate('/'); }}>Cancel</button>
              </div>
            </div>
          </form>

          <button className="btn btn-secondary btn-sm p-1" data-bs-toggle="modal" data-bs-target="#addTagModal">Create New Tag</button>
        </div>
      </div>
      <AddTagModal onTagAdded={fetchTags}/>
    </div>
  )
}

export default AddBookmark;