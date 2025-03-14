import React, { useEffect, useState } from 'react';
// import api from '../../apis/api';
import { api } from '../../apis/api';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTE_HOME } from '../../utils/constants';

function EditBookmark() {
  const params = useParams();
  const { id } = params;

  const navigate = useNavigate();
  const [formData, setFormData] = useState({ tags: [] });
  const [tagData, setTagData] = useState({});

  useEffect(() => {
    api.get(`/bookmarks/${id}`)
      .then(res => {
        setFormData({
          ...res.data.bookmark,
          tags: res.data.bookmark.tags || []
        });
      })
      .catch(err => console.error('Error fetching bookmark:', err));

    api.get('/tags')
      .then(res => {
        setTagData(res.data);
      })
      .catch(err => console.error('Error fetching tags:', err));
  }, [id]);

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
        const { _id, ...updateData } = formData;
        const response = await api.put(`/bookmarks/${_id}`, updateData);
        navigate(ROUTE_HOME);
    } catch (err) {
        console.error('Error while updating Bookmark:', err);
    }
};

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-10">
          <p className="text-danger">Pressing the <b>Enter key</b> on PCs will update the bookmark</p>
          <h1>Edit your Bookmark</h1>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label"><h3>Title</h3></label>
              <input
                type="text"
                className="form-control"
                placeholder="Example Title (optional)"
                id="title"
                name="title"
                onChange={handleChange}
                value={formData.title || ''}
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
                value={formData.url || ''}
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
                value={formData.description || ''}
              >
              </textarea>
            </div>

            <div className="mb-3">
              <label className="form-label pb-0"><h3>Tags</h3></label>

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
                <button type="submit" className="btn btn-primary">Update Bookmark</button>
                <button className="btn btn-danger" onClick={(e) => { e.preventDefault(); navigate(ROUTE_HOME); }}>Cancel</button>
              </div>
            </div>
          </form>

        </div>
      </div>
    </div>
  )
}

export default EditBookmark;
