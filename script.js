/* ==========================================================
   TIC-TAC-TOE GAME ENGINE & FLOW CONTROLLER
   ========================================================== */

// --- Audio Synthesizer (Zero-dependency Web Audio API) ---
class SoundController {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  playPop(freq = 440) {
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, this.ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.09);
    } catch (_) {}
  }

  playWin() {
    try {
      this.init();
      if (!this.ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C E G C
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.09);
        gain.gain.setValueAtTime(0.18, this.ctx.currentTime + idx * 0.09);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.09 + 0.25);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + idx * 0.09);
        osc.stop(this.ctx.currentTime + idx * 0.09 + 0.26);
      });
    } catch (_) {}
  }

  playDefeat() {
    try {
      this.init();
      if (!this.ctx) return;
      const notes = [440, 392, 349.23, 293.66];
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.1);
        gain.gain.setValueAtTime(0.1, this.ctx.currentTime + idx * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.1 + 0.2);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + idx * 0.1);
        osc.stop(this.ctx.currentTime + idx * 0.1 + 0.21);
      });
    } catch (_) {}
  }
}

const sounds = new SoundController();

// --- Screen Router ---
const screens = {
  login: document.getElementById('loginScreen'),
  register: document.getElementById('registerScreen'),
  home: document.getElementById('homeScreen'),
  rules: document.getElementById('rulesScreen'),
  game: document.getElementById('gameScreen')
};

let previousScreen = 'home';

function navigateTo(screenKey) {
  Object.keys(screens).forEach(key => {
    if (screens[key].classList.contains('active')) {
      previousScreen = key;
      screens[key].classList.remove('active');
    }
  });

  if (screens[screenKey]) {
    screens[screenKey].classList.add('active');
  }
}

function showToast(message) {
  const toast = document.getElementById('toastNotification');
  toast.textContent = message;
  toast.classList.add('active');
  setTimeout(() => toast.classList.remove('active'), 2400);
}

// Update clock in phone status bar
function updateStatusBarTime() {
  const timeEl = document.getElementById('currentTime');
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  timeEl.textContent = `${hours}:${minutes}`;
}
setInterval(updateStatusBarTime, 10000);
updateStatusBarTime();

// --- User Profile & Authentication ---
const USER_KEY = 'ttt_auth_user';
const USERS_LIST_KEY = 'ttt_registered_users';

function getStoredUser() {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY));
  } catch (_) {
    return null;
  }
}

function setStoredUser(userObj) {
  localStorage.setItem(USER_KEY, JSON.stringify(userObj));
}

function getStoredUsersList() {
  try {
    return JSON.parse(localStorage.getItem(USERS_LIST_KEY)) || [];
  } catch (_) {
    return [];
  }
}

function saveUserToList(userObj) {
  const users = getStoredUsersList();
  const existingIdx = users.findIndex(u => u.email.toLowerCase() === userObj.email.toLowerCase());
  if (existingIdx >= 0) {
    users[existingIdx] = userObj;
  } else {
    users.push(userObj);
  }
  localStorage.setItem(USERS_LIST_KEY, JSON.stringify(users));
}

function setupUserProfileUI(user) {
  const name = user ? user.name : 'Player';
  document.getElementById('userDisplayName').textContent = name;
  document.getElementById('userAvatar').textContent = name.charAt(0).toUpperCase();
}

// Check session on load
let currentUser = getStoredUser();
if (currentUser) {
  setupUserProfileUI(currentUser);
  navigateTo('home');
} else {
  navigateTo('login');
}

// --- Auth Event Listeners ---
document.getElementById('toRegisterBtn').addEventListener('click', () => navigateTo('register'));
document.getElementById('toLoginBtn').addEventListener('click', () => navigateTo('login'));

document.getElementById('loginForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;

  const users = getStoredUsersList();
  const matched = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);

  if (matched) {
    currentUser = matched;
    setStoredUser(matched);
    setupUserProfileUI(matched);
    showToast(`Welcome back, ${matched.name}!`);
    navigateTo('home');
  } else {
    // If no exact match, allow demo login or hint to register
    if (users.length === 0) {
      // First time demo user
      const guest = { name: email.split('@')[0] || 'Player', email, password };
      saveUserToList(guest);
      currentUser = guest;
      setStoredUser(guest);
      setupUserProfileUI(guest);
      showToast('Welcome to Tic-Tac-Toe!');
      navigateTo('home');
    } else {
      showToast('Invalid credentials. Check email & password or create account.');
    }
  }
});

document.getElementById('registerForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('regName').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const password = document.getElementById('regPassword').value;

  if (password.length < 4) {
    showToast('Password must be at least 4 characters');
    return;
  }

  const newUser = { name, email, password };
  saveUserToList(newUser);
  currentUser = newUser;
  setStoredUser(newUser);
  setupUserProfileUI(newUser);
  showToast(`Account created! Welcome, ${name}!`);
  navigateTo('home');
});

// Instant Guest Play button
document.getElementById('guestPlayBtn').addEventListener('click', () => {
  currentUser = { name: 'Guest Player', email: 'guest@demo.local', isGuest: true };
  setStoredUser(currentUser);
  setupUserProfileUI(currentUser);
  showToast('Playing as Guest');
  navigateTo('home');
});

// Logout
document.getElementById('homeLogoutBtn').addEventListener('click', () => {
  localStorage.removeItem(USER_KEY);
  currentUser = null;
  showToast('Logged out');
  navigateTo('login');
});

// --- Navigation Buttons ---
document.getElementById('openRulesBtn').addEventListener('click', () => {
  navigateTo('rules');
});

document.getElementById('rulesBackBtn').addEventListener('click', () => {
  navigateTo(previousScreen === 'game' ? 'game' : 'home');
});

document.getElementById('rulesStartPlayBtn').addEventListener('click', () => {
  startNewGameSession('solo');
});

document.getElementById('gameBackBtn').addEventListener('click', () => {
  navigateTo('home');
});

document.getElementById('gameRulesQuickBtn').addEventListener('click', () => {
  navigateTo('rules');
});

document.getElementById('openRulesFromGameBtn').addEventListener('click', () => {
  navigateTo('rules');
});

// Theme toggle
let isDarkTheme = true;
document.getElementById('themeToggleBtn').addEventListener('click', () => {
  isDarkTheme = !isDarkTheme;
  document.body.style.filter = isDarkTheme ? 'none' : 'hue-rotate(180deg) brightness(1.05)';
  showToast(isDarkTheme ? 'Dark Mode' : 'Alt Theme');
});

// ==========================================================
// GAMEPLAY LOGIC & STATE
// ==========================================================

let gameMode = 'solo'; // 'solo' (Easy Mode vs Bot) or 'friend' (Play with Friend)
let boardState = ['', '', '', '', '', '', '', '', ''];
let currentTurn = 'X'; // X or O
let isGameActive = true;
let player1Score = 0;
let player2Score = 0;

// Symbol definitions matching mockup screenshot:
// You = O (coral), Bot = X (neon green) OR standard X / O
const SYMBOL_PLAYER1 = 'O'; // Coral circle
const SYMBOL_PLAYER2 = 'X'; // Neon green cross

const cells = document.querySelectorAll('.grid-cell');
const turnTextEl = document.getElementById('gameTurnText');
const player1ScoreEl = document.getElementById('player1Score');
const player2ScoreEl = document.getElementById('player2Score');
const player1LabelEl = document.getElementById('player1Label');
const player2LabelEl = document.getElementById('player2Label');
const modeHeaderTitleEl = document.getElementById('modeHeaderTitle');

const WINNING_COMBOS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Persistent Score Storage Key per user
function getScoreStorageKey() {
  const email = currentUser ? currentUser.email : 'guest';
  return `ttt_scores_${email}_${gameMode}`;
}

function loadSavedScores() {
  try {
    const raw = localStorage.getItem(getScoreStorageKey());
    if (raw) {
      const data = JSON.parse(raw);
      player1Score = data.p1 || 0;
      player2Score = data.p2 || 0;
    } else {
      player1Score = 0;
      player2Score = 0;
    }
  } catch (_) {
    player1Score = 0;
    player2Score = 0;
  }
  updateScoreboardDisplay();
}

function saveScores() {
  try {
    localStorage.setItem(getScoreStorageKey(), JSON.stringify({
      p1: player1Score,
      p2: player2Score
    }));
  } catch (_) {}
}

function updateScoreboardDisplay() {
  player1ScoreEl.textContent = player1Score;
  player2ScoreEl.textContent = player2Score;
}

// Start a game session in given mode
function startNewGameSession(mode) {
  gameMode = mode;
  if (gameMode === 'solo') {
    modeHeaderTitleEl.textContent = 'Easy Mode';
    player1LabelEl.textContent = 'You :';
    player2LabelEl.textContent = 'Bot :';
  } else {
    modeHeaderTitleEl.textContent = 'Friend Mode';
    player1LabelEl.textContent = 'Player 1 :';
    player2LabelEl.textContent = 'Player 2 :';
  }

  loadSavedScores();
  resetBoard();
  navigateTo('game');
}

document.getElementById('playSoloBtn').addEventListener('click', () => startNewGameSession('solo'));
document.getElementById('playFriendBtn').addEventListener('click', () => startNewGameSession('friend'));
document.getElementById('resetGameBtn').addEventListener('click', () => {
  sounds.playPop(520);
  resetBoard();
});

// Reset the 3x3 board without resetting scores
function resetBoard() {
  boardState = ['', '', '', '', '', '', '', '', ''];
  isGameActive = true;
  currentTurn = SYMBOL_PLAYER1; // Player 1 (You) starts with 'O'

  turnTextEl.className = 'turn-text';
  turnTextEl.textContent = 'Your Turn';

  cells.forEach(cell => {
    cell.textContent = '';
    cell.className = 'grid-cell';
    cell.disabled = false;
  });
}

// Handle cell click
cells.forEach(cell => {
  cell.addEventListener('click', () => {
    const index = parseInt(cell.getAttribute('data-idx'), 10);
    handleCellClick(index);
  });
});

function handleCellClick(index) {
  if (!isGameActive || boardState[index] !== '') return;

  // Make move for current player
  makeMove(index, currentTurn);

  const winCombo = checkWinCondition(currentTurn);
  if (winCombo) {
    handleGameWin(winCombo, currentTurn);
    return;
  }

  if (isBoardFull()) {
    handleGameDraw();
    return;
  }

  // Switch turn
  if (gameMode === 'solo') {
    currentTurn = SYMBOL_PLAYER2; // Bot's turn
    turnTextEl.textContent = "Bot's Turn";
    turnTextEl.className = 'turn-text';

    // Disable board while bot thinks
    isGameActive = false;
    setTimeout(botTurnRoutine, 420);
  } else {
    currentTurn = currentTurn === SYMBOL_PLAYER1 ? SYMBOL_PLAYER2 : SYMBOL_PLAYER1;
    turnTextEl.textContent = currentTurn === SYMBOL_PLAYER1 ? "Player 1's Turn" : "Player 2's Turn";
  }
}

function makeMove(index, symbol) {
  boardState[index] = symbol;
  const cell = cells[index];
  cell.textContent = symbol;
  cell.classList.add(symbol === SYMBOL_PLAYER1 ? 'cell-o' : 'cell-x');
  cell.disabled = true;

  sounds.playPop(symbol === SYMBOL_PLAYER1 ? 480 : 360);
}

// Bot AI for "Easy Mode"
function botTurnRoutine() {
  if (isBoardFull()) return;

  // Easy mode:
  // 1. If bot can win this turn, take the win.
  // 2. 60% chance to block player's immediate win.
  // 3. Otherwise pick an empty cell randomly.
  const emptyIndices = boardState
    .map((val, idx) => (val === '' ? idx : null))
    .filter(val => val !== null);

  if (emptyIndices.length === 0) return;

  let chosenMove = null;

  // Check if bot can win
  for (const idx of emptyIndices) {
    boardState[idx] = SYMBOL_PLAYER2;
    if (checkWinCondition(SYMBOL_PLAYER2)) {
      chosenMove = idx;
      boardState[idx] = '';
      break;
    }
    boardState[idx] = '';
  }

  // Check if bot should block player (70% probability in Easy Mode)
  if (chosenMove === null && Math.random() < 0.7) {
    for (const idx of emptyIndices) {
      boardState[idx] = SYMBOL_PLAYER1;
      if (checkWinCondition(SYMBOL_PLAYER1)) {
        chosenMove = idx;
        boardState[idx] = '';
        break;
      }
      boardState[idx] = '';
    }
  }

  // Otherwise random
  if (chosenMove === null) {
    chosenMove = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  }

  isGameActive = true;
  makeMove(chosenMove, SYMBOL_PLAYER2);

  const winCombo = checkWinCondition(SYMBOL_PLAYER2);
  if (winCombo) {
    handleGameWin(winCombo, SYMBOL_PLAYER2);
    return;
  }

  if (isBoardFull()) {
    handleGameDraw();
    return;
  }

  currentTurn = SYMBOL_PLAYER1;
  turnTextEl.textContent = 'Your Turn';
  turnTextEl.className = 'turn-text';
}

function checkWinCondition(symbol) {
  for (const combo of WINNING_COMBOS) {
    const [a, b, c] = combo;
    if (boardState[a] === symbol && boardState[b] === symbol && boardState[c] === symbol) {
      return combo;
    }
  }
  return null;
}

function isBoardFull() {
  return boardState.every(cell => cell !== '');
}

function handleGameWin(winCombo, winnerSymbol) {
  isGameActive = false;

  // Highlight winning cells
  winCombo.forEach(idx => {
    cells[idx].classList.add('winning-cell');
  });

  if (winnerSymbol === SYMBOL_PLAYER1) {
    player1Score++;
    turnTextEl.textContent = gameMode === 'solo' ? 'You Win! 🎉' : 'Player 1 Wins! 🎉';
    turnTextEl.className = 'turn-text win';
    sounds.playWin();
  } else {
    player2Score++;
    turnTextEl.textContent = gameMode === 'solo' ? 'Bot Wins! 🤖' : 'Player 2 Wins! 🎉';
    turnTextEl.className = 'turn-text defeat';
    sounds.playDefeat();
  }

  saveScores();
  updateScoreboardDisplay();
}

function handleGameDraw() {
  isGameActive = false;
  turnTextEl.textContent = "It's a Draw! 🤝";
  turnTextEl.className = 'turn-text draw';
  sounds.playPop(300);
}
