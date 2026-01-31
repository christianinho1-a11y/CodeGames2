<?php
include __DIR__ . '/data/games.php';

$categoryKey = $_GET['category'] ?? 'cs';
if (!isset($categories[$categoryKey])) {
    $categoryKey = 'cs';
}

$pageTitle = 'Tech Lab Arcade | ' . $categories[$categoryKey]['title'];
include __DIR__ . '/partials/header.php';

$filteredGames = array_values(array_filter($games, function ($game) use ($categoryKey) {
    return $game['category'] === $categoryKey;
}));
?>
<section class="page-header">
    <h1><?php echo htmlspecialchars($categories[$categoryKey]['title']); ?></h1>
    <p><?php echo htmlspecialchars($categories[$categoryKey]['description']); ?></p>
</section>

<section class="card-grid">
    <?php foreach ($filteredGames as $game) : ?>
        <article class="card">
            <span class="tag"><?php echo htmlspecialchars($game['difficulty']); ?></span>
            <h3><?php echo htmlspecialchars($game['name']); ?></h3>
            <p><?php echo htmlspecialchars($game['summary']); ?></p>
            <a class="button" href="game.php?id=<?php echo urlencode($game['id']); ?>">Play</a>
        </article>
    <?php endforeach; ?>
</section>
<?php include __DIR__ . '/partials/footer.php'; ?>
