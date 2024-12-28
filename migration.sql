-- Use the correct database
USE gallery_app;

-- Insert data into the `users` table
INSERT INTO users (username, email, password)
VALUES
    ('admin', 'admin@example.com', 'password123'),
    ('john_doe', 'john@example.com', 'johns_password'),
    ('jane_doe', 'jane@example.com', 'janes_password');

-- Insert data into the `images` table
INSERT INTO images (title, description, filepath, uploaded_by, created_at)
VALUES
    ('Sunset', 'A beautiful sunset by the beach', 'uploads/sunset.jpg', 1, NOW()),
    ('Mountains', 'Snowy mountains during winter', 'uploads/mountains.jpg', 2, NOW()),
    ('Cityscape', 'City skyline at night', 'uploads/cityscape.jpg', 3, NOW());

-- Insert data into the `comments` table
INSERT INTO comments (image_id, user_id, comment_text, created_at)
VALUES
    (1, 2, 'This is such a beautiful view!', NOW()),
    (1, 3, 'I love sunsets!', NOW()),
    (2, 1, 'Looks so peaceful!', NOW()),
    (3, 2, 'Amazing photo!', NOW());

-- Insert data into the `ratings` table
INSERT INTO ratings (image_id, user_id, rating)
VALUES
    (1, 2, 5),
    (1, 3, 4),
    (2, 1, 4),
    (3, 2, 3);
