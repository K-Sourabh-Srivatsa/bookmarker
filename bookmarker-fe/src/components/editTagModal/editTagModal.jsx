import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { API_TAG_BY_ID, createDynamicRoute } from '../../utils/constants';

function EditTagModal({ tagId }) {
    const [tag, setTag] = useState({ tag: '' });

    useEffect(() => {
        if (tagId) {
            fetchTagById(tagId);
        }
    }, [tagId]);

    const handleChange = (e) => {
        setTag({ ...tag, tag: e.target.value });
    };

    const handleResetTagInputField = () => {
        setTag({ tag: '' });
    };
    
    const editTag = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(createDynamicRoute(API_TAG_BY_ID, tagId), { tag: tag.tag });
            console.log('Successfully edited the tag');
        } catch (err) {
            return err;
        }
    };

    const fetchTagById = async (id) => {
        try {
            const res = await axios.get(createDynamicRoute(API_TAG_BY_ID, id));
            setTag(res.data);
        } catch (err) {
            return err;
        }
    };

    useEffect(() => {
        if(tagId) fetchTagById(tagId)
        .then('Fetched the pre updated tag')
        .catch(err => console.log(err));
    }, []);

    return (
        <div className="modal fade" id="editTagModal" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="editTagModalLabel">Edit Tag</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={handleResetTagInputField} />
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="newTag" className="form-label">Enter New Tag</label>
                                <input type="text" className="form-control" id="newTag" onChange={handleChange} value={tag.tag} />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleResetTagInputField}>Close</button>
                        <button type="button" className="btn btn-primary" onClick={editTag}>Update Tag</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditTagModal;