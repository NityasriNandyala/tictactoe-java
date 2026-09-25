# 🎮 Tic-Tac-Toe (Java Swing)

A modern, desktop Tic-Tac-Toe game developed in Java using the **Swing** and **AWT** graphical libraries. Features a sleek dark theme, real-time score keeping across multiple rounds, visual win/tie highlights, and a dynamic game restart button.

---

## ✨ Features

- **🎮 2-Player Interactive Board**: Classic 3x3 grid for Player X and Player O.
- **🏆 Persistent Score Keeping**: Tracks total wins for Player X and Player O across rounds without resetting between games.
- **🔄 Smart Restart Button (`JButton`)**:
  - Automatically activates whenever a game ends in a win or tie.
  - Disabled during active play to prevent accidental resets.
  - Seamlessly clears the board and begins a new round with Player X.
- **🎨 Visual Status Indicators**:
  - **Winning Line**: Highlights the 3 winning tiles in vibrant **green** (`Color.green`).
  - **Tie Game**: Highlights all tiles in **orange** (`Color.orange`) when all 9 turns end in a draw.
  - **Turn Indicator**: Real-time header updates indicating whose turn it is (`X's turn.` / `O's turn.`).
- **🌙 Sleek Dark Mode UI**: Modern dark gray and white color palette with custom typography.

---

## 📁 Project Structure

```text
tictactoe-java/
├── App.java          # Entry point (initializes the game instance)
├── TicTacToe.java    # Complete GUI layout, event listeners, and game logic
└── README.md         # Comprehensive project documentation
```

---

## 🛠️ Prerequisites & Installation

### Requirements
- **Java Development Kit (JDK)**: Version 8 or newer (JDK 17 or 21 recommended).
- **Operating System**: Windows, macOS, or Linux.

### Installing Java on Windows (Optional)
If `javac` or `java` is not yet installed or recognized in your terminal, open Command Prompt as Administrator and run:

```cmd
winget install --id Microsoft.OpenJDK.21 -e --source winget
```

After installation, close and reopen Command Prompt and verify:

```cmd
java -version
javac -version
```

---

## 🚀 How to Run

### Option 1: Command Line (CMD / PowerShell / Terminal)

1. **Navigate to the project directory**:
   ```cmd
   cd /d "C:\Users\nandy\Downloads\tictactoe-java-master\tictactoe-java-master"
   ```

2. **Compile the source files**:
   ```cmd
   javac *.java
   ```

3. **Run the game**:
   ```cmd
   java App
   ```

---

### Option 2: Visual Studio Code

1. Open the project folder in **VS Code**.
2. Ensure the **Extension Pack for Java** is installed.
3. Open `App.java` and click the **Run** button (or press `F5`).

---

## 🎯 How to Play

1. **Start Game**: The application opens with Player X's turn by default.
2. **Make a Move**: Click any empty square on the 3x3 board to place your mark.
3. **Turn Progression**: Moves alternate automatically between Player X and Player O.
4. **Winning**: The first player to align 3 consecutive marks horizontally, vertically, or diagonally wins the match:
   - The winning tiles turn **green**.
   - The winner is announced in the header.
   - The winner's score increments by 1.
5. **Draw / Tie**: If all 9 tiles are filled without a 3-in-a-row combination:
   - All tiles turn **orange**.
   - The header displays `"Tie!"`.
6. **Play Again**: Click **Restart Game** at the bottom to reset the board. Scores remain saved so you can play a full series!

---

## 🧠 Technical Overview

- **Framework**: Java Swing (`JFrame`, `JPanel`, `JButton`, `JLabel`, `BorderLayout`, `GridLayout`).
- **Game State Management**:
  - 2D array of `JButton[3][3]` for tile management and text checking.
  - State flags: `gameOver` boolean and `turns` integer counter.
  - Dedicated score variables (`playerXScore`, `playerOScore`) that persist independently of board resets.
- **Event-Driven Architecture**: Action listeners attached to board tiles and control buttons for reactive UI updates without external dependencies.

---


