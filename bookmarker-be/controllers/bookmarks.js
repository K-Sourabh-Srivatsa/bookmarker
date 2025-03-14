const fs = require('fs');
const path = require('path');
const { default: mongoose } = require('mongoose');
const Bookmarks = require('../models/bookmarks');

async function handleCreateBookmark (req, res) {
    const body = req.body;
    try {
        if (!body || !body.url) {
            return res.status(400).json({ msg: 'URL is required' });
        }
    
        await Bookmarks.create({
            title: body.title,
            url: body.url,
            description: body.description,
            tags: body.tags,
            createdBy: req.user._id
        });
    
        return res.status(200).json({ msg: 'Successfully added new bookmark' });
    } catch (err) {
        return res.status(500).json({ error: err });
    }
};

async function handleGetAllBookmarks (req, res) {
    try {
        const allBookmarks = await Bookmarks.find({ createdBy: req.user._id }).populate('createdBy', 'firstName lastName email');
        
        if(!allBookmarks) return res.status(404).json({ err: 'No bookmarks' });

        return res.status(200).json({ msg: 'Successfully fetched all bookmarks', bookmarks: allBookmarks });
    } catch (err) {
        return res.status(500).json({ error: err });
    }
};

async function handleGetBookmarkByID (req, res) {
    try {
        if(!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ err: 'Invalid Bookmark ID format'});

        const bookmark = await Bookmarks.findOne({
            _id: req.params.id,
            createdBy: req.user._id
        }).populate('createdBy', 'firstName lastName email');

        if (!bookmark) return res.status(404).json({ err: 'The requested bookmark does not exist' });

        return res.status(200).json({ msg: 'Successfully fetched the request bookmark', bookmark: bookmark });

    } catch (err) {
        return res.status(500).json({ error: err });
    }
};

async function handleGetAndUpdateBookmarkByID(req, res) {
    const body = req.body;
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ err: 'Invalid Bookmark ID format' });
        }
        if (!body || !Object.keys(body).length) {
            return res.status(400).json({ err: 'Invalid Request Format or the Body does not exist' });
        }
        if (!body || !body.url.length) {
            return res.status(400).json({ err: 'URL is required' });
        }
        const bookmark = await Bookmarks.findById(req.params.id);

        if (!bookmark) {
            return res.status(404).json({ err: 'Could not find the Bookmark' });
        }
        
        const updatedBookmark = await Bookmarks.findOneAndUpdate(
            { _id: req.params.id, createdBy: req.user._id },
            body,
            { new: true }
        );

        if (!updatedBookmark) {
            return res.status(404).json({ err: 'Could not update the Bookmark' });
        }

        return res.status(200).json({ msg: 'Successfully updated the bookmark', bookmark: updatedBookmark });
    } catch (err) {
        console.error('Error updating bookmark:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function handleDeleteBookmarkByID (req, res) {
    try {
        if(!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ err: 'Invalid Bookmark ID format'});

        const bookmark = await Bookmarks.findOneAndDelete({
            _id: req.params.id,
            createdBy: req.user._id
        });
        if (!bookmark) return res.status(404).json({ msg: 'Cannot find the bookmark to be deleted' });

        await Bookmarks.findByIdAndDelete(req.params.id);
        return res.status(200).json({ msg: 'Succesfully deleted the bookmark' });
    } catch (err) {
        return res.status(500).json({ error: err });
    }
};

async function handleSearchBookmarks (req, res) {
    // Searches case-insensitive through Title, URL, Description of the Bookmarks
    
    try {
        const { query } = req.query;
        if (!query || !query.length) return res.status(400).json({ err: 'Search Query is required' });

        const bookmarks = await Bookmarks.find({
            createdBy: req.user._id,
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { url: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } }
            ]
        }).populate('createdBy', 'firstName lastName email');

        return res.status(200).json({ msg: 'Successfully searched for bookmarks', bookmarks: bookmarks });
    } catch (err) {
        return res.status(500).json({ err: 'Error while searching for Bookmarks' });
    }
};

async function handleFilterBookmarksByTags(req, res) {
    try {
        const tags = req.query.tags; 

        if (!tags) {
            return res.status(400).json({ err: 'Tags query parameter is required' });
        }

        // Convert tags query to an array if it's a single string
        const tagsArray = Array.isArray(tags) ? tags : tags.split(',');

        // Case-insensitive and trimmed tags
        const cleanedTags = tagsArray.map(tag => new RegExp('^' + tag.trim() + '$', 'i'));

        const bookmarks = await Bookmarks.find({
            tags: { $all: cleanedTags },
            createdBy: req.user._id
        }).populate('createdBy');

        return res.status(200).json(bookmarks);
    } catch (err) {
        console.error('Error in handleFilterBookmarksByTags:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

async function handleExportBookmarks(req, res) {
    try {
      const tempFilePath = path.join(__dirname, '..', 'temp', 'bookmarks.json');
      const allBookmarks = await Bookmarks.find({ createdBy: req.user._id }).select('-_id title url description tags').lean();
  
      if (!allBookmarks) {
        return res.status(404).json({ err: 'No bookmarks found' });
      }
  
      // Create the temporary directory if it doesn't exist
      await fs.promises.mkdir(path.dirname(tempFilePath), { recursive: true });
  
      // Write bookmarks data asynchronously
      await fs.promises.writeFile(tempFilePath, JSON.stringify(allBookmarks));
  
      res.sendFile(tempFilePath);

      await fs.promises.rm(path.join(__dirname, '..', 'temp'), { recursive: true });
    } catch (err) {
      console.error('Error exporting bookmarks:', err);
      res.status(500).json({ error: 'Failed to export bookmarks' });
    }
}

module.exports = {
    handleCreateBookmark,
    handleGetAllBookmarks,
    handleGetBookmarkByID,
    handleDeleteBookmarkByID,
    handleGetAndUpdateBookmarkByID,
    handleSearchBookmarks,
    handleFilterBookmarksByTags,
    handleExportBookmarks
};