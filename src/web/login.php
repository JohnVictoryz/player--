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

// Check if the username and password are valid
$stmt = $conn->prepare('SELECT * FROM users WHERE username = ?');
$stmt->bind_param('s', $username);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 1) {
    $row = $result->fetch_assoc();
    if (password_verify($password, $row['password'])) {
        // Password is correct, set session variables and redirect to home page
        session_start();
        $_SESSION['username'] = $username;
        header('Content-Type: application/json');
        echo json_encode(array('success' => true));
    } else {
        // Password is incorrect
        header('Content-Type: application/json');
        echo json_encode(array('success' => false, 'message' => 'Incorrect password'));
    }
} else {
    // Username is incorrect
    header('Content-Type: application/json');
    echo json_encode(array('success' => false, 'message' => 'Username not found'));
}

// Close the database connection
$conn->close();

?>
