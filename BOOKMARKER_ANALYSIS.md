# Problem

*   Users need a centralized and efficient way to manage their web links, as browser-based bookmarking tools are often limited in functionality and not easily accessible across different devices.
*   There is a lack of a proper system for organizing and categorizing bookmarks, which makes it difficult for users to retrieve saved links when they need them.
*   A secure and private environment is necessary for users to store their bookmarks, which requires a robust user authentication and authorization system.

# Technical Implementation

*   **Languages Used:**
    *   JavaScript (ES6+) for both the front-end and back-end.
    *   HTML5 and CSS3 for structuring and styling the user interface.
    *   The backend is built with Node.js.

*   **Libraries Used**:
    *   **Back-end**: Express.js for the server, Mongoose for database interaction, bcryptjs for password hashing, and JSON Web Token (JWT) for authentication.
    *   **Front-end**: React.js for the user interface, React Router for navigation, Axios for making HTTP requests, and Font Awesome for icons.
    *   Vite is used as the front-end build tool.

## Implementation
*   The application is built with a monorepo architecture, with the back-end (`bookmarker-be`) and front-end (`bookmarker-fe`) in separate packages.
*   The back-end is a RESTful API that provides endpoints for managing bookmarks, tags, and users, with a connection to a MongoDB database.
*   The front-end is a single-page application (SPA) that consumes the back-end API, with protected routes to ensure that only authenticated users can access the main features of the application.

# Outcome

*   The application provides a fully functional bookmarking service where users can register, log in, and manage their bookmarks in a centralized and organized manner.
*   Users can create custom tags and assign them to their bookmarks, which allows for easy filtering and searching of saved links.
*   The system ensures the privacy and security of user data through a token-based authentication system, which protects user-specific information and bookmarks.
