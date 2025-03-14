const express = require('express');
const mongoose = require('mongoose');
const checkForAuthentication = require('../middlewares/auth');

const {
    handleCreateBookmark,
    handleGetAllBookmarks,
    handleGetBookmarkByID,
    handleDeleteBookmarkByID,
    handleGetAndUpdateBookmarkByID,
    handleSearchBookmarks,
    handleFilterBookmarksByTags,
    handleExportBookmarks,
} = require('../controllers/bookmarks');

const router = express.Router();

router.use(checkForAuthentication);

router.route('/export')
    .get(handleExportBookmarks);

router.route('/filter')
    .get(handleFilterBookmarksByTags);

router.route('/')
    .post(handleCreateBookmark)
    .get(handleGetAllBookmarks);

router.route('/search')
    .get(handleSearchBookmarks);
    
router.route('/:id')
    .get(handleGetBookmarkByID)
    .delete(handleDeleteBookmarkByID)
    .put(handleGetAndUpdateBookmarkByID);

module.exports = router;
