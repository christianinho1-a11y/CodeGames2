<?php
include __DIR__ . '/data/games.php';

global $games;
$gameId = $_GET['id'] ?? '';
$gameData = null;

foreach ($games as $game) {
    if ($game['id'] === $gameId) {
        $gameData = $game;
        break;
    }
}

if (!$gameData) {
    $gameData = [
        'name' => 'Game Not Found',
        'category' => 'cs',
        'summary' => 'We could not locate that game yet.',
        'difficulty' => 'Beginner',
        'instructions' => 'Return to the games list and choose another title.',
        'skills' => ['Navigation'],
    ];
}

$categoryTitle = $categories[$gameData['category']]['title'] ?? 'Games';
$pageTitle = 'Tech Lab Arcade | ' . $gameData['name'];
include __DIR__ . '/partials/header.php';
?>
<section class="page-header">
    <span class="tag"><?php echo htmlspecialchars($categoryTitle); ?></span>
    <h1><?php echo htmlspecialchars($gameData['name']); ?></h1>
    <p><?php echo htmlspecialchars($gameData['summary']); ?></p>
</section>

<section class="game-layout">
    <div class="game-container">
        <p>Game content loads here. Drop in HTML/JS for this activity.</p>
    </div>
    <aside class="side-panel">
        <div>
            <h3>How to play</h3>
            <p><?php echo htmlspecialchars($gameData['instructions']); ?></p>
        </div>
        <div>
            <h3>Skills supported</h3>
            <ul>
                <?php foreach ($gameData['skills'] as $skill) : ?>
                    <li><?php echo htmlspecialchars($skill); ?></li>
                <?php endforeach; ?>
            </ul>
        </div>
        <a class="button secondary" href="games.php?category=<?php echo urlencode($gameData['category']); ?>">Back to <?php echo htmlspecialchars($categoryTitle); ?></a>
    </aside>
</section>
<?php include __DIR__ . '/partials/footer.php'; ?>
