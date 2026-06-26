# Quiz App

A lightweight, interactive quiz application built with vanilla HTML, CSS, and JavaScript. Users select a programming category and answer 10 randomized multiple-choice questions, each with a 60-second countdown timer.

---

## Features

- **4 Quiz Categories** — HTML, CSS, JavaScript, PHP
- **Randomized Questions** — 10 questions picked randomly from a pool of 15 per category
- **Countdown Timer** — 60 seconds per question, auto-submits when time runs out
- **Progress Bullets** — Visual indicator showing current question position
- **Answer Validation** — Warns the user if no answer is selected before submitting
- **Final Results** — Displays score with a Perfect / Good / Bad rating at the end

---

## Project Structure

```
quiz-app/
├── index.html        # App markup and layout
├── style.css         # All styles and responsive design
├── main.js           # App logic (questions, timer, scoring)
└── question.json     # Question bank (4 categories × 15 questions)
```

---

## How It Works

1. User selects a category (HTML, CSS, JavaScript, or PHP)
2. 10 questions are randomly selected from the chosen category
3. For each question, the user picks one of 4 answers and clicks **Submit Answer**
4. If no answer is selected, a warning message appears and the question stays
5. The countdown timer runs for 60 seconds — if it reaches zero, the answer is auto-submitted
6. After all 10 questions, the final score is displayed

---

## Scoring

| Result | Condition |
|--------|-----------|
| Perfect | All 10 answers correct |
| Good | More than 5 correct |
| Bad | 5 or fewer correct |

---

## Getting Started

No installation or build tools required. Just open `index.html` in your browser.

> **Note:** The app fetches `question.json` via XMLHttpRequest, so it must be served from a local server (not opened directly as a file).

**Using VS Code Live Server:**
1. Install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension
2. Right-click `index.html` → **Open with Live Server**

**Using Python:**
```bash
python -m http.server 5500
```
Then visit `http://localhost:5500`

---

## Technologies Used

- HTML5
- CSS3 (Flexbox, Custom Properties)
- Vanilla JavaScript (DOM, XMLHttpRequest, setInterval)
- JSON (question data)

---

## Future Improvements

- Add a restart / play again button after results
- Track and display which answers were wrong
- Add more categories and questions
- Store high scores using localStorage
- Add difficulty levels (Easy / Medium / Hard)
