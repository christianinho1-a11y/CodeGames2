<?php
$games = [
    [
        'id' => 'cs-wordle',
        'name' => 'CS Wordle',
        'category' => 'cs',
        'difficulty' => 'Beginner',
        'summary' => 'Guess computer science vocabulary words in a familiar Wordle-style grid.',
        'status' => 'Coming Soon',
        'skills' => ['Vocabulary', 'Algorithms'],
        'instructions' => 'Type a five-letter CS term and use color hints to solve the puzzle.',
    ],
    [
        'id' => 'binary-blaster',
        'name' => 'Binary Blaster',
        'category' => 'cs',
        'difficulty' => 'Intermediate',
        'summary' => 'Convert binary numbers to decimal and blast the right answer.',
        'status' => 'Coming Soon',
        'skills' => ['Binary', 'Number Systems'],
        'instructions' => 'Convert the displayed binary value into a decimal number before time runs out.',
    ],
    [
        'id' => 'port-match',
        'name' => 'Port Match',
        'category' => 'it',
        'difficulty' => 'Beginner',
        'summary' => 'Match common services to their default port numbers.',
        'status' => 'Coming Soon',
        'skills' => ['Networking', 'Ports'],
        'instructions' => 'Drag or select the correct port for each service.',
    ],
    [
        'id' => 'tech-top-ten',
        'name' => 'Tech Top Ten',
        'category' => 'it',
        'difficulty' => 'Beginner',
        'summary' => 'Rapid-fire quiz on popular IT concepts and devices.',
        'status' => 'Coming Soon',
        'skills' => ['IT Basics', 'Hardware'],
        'instructions' => 'Answer 10 quick questions to earn your score.',
    ],
    [
        'id' => 'phishing-or-legit',
        'name' => 'Phishing or Legit',
        'category' => 'cyber',
        'difficulty' => 'Intermediate',
        'summary' => 'Spot the difference between legitimate emails and phishing attempts.',
        'status' => 'Coming Soon',
        'skills' => ['Phishing Awareness', 'Email Safety'],
        'instructions' => 'Review the message and choose whether it is safe or suspicious.',
    ],
    [
        'id' => 'password-strength',
        'name' => 'Password Strength Challenge',
        'category' => 'cyber',
        'difficulty' => 'Beginner',
        'summary' => 'Build a strong password that passes the security meter.',
        'status' => 'Coming Soon',
        'skills' => ['Password Hygiene', 'Security'],
        'instructions' => 'Combine characters until the strength meter reaches green.',
    ],
];

$categories = [
    'cs' => [
        'title' => 'Computer Science Games',
        'description' => 'Logic, algorithms, and core CS concepts to level up your skills.',
    ],
    'it' => [
        'title' => 'Information Technology Games',
        'description' => 'Explore hardware, networking, and IT fundamentals in bite-sized games.',
    ],
    'cyber' => [
        'title' => 'Cybersecurity Games',
        'description' => 'Practice defensive thinking with security-focused challenges.',
    ],
];
