<?php
require_once '../cors.php';
include '../db.php';
include '../auth.php';

// Fetch Ratings for an Image
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['image_id'])) {
    $image_id = intval($_GET['image_id']);

    if (empty($image_id)) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "Missing image_id"]);
        exit();
    }

    $stmt = $conn->prepare("SELECT AVG(rating) as average_rating, COUNT(*) as total_ratings FROM ratings WHERE image_id = ?");
    $stmt->bind_param("i", $image_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $data = $result->fetch_assoc();

    echo json_encode($data ?: ["average_rating" => null, "total_ratings" => 0]);
    $stmt->close();
    $conn->close();
    exit();
}

// Add or Update a Rating
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
    $rating = isset($_POST['rating']) ? intval($_POST['rating']) : null;
    $user_id = $user->user_id;

    if (empty($image_id) || empty($rating) || $rating < 1 || $rating > 5) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "Invalid image_id or rating"]);
        exit();
    }

    $stmt = $conn->prepare("SELECT id FROM ratings WHERE image_id = ? AND user_id = ?");
    $stmt->bind_param("ii", $image_id, $user_id);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $stmt->close();
        $stmt = $conn->prepare("UPDATE ratings SET rating = ? WHERE image_id = ? AND user_id = ?");
        $stmt->bind_param("iii", $rating, $image_id, $user_id);
        if ($stmt->execute()) {
            echo json_encode(["success" => true, "message" => "Rating updated"]);
        } else {
            http_response_code(500);
            echo json_encode(["success" => false, "message" => "Error: " . $stmt->error]);
        }
    } else {
        $stmt->close();
        $stmt = $conn->prepare("INSERT INTO ratings (image_id, user_id, rating) VALUES (?, ?, ?)");
        $stmt->bind_param("iii", $image_id, $user_id, $rating);
        if ($stmt->execute()) {
            echo json_encode(["success" => true, "message" => "Rating added"]);
        } else {
            http_response_code(500);
            echo json_encode(["success" => false, "message" => "Error: " . $stmt->error]);
        }
    }

    $stmt->close();
    $conn->close();
    exit();
}
?>
