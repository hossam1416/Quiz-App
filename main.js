//  SELECT ELEMENTS
let mainScreen = document.querySelector(".quiz-app");
let langScreen = document.querySelector(".language-selection");
let countSpan = document.querySelector(".count span");
let bullets = document.querySelector(".bullets");
let bulletsSpanContainer = document.querySelector(".bullets .spans");
let quizArea = document.querySelector(".quiz-area");
let answersArea = document.querySelector(".answers-area");
let submitButton = document.querySelector(".submit-button");
let resultsContainer = document.querySelector(".results");
let countDownElement = document.querySelector(".countdown");
let categoryName = document.querySelector(".category span");
let warningMessage = document.querySelector(".warning-message");

// GLOBAL VARIABLES
let currentIndex = 0; // current question index
let rightAnswers = 0; // correct answers counter
let countDownInterval; // timer reference to allow stopping it

// LANGUAGE BUTTONS
// when the user clicks a language, hide the selection screen and start the quiz
let langButtons = document.querySelectorAll(".lang-buttons button");
langButtons.forEach((button) => {
  button.addEventListener("click", function () {
    let lang = button.getAttribute("data-lang"); // read language name from data-lang
    langScreen.style.display = "none"; // hide the selection screen
    mainScreen.classList.remove("none"); // show the quiz screen
    getQuestion(lang); // start the quiz with the selected language
    categoryName.innerHTML = lang;
  });
});

//  GET QUESTION
// fetch the JSON and start the quiz based on the selected language
function getQuestion(lang) {
  let myRequest = new XMLHttpRequest();
  myRequest.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let questionObject = JSON.parse(this.responseText); // parse JSON into an object
      let question = questionObject[lang]; // get the array for the selected language
      let qCount = 10; // number of questions
      question = getRandomQuestion(question, qCount);
      createBullets(qCount); // create the bullet indicators
      addQestionData(question[currentIndex], qCount); // display the first question
      countDown(60, qCount); // start the countdown timer

      // SUBMIT BUTTON - when the user clicks Submit
      submitButton.onclick = () => {
        warningMessage.innerHTML = "";
        warningMessage.classList.add("none");
        // check if the user selected an answer
        let answers = document.getElementsByName("question");
        let isAnswerSelected = Array.from(answers).some(
          (answer) => answer.checked,
        );
        if (!isAnswerSelected) {
          warningMessage.classList.remove("none");
          warningMessage.innerHTML = "Please select an answer"; // if nothing selected, stop
          return;
        }

        let theRightAnswer = question[currentIndex].right_answer; // correct answer for current question
        currentIndex++; // move to the next question
        checkAnswer(theRightAnswer, qCount); // check the user's answer

        quizArea.innerHTML = ""; // clear the old question
        answersArea.innerHTML = ""; // clear the old answers

        addQestionData(question[currentIndex], qCount); // display the new question
        handleBullets(); // update the active bullet
        clearInterval(countDownInterval); // stop the old timer
        countDown(60, qCount); // start a new timer
        showResults(qCount); // check if all questions are done
      };
    }
  };
  myRequest.open("GET", "question.json", true);
  myRequest.send();
}

//  CREATE BULLETS
// create the bullet indicators that show the current question number
function createBullets(num) {
  countSpan.innerHTML = currentIndex + 1; // display total question count
  for (let i = 0; i < num; i++) {
    let theBullets = document.createElement("span");
    if (i === 0) theBullets.className = "on"; // first bullet starts active
    theBullets.innerHTML = i + 1;
    bulletsSpanContainer.appendChild(theBullets);
  }
}

//  ADD QUESTION DATA
// render the question title and its 4 answer options on the page
function addQestionData(obj, count) {
  if (currentIndex < count) {
    // display the question title
    let questionTitle = document.createElement("h2");
    questionTitle.appendChild(document.createTextNode(obj.title));
    quizArea.appendChild(questionTitle);

    // display the 4 answer options
    for (let i = 1; i <= 4; i++) {
      let mainDiv = document.createElement("div");
      mainDiv.className = "answer";

      let radioInput = document.createElement("input");
      radioInput.name = "question";
      radioInput.type = "radio";
      radioInput.id = `answer_${i}`;
      radioInput.dataset.answer = obj[`answer_${i}`]; // store the answer in a data attribute

      let theLabel = document.createElement("label");
      theLabel.htmlFor = `answer_${i}`;
      theLabel.appendChild(document.createTextNode(obj[`answer_${i}`]));

      mainDiv.appendChild(radioInput);
      mainDiv.appendChild(theLabel);
      answersArea.appendChild(mainDiv);
    }
  }
}

//  CHECK ANSWER
// verify the user's answer and increment the correct counter if right
function checkAnswer(rAnswer, count) {
  let answers = document.getElementsByName("question");
  let theChoosenAnswer;
  for (let i = 0; i < answers.length; i++) {
    if (answers[i].checked) {
      theChoosenAnswer = answers[i].dataset.answer; // the answer the user selected
    }
  }
  if (rAnswer === theChoosenAnswer) rightAnswers++; // increment if correct
}

//  HANDLE BULLETS
// update the active bullet to reflect the current question
function handleBullets() {
  let bulletsSpans = document.querySelectorAll(".bullets .spans span");
  Array.from(bulletsSpans).forEach((span, index) => {
    if (currentIndex === index) span.className = "on"; // highlight the current bullet
    countSpan.innerHTML = currentIndex + 1; // update the question counter display
  });
}

// SHOW RESULTS
// display the final result when all questions are answered
function showResults(count) {
  if (currentIndex === count) {
    quizArea.remove();
    answersArea.remove();
    submitButton.remove();
    bullets.remove();

    let theResults;
    if (rightAnswers === count) {
      theResults = `<span class="perfect">Perfect</span>, All Answers Is Good`;
    } else if (rightAnswers > count / 2) {
      theResults = `<span class="good">Good</span>, ${rightAnswers} From ${count}`;
    } else {
      theResults = `<span class="bad">Bad</span> , ${rightAnswers} From ${count}`;
    }

    resultsContainer.innerHTML = theResults;
    resultsContainer.classList.add("show");
  }
}

//  COUNTDOWN
// countdown timer for each question, auto-clicks Submit when time runs out
function countDown(duration, count) {
  if (currentIndex < count) {
    countDownInterval = setInterval(() => {
      let minutes = parseInt(duration / 60);
      let seconds = parseInt(duration % 60);

      minutes = minutes < 10 ? `0${minutes}` : minutes;
      seconds = seconds < 10 ? `0${seconds}` : seconds;

      countDownElement.innerHTML = `${minutes}:${seconds}`;

      if (duration <= 0) {
        clearInterval(countDownInterval);
        if (currentIndex < count) submitButton.click(); // auto-submit when time runs out
        return;
      }
      duration--;
    }, 1000);
  }
}

// RANDOM QUESTIONS
// shuffle the array and return the first (num) questions
function getRandomQuestion(array, num) {
  array.sort(() => {
    return Math.random() - 0.5;
  });
  return array.slice(0, num);
}
