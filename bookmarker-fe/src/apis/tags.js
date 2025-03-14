import { API_TAG_BY_ID, createDynamicRoute } from "../utils/constants";
// import api from './api';
import { api } from "./api";


export const fetchTags = async () => {
    try {
        const res = await api.get('/tags');
        return res.data;
    } catch (err) {
        return err;
    }
};

export const fetchTagById = async (id) => {
    try {
        const res = await api.get(createDynamicRoute('/tags/:id', id));
        return res.data;
    } catch (err) {
        return err;
    }
};

export const addTag = async (tag) => {
    try {
        await api.post('/tags', {
            tag: tag
        });

        return ('Successfully added tag:', tag);
    } catch (err) {
        return err;
    }
};

export const editTag = async (tag, tagId, e) => {
    try {
        const res = await api.put(createDynamicRoute('/tags/:id', tagId), { tag: tag });
        return res.data;
    } catch (err) {
        return err;
    }
};

export const deleteTag = async (id, e) => {
    try {
        e.preventDefault();
        e.stopPropagation();
    
        await api.delete(`/tags/${id}`);
        return ('Successfully deleted the tag with id:', id);
    } catch (err) {
        return err;
    }
};