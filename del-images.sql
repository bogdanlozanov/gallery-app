-- Delete all rows from the `images` table
DELETE FROM images;

-- Reset the auto-increment value for the `images` table (optional)
ALTER TABLE images AUTO_INCREMENT = 1;

-- Verify that the table is now empty
SELECT * FROM images;
