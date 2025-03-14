// constants.js
const API_PORT = 8001

// Backend API Routes
export const API_BASE_URL = `http://localhost:${API_PORT}/api`; // Include /api
export const API_BOOKMARKS = `${API_BASE_URL}/bookmarks`; // For GET all and POST
export const API_BOOKMARK_BY_ID = `${API_BOOKMARKS}/:id`; // For GET, PUT, DELETE by ID
export const API_SEARCH_BOOKMARKS = `${API_BASE_URL}/bookmarks/search`;

export const API_TAGS = `${API_BASE_URL}/tags`; // For GET all and POST
export const API_TAG_BY_ID = `${API_BASE_URL}/tags/:id`;


// Frontend Routes
export const ROUTE_HOME = '/'; // Read All
export const ROUTE_NEW_BOOKMARK = '/bookmarks/new'; // Create
export const ROUTE_BOOKMARK_DETAILS = '/bookmarks/:id'; // Read
export const ROUTE_EDIT_BOOKMARK = '/bookmarks/:id/edit'; // Update
export const ROUTE_SEARCH_BOOKMARKS = '/bookmarks/search'; // Search

export const ROUTE_MANAGE_TAGS = '/tags' // Manage all tags

// Helper function for creating dynamic routes
export const createDynamicRoute = (route, id) => route.replace(':id', id);