<?php
require_once '../cors.php';
include '../db.php';
include '../auth.php';

// Fetch Comments for an Image
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['image_id'])) {
    $image_id = intval($_GET['image_id']);

    if (empty($image_id)) {
        http_response_code(400); // Bad Request
        echo json_encode(["success" => false, "message" => "Missing image_id"]);
        exit();
    }

    $stmt = $conn->prepare("SELECT c.id, c.comment_text, c.created_at, u.username 
                            FROM comments c 
                            JOIN users u ON c.user_id = u.id 
                            WHERE c.image_id = ? 
                            ORDER BY c.created_at DESC");
    $stmt->bind_param("i", $image_id);
    $stmt->execute();
    $result = $stmt->get_result();

    $comments = [];
    while ($row = $result->fetch_assoc()) {
        $comments[] = $row;
    }

    echo json_encode($comments);
    $stmt->close();
    $conn->close();
    exit();
}

// Add a Comment
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $headers = apache_request_headers();
    if (!isset($headers['Authorization'])) {
        http_response_code(401);
        echo json_encode(["success" => false, "message" => "Authorization header missing"]);
        exit();
    }

    $jwt = str_replace("Bearer ", "", $headers['Authorization']);
    $user = validate_jwt($jwt);

    $image_id = isset($_POST['image_id']) ? intval($_POST['image_id']) : null;
    $comment_text = isset($_POST['comment_text']) ? htmlspecialchars(trim($_POST['comment_text'])) : null;
    $user_id = $user->user_id;

    if (empty($image_id) || empty($comment_text)) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "Missing image_id or comment_text"]);
        exit();
    }

    $stmt = $conn->prepare("INSERT INTO comments (image_id, user_id, comment_text, created_at) VALUES (?, ?, ?, NOW())");
    $stmt->bind_param("iis", $image_id, $user_id, $comment_text);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Comment added"]);
    } else {
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Database error: " . $stmt->error]);
    }

    $stmt->close();
    $conn->close();
    exit();
}
?>
