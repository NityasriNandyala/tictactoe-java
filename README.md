# 🎮 Tic-Tac-Toe (Web & Java Desktop)

A feature-rich Tic-Tac-Toe application available in two editions:
1. **🌐 Modern Web Edition** (Mobile-style responsive UI with Solo vs Bot, Friend Mode, Authentication, and GitHub Pages support).
2. **☕ Classic Java Swing Desktop Edition** (Standalone GUI with persistent score tracking and dynamic restart button).

---

## 🌐 Web Edition (GitHub Pages)

Play the interactive game in any mobile or desktop browser without installing anything!

- **🔗 Live Demo**: [https://nityasrinandyala.github.io/tictactoe-java/](https://nityasrinandyala.github.io/tictactoe-java/)

### 📱 User Flow & Features

```text
Login / Guest ➔ Create Account ➔ Home ➔ Game Rules ➔ Play Solo / Play with Friend ➔ Game
```

- **🎮 Mobile-Style Dark Blue UI**: Custom mobile shell on desktop, native fullscreen on smartphones.
- **🔐 Login & 📝 Create Account**: Demo user authentication stored in browser `localStorage`. Includes a one-click **⚡ Instant Play as Guest** button.
- **👤 Interactive Home Screen**: Status bar clock, user avatar, theme toggle, and game mode selection.
- **📖 Game Rules Screen**: Illustrated visual rule cards with mini 3x3 diagrams for **WIN**, **DEFEAT**, and **DRAW**.
- **🤖 Easy Mode (vs Bot)**: Play as coral `○` against an AI bot playing neon green `✕` with realistic response timing.
- **👥 Friend Mode**: Pass-and-play on the same device with alternating turns.
- **🏆 Persistent Score Keeping**: Automatically tracks and stores your wins and losses across matches in `localStorage`.
- **🔄 Reset Game**: Instantly clears the 3x3 board for a rematch without losing your overall score.
- **🔊 Web Audio API Sound FX**: Built-in synthesized sound effects for placement, victory, defeat, and draw without external media dependencies.

### 🌐 GitHub Pages Deployment Guide

To host this web edition on your own GitHub account:

1. Push this repository to GitHub on the `main` branch.
2. Go to your repository on GitHub: **`https://github.com/NityasriNandyala/tictactoe-java`**.
3. Click on the **Settings** tab (gear icon at the top).
4. In the left sidebar, click on **Pages** (under the "Code and automation" section).
5. Under **Build and deployment**:
   - **Source**: Select `Deploy from a branch`.
   - **Branch**: Choose `main` and set the folder to `/ (root)`.
   - Click **Save**.
6. Wait 1–2 minutes. GitHub will provide your live URL:
   ```text
   https://<your-username>.github.io/tictactoe-java/
   ```

---

## ☕ Java Swing Desktop Edition

For users running the local desktop version with Java.

### ✨ Features
- **2-Player Interactive Board**: 3x3 grid for Player X and Player O.
- **Persistent Score Tracking**: Tracks wins for Player X and Player O across rounds.
- **Smart Restart Button (`JButton`)**: Activates automatically on win or tie; disabled during active play.
- **Visual Status Indicators**: Highlights winning lines in green (`Color.green`) and ties in orange (`Color.orange`).
- **Dark Theme**: Modern dark gray and white Swing palette.

### 🛠️ Prerequisites & Installation

- **JDK 8 or newer** (JDK 17 or 21 recommended).
- Optional installation on Windows via Command Prompt (Administrator):
  ```cmd
  winget install --id Microsoft.OpenJDK.21 -e --source winget
  ```
  Verify with:
  ```cmd
  java -version
  javac -version
  ```

### 🚀 How to Run the Java Edition

```cmd
cd /d "C:\Users\nandy\Downloads\tictactoe-java-master\tictactoe-java-master"
javac *.java
java App
```

---

## 📁 Repository Structure

```text
tictactoe-java/
├── index.html        # Web app markup (Login, Register, Home, Rules, Game)
├── style.css         # Responsive mobile-style dark blue stylesheet
├── script.js         # Game engine, AI logic, local authentication, sound synthesis
├── App.java          # Java desktop application entry point
├── TicTacToe.java    # Java Swing GUI layout, listeners, and score tracking
└── README.md         # Complete documentation and deployment guide
```

---

## 🎯 Gameplay Rules

1. Player 1 starts the game by marking an empty square.
2. Players take turns selecting empty squares on the 3x3 board.
3. The first player to align 3 consecutive marks horizontally, vertically, or diagonally wins the match.
4. If all 9 squares are filled without a 3-in-a-row combination, the match ends in a draw.
5. Click **Reset Game** to play again.
