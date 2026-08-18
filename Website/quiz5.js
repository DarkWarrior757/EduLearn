const questions = [

    {
        question: "Which of these is a physical change?",
        options: [
            "Burning paper",
            "Rusting iron",
            "Melting ice",
            "Cooking food"
        ],
        answer: "Melting ice",
        explanation:
            "Melting ice is a physical change because water remains the same substance."
    },

    {
        question: "Which of these is a chemical change?",
        options: [
            "Cutting paper",
            "Melting wax",
            "Rusting iron",
            "Breaking glass"
        ],
        answer: "Rusting iron",
        explanation:
            "Rusting forms a new substance called rust, so it is a chemical change."
    },

    {
        question: "What is formed when iron rusts?",
        options: [
            "Iron sulphide",
            "Rust",
            "Carbon dioxide",
            "Water"
        ],
        answer: "Rust",
        explanation:
            "Iron reacts with oxygen in the presence of moisture to form rust."
    },

    {
        question: "Which two conditions are necessary for rusting of iron?",
        options: [
            "Oxygen and moisture",
            "Carbon dioxide and sunlight",
            "Nitrogen and heat",
            "Only water"
        ],
        answer: "Oxygen and moisture",
        explanation:
            "Iron generally requires both oxygen and moisture for rusting."
    },

    {
        question: "Which of these is usually reversible?",
        options: [
            "Burning wood",
            "Rusting iron",
            "Melting ice",
            "Cooking rice"
        ],
        answer: "Melting ice",
        explanation:
            "Melted ice can be frozen again to form ice, making the change reversible."
    },

    {
        question: "Which change produces one or more new substances?",
        options: [
            "Physical change",
            "Chemical change",
            "Change of state",
            "Change in shape"
        ],
        answer: "Chemical change",
        explanation:
            "A chemical change results in the formation of one or more new substances."
    },

    {
        question: "What happens to the chemical composition during a physical change?",
        options: [
            "It changes completely",
            "A new substance is always formed",
            "It generally remains unchanged",
            "The substance disappears"
        ],
        answer: "It generally remains unchanged",
        explanation:
            "In a physical change, the substance's chemical composition generally remains the same."
    },

    {
        question: "Which of these is an example of a chemical change?",
        options: [
            "Inflating a balloon",
            "Dissolving sugar in water",
            "Burning a candle",
            "Breaking a pencil"
        ],
        answer: "Burning a candle",
        explanation:
            "Burning involves chemical reactions that form new substances."
    },

    {
        question: "What is crystallisation used for?",
        options: [
            "Separating and obtaining pure crystals of a substance",
            "Making iron rust",
            "Burning substances",
            "Measuring temperature"
        ],
        answer: "Separating and obtaining pure crystals of a substance",
        explanation:
            "Crystallisation can be used to obtain relatively pure crystals of certain substances from their solutions."
    },

    {
        question: "Which statement is correct?",
        options: [
            "All physical changes are irreversible",
            "All chemical changes are easily reversible",
            "Chemical changes generally form new substances",
            "Physical changes always produce gases"
        ],
        answer: "Chemical changes generally form new substances",
        explanation:
            "The formation of new substances is an important characteristic of chemical changes."
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


// =========================
// SHOW QUESTION
// =========================

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


// =========================
// SAVE ANSWER
// =========================

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


// =========================
// NEXT
// =========================

nextButton.addEventListener("click", () => {

    saveAnswer();

    if (currentQuestion < questions.length - 1) {

        currentQuestion++;

        showQuestion();

    }

});


// =========================
// PREVIOUS
// =========================

previousButton.addEventListener("click", () => {

    saveAnswer();

    if (currentQuestion > 0) {

        currentQuestion--;

        showQuestion();

    }

});


// =========================
// SUBMIT
// =========================

submitButton.addEventListener("click", () => {

    saveAnswer();

    finishQuiz();

});


// =========================
// FINISH QUIZ
// =========================

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


// =========================
// RESULTS
// =========================

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


// =========================
// 10 MINUTE TIMER
// =========================

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