# Gallery App

A full-stack web application for managing image galleries, allowing users to upload, view, comment, and rate images.

## Features

1. **User Authentication**
   - Register and Login.
   - Secure JWT-based authentication.
   - Logout functionality.

2. **Gallery Management**
   - View uploaded images in a grid layout.
   - View detailed information about an image.

3. **Image Upload**
   - Upload images with title and description.
   - Supports `.jpeg`, `.png`, and `.gif` formats.
   - Restricts file size to 2MB.

4. **Image Rating**
   - Submit ratings between 1 and 5.
   - View average ratings for images.

5. **Commenting System**
   - Add comments to images.
   - View all comments for an image.

---

## Project Structure

### Backend
- **Folder**: `backend`
- Built using PHP and MySQL.
- APIs for authentication, image upload, commenting, and rating.
- Directory Structure:
  ```
  backend/
  ├── api/
  │   ├── images.php      # Image upload and fetch APIs
  │   ├── comments.php    # Comments APIs
  │   ├── ratings.php     # Ratings APIs
  │   ├── users.php       # User authentication APIs
  ├── uploads/            # Directory to store uploaded images
  ├── db.php              # Database connection
  ├── auth.php            # JWT validation logic
  ├── cors.php            # Cross-Origin Resource Sharing (CORS) configuration
  ├── .env                # Environment variables
  ```

### Frontend
- **Folder**: `frontend`
- Built using React with Styled-Components and Vite.
- Pages:
  - `Gallery`: Displays all uploaded images.
  - `Image Details`: View an image with comments and ratings.
  - `Login` and `Register`: User authentication.
  - `Upload`: Upload a new image.
- Directory Structure:
  ```
  frontend/
  ├── src/
  │   ├── components/    # Reusable UI components (Button, Input, etc.)
  │   ├── pages/         # Application pages (Gallery, Upload, etc.)
  │   ├── api.js         # API service for making requests
  │   ├── App.jsx        # Application entry point
  │   ├── index.css      # Global styles
  │   ├── theme.js       # Theme configuration for Styled-Components
  └── public/
      ├── index.html     # HTML template
  ```

---

## Setup and Installation

### Prerequisites
- **Backend**:
  - PHP >= 7.4
  - MySQL
- **Frontend**:
  - Node.js >= 18.x

### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/gallery-app.git
   cd gallery-app/backend
   ```

2. Install dependencies:
   ```bash
   composer install
   ```

3. Set up the database:
   - Import the `db.sql` file into your MySQL database.
   - Create a `.env` file in the `backend/` folder with the following content:
     ```env
     DB_SERVER=localhost
     DB_USERNAME=root
     DB_PASSWORD=yourpassword
     DB_NAME=gallery_app
     JWT_SECRET=your_secret_key
     ```

4. Run the backend:
   ```bash
   php -S localhost:8000
   ```

### Frontend Setup
1. Navigate to the frontend folder:
   ```bash
   cd ../frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm run dev
   ```

4. Open the application:
   - Frontend: `http://localhost:5173`
   - Backend: `http://localhost:8000`

---

## Usage

### User Authentication
- Register a new user.
- Login to access features like image upload, commenting, and rating.

### Uploading Images
1. Go to the `Upload` page.
2. Fill in the image title and description.
3. Select an image to upload.
4. Submit the form.

### Viewing the Gallery
- The home page (`Gallery`) displays all uploaded images.

### Image Details
- Click on an image to view its details, comments, and average rating.

### Adding Comments
- Add comments on the image details page.

### Rating Images
- Rate images between 1 and 5 on the image details page.

---

## API Endpoints

### Authentication
- **Register**: `POST /api/users.php` (form data: `username`, `email`, `password`)
- **Login**: `POST /api/users.php` (form data: `username`, `password`)

### Images
- **Fetch Images**: `GET /api/images.php`
- **Upload Image**: `POST /api/images.php` (Authorization required)

### Comments
- **Add Comment**: `POST /api/comments.php` (Authorization required)
- **Fetch Comments**: `GET /api/comments.php?image_id={id}`

### Ratings
- **Add/Update Rating**: `POST /api/ratings.php` (Authorization required)
- **Fetch Ratings**: `GET /api/ratings.php?image_id={id}`

---

## Notes

- The backend uses JWT for secure user authentication.
- File uploads are stored in the `uploads/` folder within the `backend` directory.
- Adjust API base URLs in `frontend/src/api.js` if running on a different server.

---

## Contributing

Feel free to fork this repository and submit pull requests for improvements or new features.

---

## License

This project is licensed under the MIT License.
