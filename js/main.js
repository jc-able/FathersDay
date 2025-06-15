document.addEventListener('DOMContentLoaded', () => {
    const justin = {
        name: 'Justin',
        hpElement: document.getElementById('justin-hp'),
        spriteElement: document.getElementById('justin-sprite'),
        love: 0,
        maxLove: 100,
    };

    const liam = {
        name: 'Liam',
        hpElement: document.getElementById('liam-hp'),
        spriteElement: document.getElementById('liam-sprite'),
        love: 0,
        maxLove: 100,
    };

    const playerActions = [
        { name: 'Hug', damage: 20, message: 'Justin gives a big, warm hug!' },
        { name: 'Dad Joke', damage: 15, message: 'Justin tells a cheesy dad joke. It\'s super effective!' },
        { name: 'Piggyback', damage: 25, message: 'Justin gives a fun piggyback ride!' },
    ];

    const opponentActions = [
        { name: 'Giggle', damage: 20, message: 'Liam lets out a happy giggle!' },
        { name: 'Clap Hands', damage: 15, message: 'Liam claps his tiny hands with joy!' },
        { name: 'Blow Kiss', damage: 25, message: 'Liam blows a sweet kiss!' },
    ];

    const messageText = document.getElementById('message-text');
    const actionMenu = document.getElementById('action-menu');
    const actionItems = document.querySelectorAll('.action-item');
    
    let currentActionIndex = 0;
    let isPlayerTurn = true;
    let gameOver = false;

    function showHeartEffect(character) {
        const particlesContainer = character.spriteElement.querySelector('.particles');
        if (!particlesContainer) return;

        for (let i = 0; i < 3; i++) {
            const heart = document.createElement('div');
            heart.classList.add('heart-particle');
            heart.textContent = '❤️';
            heart.style.left = `${Math.random() * 80}%`;
            heart.style.top = `${Math.random() * 80}%`;
            particlesContainer.appendChild(heart);

            setTimeout(() => {
                heart.remove();
            }, 1000);
        }
    }

    function updateActionMenu() {
        actionItems.forEach((item, index) => {
            const arrow = item.querySelector('.arrow');
            if (index === currentActionIndex) {
                arrow.style.visibility = 'visible';
            } else {
                arrow.style.visibility = 'hidden';
            }
        });
    }

    function typeMessage(text, onComplete) {
        let i = 0;
        messageText.textContent = '';
        const typing = setInterval(() => {
            if (i < text.length) {
                messageText.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typing);
                if (onComplete) {
                    onComplete();
                }
            }
        }, 50);
    }

    function updateHP(character, amount) {
        character.love += amount;
        if (character.love > character.maxLove) {
            character.love = character.maxLove;
        }
        const lovePercentage = (character.love / character.maxLove) * 100;
        character.hpElement.style.width = `${lovePercentage}%`; 
    }
    
    function checkWinCondition() {
        if (liam.love >= liam.maxLove) {
            endGame('Justin');
            return true;
        }
        if (justin.love >= justin.maxLove) {
            endGame('Liam');
            return true;
        }
        return false;
    }
    
    function endGame(winner) {
        gameOver = true;
        actionMenu.style.display = 'none';
        const message = `${winner}'s heart is full of love!`;
        typeMessage(message, () => {
            messageText.innerHTML += '<br>Play Again?';
            messageText.style.cursor = 'pointer';
            messageText.addEventListener('click', resetGame, { once: true });
        });
    }

    function resetGame() {
        justin.love = 0;
        liam.love = 0;
        updateHP(justin, 0);
        updateHP(liam, 0);
        
        isPlayerTurn = true;
        gameOver = false;
        
        actionMenu.style.display = 'block';
        messageText.style.cursor = 'default';
        
        typeMessage('What will Justin do?');
    }

    function playerTurn(action) {
        if (!isPlayerTurn || gameOver) return;

        isPlayerTurn = false;
        actionMenu.style.display = 'none';
        
        typeMessage(action.message, () => {
            updateHP(liam, action.damage);
            showHeartEffect(liam);
            liam.spriteElement.classList.add('shake');
            setTimeout(() => liam.spriteElement.classList.remove('shake'), 500);

            if (!checkWinCondition()) {
                setTimeout(opponentTurn, 2000);
            }
        });
    }
    
    function opponentTurn() {
        if (gameOver) return;

        const action = opponentActions[Math.floor(Math.random() * opponentActions.length)];
        
        typeMessage(action.message, () => {
            updateHP(justin, action.damage);
            showHeartEffect(justin);
            justin.spriteElement.classList.add('shake');
            setTimeout(() => justin.spriteElement.classList.remove('shake'), 500);

            if (!checkWinCondition()) {
                isPlayerTurn = true;
                actionMenu.style.display = 'block';
                typeMessage('What will Justin do?');
            }
        });
    }

    // Event Listeners
    document.getElementById('down-button').addEventListener('click', () => {
        if (!isPlayerTurn || gameOver) return;
        currentActionIndex = (currentActionIndex + 1) % actionItems.length;
        updateActionMenu();
    });

    document.getElementById('up-button').addEventListener('click', () => {
        if (!isPlayerTurn || gameOver) return;
        currentActionIndex = (currentActionIndex - 1 + actionItems.length) % actionItems.length;
        updateActionMenu();
    });

    const selectAction = () => {
        if (!isPlayerTurn || gameOver) return;
        const selectedAction = playerActions[currentActionIndex];
        playerTurn(selectedAction);
        justin.spriteElement.classList.add('jump');
        setTimeout(() => justin.spriteElement.classList.remove('jump'), 500);
    };

    document.getElementById('a-button').addEventListener('click', selectAction);
