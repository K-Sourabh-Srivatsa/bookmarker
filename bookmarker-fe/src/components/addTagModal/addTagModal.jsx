import React, { useState } from 'react'
import { API_TAGS } from '../../utils/constants';
import { api } from '../../apis/api';

function AddTagModal(props) {

    const [newTag, setNewTag] = useState('');
    
    const handleChange = (e) => {
        setNewTag(e.target.value);
    };

    const addTag = () => {
        api.post(API_TAGS, {
            tag: newTag,
        })
            .then(() => {
                console.log('Successfully added tag');
                setNewTag('');
                props.onTagAdded();
            })
            .catch(err => console.log(err));
    };

    const handleResetTagInputField = () => {
        setNewTag('');
    };

    return (
        <div className="modal fade" id="addTagModal" tabindex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="addTagModalLabel">Create new Tag</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={handleResetTagInputField}/>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label for="exampleInputEmail1" className="form-label">Enter New Tag</label>
                                <input type="text" className="form-control" id="newTag" onChange={handleChange} value={newTag} />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleResetTagInputField}>Close</button>
                        <button type="button" className="btn btn-primary" onClick={addTag}>Add Tag</button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default AddTagModal;