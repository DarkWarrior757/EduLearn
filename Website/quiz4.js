const questions = [

    {
        question: "Which of these is an acidic substance?",
        options: [
            "Lemon juice",
            "Soap solution",
            "Baking soda solution",
            "Lime water"
        ],
        answer: "Lemon juice",
        explanation:
            "Lemon juice contains citric acid, so it is acidic."
    },

    {
        question: "Which of these is generally a property of bases?",
        options: [
            "Sour taste",
            "Bitter taste",
            "Sweet taste",
            "Salty taste"
        ],
        answer: "Bitter taste",
        explanation:
            "Bases generally have a bitter taste and can feel soapy."
    },

    {
        question: "Which substance can be used as a natural indicator?",
        options: [
            "Turmeric",
            "Sugar",
            "Salt",
            "Water"
        ],
        answer: "Turmeric",
        explanation:
            "Turmeric is a natural indicator that changes colour in the presence of a base."
    },

    {
        question: "What colour does blue litmus turn in an acidic solution?",
        options: [
            "Blue",
            "Green",
            "Red",
            "Yellow"
        ],
        answer: "Red",
        explanation:
            "Acids turn blue litmus paper red."
    },

    {
        question: "What colour does red litmus turn in a basic solution?",
        options: [
            "Blue",
            "Red",
            "Yellow",
            "Green"
        ],
        answer: "Blue",
        explanation:
            "Bases turn red litmus paper blue."
    },

    {
        question: "What happens during a neutralisation reaction?",
        options: [
            "An acid reacts with a base",
            "Two acids react",
            "Two bases react",
            "Water becomes an acid"
        ],
        answer: "An acid reacts with a base",
        explanation:
            "Neutralisation occurs when an acid reacts with a base, generally producing salt and water."
    },

    {
        question: "Which of these is commonly used to relieve acidity in the stomach?",
        options: [
            "Antacid",
            "Vinegar",
            "Lemon juice",
            "Orange juice"
        ],
        answer: "Antacid",
        explanation:
            "Antacids contain basic substances that help neutralise excess acid in the stomach."
    },

    {
        question: "What is formed when an acid reacts with a base?",
        options: [
            "Only oxygen",
            "Salt and water",
            "Only carbon dioxide",
            "Only hydrogen"
        ],
        answer: "Salt and water",
        explanation:
            "A typical neutralisation reaction between an acid and a base produces salt and water."
    },

    {
        question: "Which of these is a common acid found in vinegar?",
        options: [
            "Citric acid",
            "Acetic acid",
            "Hydrochloric acid",
            "Sulphuric acid"
        ],
        answer: "Acetic acid",
        explanation:
            "Vinegar contains acetic acid."
    },

    {
        question: "Which of these is a common natural indicator?",
        options: [
            "Litmus",
            "Sugar",
            "Starch",
            "Salt"
        ],
        answer: "Litmus",
        explanation:
            "Litmus is a natural indicator obtained from lichens and is commonly used to test acids and bases."
    }

];


let currentQuestion = 0;

let userAnswers =
    new Array(questions.length).fill(null);

let timeLeft = 10 * 60;


const quizContainer =
    document.getElementById("quiz-container");

const nextButton =
    document.getElementById("next-button");

const previousButton =
    document.getElementById("previous-button");

const submitButton =
    document.getElementById("submit-test");

const loadingScreen =
    document.getElementById("loading-screen");

const resultScreen =
    document.getElementById("result-screen");

const timerElement =
    document.getElementById("time");


showQuestion();


// SHOW QUESTION

function showQuestion() {

    const q = questions[currentQuestion];

    quizContainer.innerHTML = `

        <div class="question-number">
            Question ${currentQuestion + 1} of ${questions.length}
        </div>

        <h2>${q.question}</h2>

        <div class="options">

            ${q.options.map(option => `

                <label class="option">

                    <input
                        type="radio"
                        name="answer"
                        value="${option}"
                        ${userAnswers[currentQuestion] === option
                            ? "checked"
                            : ""}
                    >

                    <span>${option}</span>

                </label>

            `).join("")}

        </div>
    `;


    if (currentQuestion === 0) {

        previousButton.style.display = "none";

    } else {

        previousButton.style.display = "block";

    }


    if (currentQuestion === questions.length - 1) {

        nextButton.style.display = "none";

        submitButton.style.display = "block";

    } else {

        nextButton.style.display = "block";

        submitButton.style.display = "none";

    }
}


// SAVE ANSWER

function saveAnswer() {

    const selected =
        document.querySelector(
            'input[name="answer"]:checked'
        );

    if (selected) {

        userAnswers[currentQuestion] =
            selected.value;

    }
}


// NEXT

nextButton.addEventListener("click", () => {

    saveAnswer();

    if (currentQuestion < questions.length - 1) {

        currentQuestion++;

        showQuestion();

    }

});


// PREVIOUS

previousButton.addEventListener("click", () => {

    saveAnswer();

    if (currentQuestion > 0) {

        currentQuestion--;

        showQuestion();

    }

});


// SUBMIT

submitButton.addEventListener("click", () => {

    saveAnswer();

    finishQuiz();

});


// FINISH QUIZ

function finishQuiz() {

    document.querySelector(".quiz-page").style.display =
        "none";

    loadingScreen.style.display = "flex";


    setTimeout(() => {

        loadingScreen.style.display = "none";

        resultScreen.style.display = "block";

        showResults();

    }, 2000);

}


// RESULTS

function showResults() {

    let score = 0;


    questions.forEach((question, index) => {

        if (userAnswers[index] === question.answer) {

            score++;

        }

    });


    document.getElementById("score").innerHTML = `

        <div class="score-circle">

            ${score}/${questions.length}

        </div>

        <h2>
            You got ${score} out of ${questions.length} correct!
        </h2>

    `;


    const answersContainer =
        document.getElementById("answers");

    answersContainer.innerHTML = "";


    questions.forEach((question, index) => {

        const userAnswer =
            userAnswers[index] || "Not answered";

        const correct =
            userAnswer === question.answer;


        const answerCard =
            document.createElement("div");


        answerCard.className =
            correct
                ? "answer-card correct"
                : "answer-card wrong";


        answerCard.innerHTML = `

            <h3>
                ${index + 1}. ${question.question}
            </h3>

            <p>
                <strong>Your answer:</strong>
                ${userAnswer}
            </p>

            <p>
                <strong>Correct answer:</strong>
                ${question.answer}
            </p>

            <p>
                💡 <strong>Explanation:</strong>
                ${question.explanation}
            </p>

        `;


        answersContainer.appendChild(answerCard);

    });

}


// 10 MINUTE TIMER

const timer = setInterval(() => {

    const minutes =
        Math.floor(timeLeft / 60);

    const seconds =
        timeLeft % 60;


    timerElement.textContent =
        `${minutes}:${seconds
            .toString()
            .padStart(2, "0")}`;


    if (timeLeft <= 120 && timeLeft > 60) {

        timerElement.style.color = "orange";

    }


    if (timeLeft <= 60) {

        timerElement.style.color = "red";

    }


    if (timeLeft <= 0) {

        clearInterval(timer);

        alert(
            "⏰ Time's up! Your test will be submitted."
        );

        finishQuiz();

        return;

    }


    timeLeft--;

}, 1000);