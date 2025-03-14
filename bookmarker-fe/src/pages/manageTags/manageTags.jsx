import React, { useEffect, useState } from 'react';
import { fetchTags, deleteTag } from '../../apis/tags';
import TagModal from '../../components/tagModal/tagModal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

function ManageTags() {
    const [tagData, setTagData] = useState(null);
    const [selectedTagId, setSelectedTagId] = useState(null);
    const [modalMode, setModalMode] = useState('add');

    const handleFetchTags = async () => {
        try {
            const response = await fetchTags();
            setTagData(response);
        } catch (err) {
            console.log(err);
        }
    };

    const handleDeleteTag = async (id, e) => {
        try {
            const response = await deleteTag(id, e);
            handleFetchTags();
            return response;
        } catch (err) {
            console.log(err);
        }
    };

    const handleAddClick = () => {
        setModalMode('add');
        setSelectedTagId(null);
    };
    const handleEditClick = (id) => {
        setModalMode('edit');
        setSelectedTagId(id);
    };

    const handleTagChange = () => {
        handleFetchTags();
    };

    useEffect(() => {
        handleFetchTags();
    }, []);
    
    if(!tagData) {
        return (
            <div className="container">
                <h1>Oops! You don't have any tags</h1>
                <button className="btn btn-secondary btn-sm p-1" data-bs-toggle="modal" data-bs-target="#tagModal" onClick={handleAddClick}>Create New Tag</button>

                <TagModal mode={modalMode} tagId={selectedTagId} onTagChange={handleTagChange}/>
            </div>
        );
    }
    return (
        <div>
            <div className="container">
                <h1>Manage Tags</h1>
                
                <button className="btn btn-secondary btn-sm p-1" data-bs-toggle="modal" data-bs-target="#tagModal" onClick={handleAddClick}>Create New Tag</button>

                <table className="table">
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Tag</th>
                            <th colSpan="2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {tagData.tags && tagData.tags.map((tag, index) => (
                    <tr key={tag._id}>
                        <td>{index + 1}</td>
                        <td>{tag.tag}</td>
                        <td data-bs-toggle="modal" data-bs-target="#tagModal" onClick={() => handleEditClick(tag._id)}>
                            <FontAwesomeIcon icon={faPenToSquare} className="me-2" />Edit
                        </td>
                        <td className="text-danger" onClick={e => handleDeleteTag(tag._id, e)}>
                            <FontAwesomeIcon icon={faTrash} /> Delete
                        </td>
                    </tr>
                ))}
                    </tbody>
                </table>
            </div>

            <TagModal mode={modalMode} tagId={selectedTagId} onTagChange={handleTagChange}/>
        </div>
    )
}

export default ManageTags;