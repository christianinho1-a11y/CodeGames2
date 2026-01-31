<?php
include __DIR__ . '/data/games.php';
$pageTitle = 'Tech Lab Arcade | Admin';
include __DIR__ . '/partials/header.php';
?>
<section class="page-header">
    <h1>Admin Panel</h1>
    <p>Local-only tools for managing Tech Lab Arcade content.</p>
</section>

<section class="admin-panel" data-admin-panel>
    <div class="unlock-bar">
        <input type="password" placeholder="Enter admin password" aria-label="Admin password" />
        <button class="button" type="button" data-admin-unlock>Unlock</button>
    </div>

    <div class="panel-section locked-overlay">
        <h2>Games Management</h2>
        <p>Manage the mini-games available to students.</p>
        <div class="actions">
            <button class="button" type="button">Add Game</button>
            <button class="button secondary" type="button">Edit Game</button>
            <button class="button secondary" type="button">Delete Game</button>
        </div>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($games as $game) : ?>
                    <tr>
                        <td><?php echo htmlspecialchars($game['name']); ?></td>
                        <td><?php echo htmlspecialchars(strtoupper($game['category'])); ?></td>
                        <td><?php echo htmlspecialchars($game['status']); ?></td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>

    <div class="panel-section locked-overlay">
        <h2>Class Instructions</h2>
        <p>Welcome to Tech Lab Arcade! Choose a category, pick a game, and challenge yourself.</p>
    </div>

    <div class="panel-section locked-overlay">
        <h2>System Info</h2>
        <ul>
            <li>Base URL: http://localhost/tech-lab-arcade/</li>
            <li>Theme preference: stored in each browser via local storage.</li>
        </ul>
    </div>
</section>
<?php include __DIR__ . '/partials/footer.php'; ?>
