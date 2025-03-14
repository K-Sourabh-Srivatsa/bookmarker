const express = require('express');
const checkForAuthentication = require('../middlewares/auth');

const { 
    handleCreateTag,
    handleGetAllTags,
    handleFindAndUpdateTagById,
    handleFindAndDeleteTagById,
    handleGetTagById,
} = require('../controllers/tags');

const router = express.Router();

router.use(checkForAuthentication);

router.route('/')
    .post(handleCreateTag)
    .get(handleGetAllTags);

router.route('/:id')
    .get(handleGetTagById)
    .put(handleFindAndUpdateTagById)
    .delete(handleFindAndDeleteTagById);


module.exports = router;