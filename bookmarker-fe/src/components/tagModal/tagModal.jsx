import React, { useState, useEffect } from 'react';
import { addTag, editTag, fetchTagById } from '../../apis/tags';

function TagModal({ mode, tagId, onTagChange }) {

    const [tag, setTag] = useState({ tag: '' });

    const handleFetchTagById = async (id) => {
        try {
            const response = await fetchTagById(id);
            setTag({tag: response.tag.tag});
        } catch (err) {
            console.log(err);
        }
    };

    const handleAddTag = async (tagValue) => {
        try {
            await addTag(tagValue);
            onTagChange();
            handleResetTagInputField();
        } catch (err) {
            console.log(err);
        }
    };

    const handleEditTag = async (tag, tagId, e) => {
        try {
            await editTag(tag, tagId, e);
            onTagChange();
            handleResetTagInputField();
        } catch (err) {
            console.log(err);
        }
    };

    const handleChange = (e) => {
        setTag({ ...tag, tag: e.target.value });
    };

    const handleResetTagInputField = () => {
        setTag({ tag: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (mode === 'add') {
                handleAddTag(tag.tag);
                handleResetTagInputField();
            } else if (mode === 'edit') {
                handleEditTag(tag.tag, tagId);
                handleResetTagInputField();
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (mode === 'edit' && tagId.length > 0) {
            handleFetchTagById(tagId);
        } else {
            setTag({ tag: '' });
        }
    }, [mode, tagId]);


    return (
        <div className="modal fade" id="tagModal" tabindex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="tagModalLabel">
                            {mode === 'add' ? 'Create new Tag': 'Edit tag'}
                        </h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={handleResetTagInputField} />
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label for="exampleInputEmail1" className="form-label">Enter New Tag</label>
                                <input type="text" className="form-control" id="newTag" onChange={handleChange} value={tag.tag} />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleSubmit}>
                            {mode === 'add' ? 'Add Tag' : 'Update Tag'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TagModal;