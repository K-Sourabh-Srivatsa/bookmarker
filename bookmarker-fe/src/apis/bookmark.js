import { api } from "./api";

export const fetchBookmarks = async () => {
    try {
        const res = await api.get('/bookmarks');
        return res;
    } catch (err) {
        return err;
    }
};

export const fetchBookmarkById = async (id) => {
    try {
        const res = await api.get(`/bookmarks/${id}`);
        return res;
    } catch (err) {
        return err;
    }
};

export const addBookmark = async (formData) => {
    try {
        const res = await api.post('/bookmarks', formData);
    } catch (err) {
        return err
    }
};

export const editBookmark = async (formData, id) => {
    try {
        const res = await api.put(`/bookmarks/${id}`, formData);
        return 'Successfully updated the bookmark'
    } catch (err) {
        return err;
    }
};

export const deleteBookmark = async (id, e) => {
    try {
        e.preventDefault();
        e.stopPropagation();
        await api.delete(`/bookmarks/${id}`, id);
        return "Successfully deleted the bookmark";
    } catch (err) {
        return err;
    }
};

export const handleExportBookmarksDownload = async (id) => {
    try {
      if (!sessionStorage.getItem('token')) return null;
  
      const response = await api.get('/bookmarks/export', {
        responseType: 'blob',
      });
  
      const url = window.URL.createObjectURL(new Blob([response.data]));
  
      const link = document.createElement('a');
      link.href = url;
      link.download = 'bookmarks.json';
  
      link.click();
  
      window.URL.revokeObjectURL(url);
    } catch (err) {
      return ('Error downloading bookmarks:', err);
    }
};