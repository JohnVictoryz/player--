<?php

// Replace with your database connection details
$host = 'localhost';
$username = 'player--';
$password = 'your_password';
$database = 'users';

// Establish a database connection
$conn = new mysqli($host, $username, $password, $database);
if ($conn->connect_error) {
    die('Connection failed: ' . $conn->connect_error);
}

// Get the username and password from the form data
$data = json_decode(file_get_contents('php://input'), true);
$username = $data['username'];
$password = $data['password'];

// Check if the username is already taken
$stmt = $conn->prepare('SELECT * FROM users WHERE username = ?');
$stmt->bind_param('s', $username);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    // Username is already taken
    header('Content-Type: application/json');
    echo json_encode(array('success' => false, 'message' => 'Username already taken'));
} else {
    // Insert the new user into the database
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);
    $stmt = $conn->prepare('INSERT INTO users (username, password) VALUES (?, ?)');
    $stmt->bind_param('ss', $username, $hashed_password);
    $stmt->execute();
    header('Content-Type: application/json');
    echo json_encode(array('success' => true));
}

// Close the database connection
$conn->close();

?>
