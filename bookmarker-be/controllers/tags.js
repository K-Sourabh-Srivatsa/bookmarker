const express = require('express');
const mongoose = require('mongoose');

const Tags = require('../models/tags');
const Bookmarks = require('../models/bookmarks');

async function handleCreateTag (req, res) {
    const body = req.body;

    try {
        if( !body || !body.tag) return res.status(400).json({ msg: 'Tag field is empty' });

        const addedTag = await Tags.create({ 
            tag: body.tag,
            createdBy: req.user._id
        });

        return res.status(200).json({ msg: 'Successfully added new tag', tag: addedTag });
    } catch (err) {
        return res.status(500).json({ error: err });
    }
};

async function handleGetAllTags (req, res) {
    try {
        const allTags = await Tags.find({ createdBy: req.user._id }).populate('createdBy');
        
        if (!allTags || allTags.length === 0) return res.status(404).json({ msg: 'No Tags created yet' });

        return res.status(200).json({ msg: 'Successfully fetched all tags', tags: allTags });
    } catch (err) {
        return res.status(500).json({ error: err });
    }
};

async function handleGetTagById (req, res) {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ err: 'Invalid Tag ID format' });
        }
        const tag = await Tags.findOne({
            _id: req.params.id,
            createdBy: req.user._id,
        }).populate('createdBy');

        return res.status(200).json({msg: 'Successfully fetched the tag', tag: tag});        
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

async function handleFindAndUpdateTagById (req, res) {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ err: 'Invalid Tag ID format' });
        }
        if (!req.body || !req.body.tag.length) {
            return res.status(400).json({ err: 'Tag should not be empty' });
        }

        const userId = req.user._id;
        const oldTag = await Tags.findOne({  _id: req.params.id, createdBy: userId });

        if (!oldTag) {
            return res.status(404).json({ msg: 'Could not find the tag' });
        }

        // Update the tag in the Tags collection
        const updatedTag = await Tags.findByIdAndUpdate(
            req.params.id, 
            { tag: req.body.tag },
            { new: true }
        );

        // Update all bookmarks that use this tag
        await Bookmarks.updateMany(
            { tags: oldTag.tag, createdBy: userId },
            { $set: { "tags.$": updatedTag.tag } }
        );

        return res.status(200).json({ 
            msg: 'Successfully updated the tag in Tags collection and all associated Bookmarks',
            oldTag: oldTag.tag,
            newTag: updatedTag.tag
        });

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

async function handleFindAndDeleteTagById(req, res) {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ err: 'Invalid Tag ID format' });
        }

        const userId = req.user._id;
        const tag = await Tags.findOne({ _id: req.params.id, createdBy: userId });
        
        if (!tag) {
            return res.status(404).json({ err: 'Tag does not exist' });
        }

        await Bookmarks.updateMany(
            { tags: tag.tag, createdBy: userId },
            { $pull: { tags: tag.tag } }
        );

        await Tags.findByIdAndDelete(req.params.id);

        res.status(200).json({ msg: 'Successfully deleted the tag and removed it from all bookmarks', tag: tag.tag });
    } catch (err) {
        console.error('Error in handleFindAndDeleteTagById:', err);
        return res.status(500).json({ error: err.message });
    }
}

module.exports = {
    handleCreateTag,
    handleGetAllTags,
    handleGetTagById,
    handleFindAndUpdateTagById,
    handleFindAndDeleteTagById,
};