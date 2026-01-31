<?php
$pageTitle = 'Tech Lab Arcade | Home';
include __DIR__ . '/partials/header.php';
?>
<section class="hero">
    <h1>Tech Lab Arcade</h1>
    <p>Play. Learn. Level Up.</p>
    <a class="cta-button" href="games.php">Explore Games</a>
</section>

<section class="section" id="categories">
    <div class="section-header">
        <h2>Explore by category</h2>
        <p class="muted">Three pathways for every tech learner.</p>
    </div>
    <div class="card-grid">
        <div class="card">
            <span class="tag">Computer Science</span>
            <h3>Computer Science Games</h3>
            <p>Build logic and algorithm skills through mini-challenges.</p>
            <a class="button" href="games.php?category=cs">View Games</a>
        </div>
        <div class="card">
            <span class="tag">Information Technology</span>
            <h3>Information Technology Games</h3>
            <p>Practice hardware, networking, and troubleshooting fundamentals.</p>
            <a class="button" href="games.php?category=it">View Games</a>
        </div>
        <div class="card">
            <span class="tag">Cybersecurity</span>
            <h3>Cybersecurity Games</h3>
            <p>Sharpen defensive thinking with security scenarios.</p>
            <a class="button" href="games.php?category=cyber">View Games</a>
        </div>
    </div>
</section>
<?php include __DIR__ . '/partials/footer.php'; ?>
