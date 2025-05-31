# Bookmarker

**Link to the website:** https://bookmarker-x29e.onrender.com
## About the App
Bookmarker is a full-stack web application designed to help users save, organize, and manage links to interesting content they find on the internet. It provides a user-friendly interface to keep track of bookmarks, categorize them with tags, and easily find them later.

The application is built with a modern technology stack:
-   **Frontend:** React with Vite
-   **Backend:** Node.js with Express.js
-   **Database:** MongoDB

## Main Features
-   **User Authentication:** Secure user registration and login system.
-   **Create Bookmarks:** Easily save new links with a title and optional description.
-   **View & Manage Bookmarks:** Display all saved bookmarks with options to view details, edit, or delete them.
-   **Tagging System:** Organize bookmarks by creating and assigning tags. Users can also manage their tags (e.g., view all tags, potentially edit or delete them).
-   **Search Functionality:** Quickly find specific bookmarks based on keywords in the title or description.
-   **Account Management:** Users can manage their account details (e.g., update information) and have the option to delete their account.

## How to Navigate the Website

Navigating the Bookmarker application is straightforward. Most navigation is done through the persistent **Navbar** located at the top of the page.

Key sections and their purposes:

*   **Home (`/`):** After logging in, this is typically where you'll see your saved bookmarks.
*   **Add New Bookmark (`/new`):** This page allows you to save a new link, providing a title and optionally a description and tags.
*   **Manage Tags (`/tags`):** Here you can view all your created tags and manage them (e.g., create new tags, edit existing ones, or delete them).
*   **Search Bookmarks (`/search`):** This section provides a way to search through your saved bookmarks based on keywords.
*   **Account (Icon/Dropdown in Navbar):** Usually provides access to:
    *   **Manage Account (`/user/account`):** View your account details and potentially update your information or delete your account.
    *   **Login (`/user/login`):** If you are not logged in, this option will be available.
    *   **Register (`/user/register`):** Allows new users to create an account.
    *   **Logout:** Once logged in, an option to log out will be available.

Most of the application's features are accessible only after a user has registered and logged in.

## How to Run Locally

To run the Bookmarker application on your local machine, you'll need to set up both the backend and frontend services.

**Prerequisites:**
*   **Node.js and npm:** Ensure you have Node.js (which includes npm) installed. You can download it from [https://nodejs.org/](https://nodejs.org/).
*   **MongoDB:** You need a running instance of MongoDB. You can use a local installation or a cloud-hosted service like MongoDB Atlas.

**1. Backend Setup (`bookmarker-be`):**

   a.  **Navigate to the backend directory:**
       ```bash
       cd bookmarker-be
       ```

   b.  **Create a `.env` file:**
       Copy the `env.example` file to a new file named `.env`:
       ```bash
       cp .env.example .env
       ```
       Edit the `.env` file with your specific configurations:
       *   `JWT_SECRET`: A strong, unique secret string for JWT token generation (e.g., `your_very_secure_jwt_secret_123!`).
       *   `MONGODB_URL`: Your MongoDB connection string (e.g., `mongodb://localhost:27017/bookmarker_db` for a local instance or your Atlas connection string).
       *   `BACKEND_PORT`: The port the backend server will listen on (e.g., `8000`).

   c.  **Install dependencies:**
       ```bash
       npm install
       ```

   d.  **Run the backend server:**
       To start the server:
       ```bash
       npm start
       ```
       Alternatively, for development with automatic restarts on file changes (requires nodemon, which is listed in devDependencies):
       ```bash
       npm run dev
       ```
       The backend server should now be running on the `BACKEND_PORT` you specified (e.g., `http://localhost:8000`).

**2. Frontend Setup (`bookmarker-fe`):**

   a.  **Navigate to the frontend directory:**
       From the project root:
       ```bash
       cd bookmarker-fe
       ```

   b.  **Create a `.env` file:**
       Copy the `env.example` file to a new file named `.env`:
       ```bash
       cp .env.example .env
       ```
       Edit the `.env` file with your specific configurations:
       *   `VITE_PORT`: The port the frontend development server will run on (e.g., `3000`).
       *   `VITE_API_URL`: The full URL to your running backend API. If your backend is running on port 8000, this would be `http://localhost:8000/api`.

   c.  **Install dependencies:**
       ```bash
       npm install
       ```

   d.  **Run the frontend development server:**
       ```bash
       npm run dev
       ```
       The frontend application should now be accessible in your browser at the `VITE_PORT` you specified (e.g., `http://localhost:3000`).

Once both the backend and frontend are running, you can open the frontend URL in your web browser to use the application.
