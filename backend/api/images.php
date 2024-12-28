<?php
require_once '../cors.php';
include '../db.php';
include '../auth.php';

// Fetch All Images
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $stmt = $conn->prepare("SELECT id, title, description, filepath, uploaded_by, created_at FROM images ORDER BY created_at DESC");
    $stmt->execute();
    $result = $stmt->get_result();

    $images = [];
    while ($row = $result->fetch_assoc()) {
        $images[] = [
            "id" => $row['id'],
            "title" => $row['title'],
            "description" => $row['description'],
            "filepath" => $row['filepath'], // Path to be used in the frontend
            "uploaded_by" => $row['uploaded_by'],
            "created_at" => $row['created_at'],
        ];
    }

    echo json_encode($images);

    $stmt->close();
    $conn->close();
    exit();
}

// Upload Image
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Check Authorization Header
    $headers = apache_request_headers();
    if (!isset($headers['Authorization'])) {
        http_response_code(401);
        echo json_encode(["success" => false, "message" => "Authorization header missing"]);
        exit();
    }

    // Validate JWT
    $jwt = str_replace("Bearer ", "", $headers['Authorization']);
    $user = validate_jwt($jwt);

    // Validate Inputs
    $title = isset($_POST['title']) ? htmlspecialchars(trim($_POST['title'])) : null;
    $description = isset($_POST['description']) ? htmlspecialchars(trim($_POST['description'])) : null;
    if (empty($title) || empty($description) || !isset($_FILES['image'])) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "Missing required fields"]);
        exit();
    }

    // Secure File Upload
    $uploaded_by = $user->user_id;
    $target_dir = __DIR__ . "/../uploads/"; // Path relative to the backend folder
    $relative_path = "uploads/"; // Public-facing relative path
    if (!is_dir($target_dir) && !mkdir($target_dir, 0777, true)) {
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Failed to create upload directory"]);
        exit();
    }

    $file_name = uniqid() . "-" . hash('sha256', $_FILES['image']['name']) . "." . pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);
    $absolute_filepath = $target_dir . $file_name; // Absolute path on the server
    $public_filepath = $relative_path . $file_name; // Relative path for frontend use

    // Validate File Type and Size
    $allowed_types = ['image/jpeg', 'image/png', 'image/gif'];
    $file_type = mime_content_type($_FILES['image']['tmp_name']);
    $max_size = 2 * 1024 * 1024; // 2MB

    if (!in_array($file_type, $allowed_types)) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "Invalid file type"]);
        exit();
    }

    if ($_FILES['image']['size'] > $max_size) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "File size exceeds 2MB"]);
        exit();
    }

    // Move Uploaded File
    if (!move_uploaded_file($_FILES['image']['tmp_name'], $absolute_filepath)) {
        error_log("Failed to move uploaded file: " . $_FILES['image']['error']);
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Failed to upload file"]);
        exit();
    }

    // Save Metadata to Database
    $stmt = $conn->prepare("INSERT INTO images (title, description, filepath, uploaded_by) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("sssi", $title, $description, $public_filepath, $uploaded_by);

    if ($stmt->execute()) {
        echo json_encode([
            "success" => true,
            "message" => "Image uploaded successfully",
            "image_id" => $stmt->insert_id,
            "image_path" => $public_filepath // Path to be used in the frontend
        ]);
    } else {
        echo json_encode(["success" => false, "message" => "Database error: " . $stmt->error]);
    }

    $stmt->close();
}
?>
