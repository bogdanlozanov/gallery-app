<?php
require '../vendor/autoload.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$secret_key = getenv('JWT_SECRET') ?: "your_secret_key"; // Fetch from environment or fallback
$issuer = "http://localhost:8000"; // Replace with your domain

function validate_jwt($jwt) {
    global $secret_key, $issuer;

    try {
        // Decode and validate JWT
        $decoded = JWT::decode($jwt, new Key($secret_key, 'HS256'));

        // Validate issuer (optional but recommended)
        if (isset($decoded->iss) && $decoded->iss !== $issuer) {
            http_response_code(401);
            echo json_encode(["success" => false, "message" => "Invalid token issuer"]);
            exit();
        }

        // Return decoded payload if validation passes
        return $decoded;
    } catch (\Firebase\JWT\ExpiredException $e) {
        http_response_code(401);
        echo json_encode(["success" => false, "message" => "Token expired"]);
        exit();
    } catch (\Exception $e) {
        http_response_code(401);
        echo json_encode(["success" => false, "message" => "Unauthorized: " . $e->getMessage()]);
        exit();
    }
}
?>
