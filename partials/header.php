<?php
if (!isset($pageTitle)) {
    $pageTitle = 'Tech Lab Arcade';
}
?>
<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo htmlspecialchars($pageTitle); ?></title>
    <link rel="stylesheet" href="assets/css/main.css">
</head>
<body>
    <a class="skip-link" href="#main">Skip to content</a>
    <?php include __DIR__ . '/navbar.php'; ?>
    <main id="main" class="main-content">
