 # Father's Day Adventure

This is a charming, retro-style mini-game designed to look and feel like it's being played on a classic Game Boy. The game simulates a heartwarming interaction between a father, **Justin**, and his baby, **Liam**.

## Objective

The goal of the game is to fill the opposing character's "love" bar (which functions like a health bar in a traditional battle game) before they fill yours. You play as Justin, and your goal is to fill Liam's love bar.

## Gameplay

1.  **Turn-Based Interaction:** The game is turn-based. You, as Justin, go first.
2.  **Player's Turn:**
    *   A message appears: "What will Justin do?"
    *   You have a menu of three actions to choose from:
        *   **Hug:** A standard "love" attack.
        *   **Dad Joke:** A slightly less powerful, but endearing, "love" attack.
        *   **Piggyback:** The most powerful "love" attack.
    *   You can navigate the action menu using the D-pad (up and down buttons on the screen).
    *   You select an action using the 'A' or 'B' button.
    *   When an action is selected, an animation plays, a descriptive message is shown (e.g., "Justin gives a big, warm hug!"), and Liam's "love" bar increases.
3.  **Opponent's (Liam's) Turn:**
    *   After your turn, Liam takes his turn automatically.
    *   Liam will randomly perform one of his three actions:
        *   **Giggle**
        *   **Clap Hands**
        *   **Blow Kiss**
    *   An animation plays, a message is shown (e.g., "Liam lets out a happy giggle!"), and Justin's "love" bar increases.
4.  **Winning and Losing:**
    *   The game ends when one character's "love" bar is completely filled.
    *   If Liam's love bar fills up first, you (Justin) win!
    *   If Justin's love bar fills up first, Liam wins.
    *   A "Game Over" screen appears announcing whose heart is full of love, and you are given the option to "Play Again."

## Technical Details

*   **Frontend:** The game is built entirely with HTML, CSS, and JavaScript.
    *   `index.html`: Provides the structure of the game, including the Game Boy container, the screen, character info boxes, and on-screen controls.
    *   `css/style.css`: Styles the game to look like a retro Game Boy. It uses a pixel-art font ('Press Start 2P') and classic Game Boy colors. It also includes animations for the characters' actions.
    *   `js/main.js`: Contains all the game logic. It manages the game state (whose turn it is, each character's "love" level), handles user input from the on-screen buttons, and updates the UI accordingly. 