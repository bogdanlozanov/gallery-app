SET SQL_SAFE_UPDATES = 0;

-- Now run your delete script
DELETE FROM images;

-- Optionally reset the auto-increment value
ALTER TABLE images AUTO_INCREMENT = 1;

-- Re-enable safe updates (optional, for safety)
SET SQL_SAFE_UPDATES = 1;
