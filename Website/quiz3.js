const questions = [
    {
        question: "What is heat?",
        options: [
            "A form of energy",
            "A type of matter",
            "A type of force",
            "A type of sound"
        ],
        answer: "A form of energy",
        explanation:
            "Heat is a form of energy that can be transferred from a hotter object to a colder object."
    },

    {
        question: "What does temperature tell us?",
        options: [
            "The weight of an object",
            "How hot or cold an object is",
            "The size of an object",
            "The amount of matter in an object"
        ],
        answer: "How hot or cold an object is",
        explanation:
            "Temperature is a measure of how hot or cold an object is."
    },

    {
        question: "Which instrument is used to measure temperature?",
        options: [
            "Barometer",
            "Thermometer",
            "Speedometer",
            "Ammeter"
        ],
        answer: "Thermometer",
        explanation:
            "A thermometer is an instrument used to measure temperature."
    },

    {
        question: "What is the normal temperature of the human body approximately?",
        options: [
            "25°C",
            "37°C",
            "50°C",
            "100°C"
        ],
        answer: "37°C",
        explanation:
            "The normal human body temperature is approximately 37°C, although it can vary slightly."
    },

    {
        question: "Heat flows naturally from:",
        options: [
            "A colder object to a hotter object",
            "A hotter object to a colder object",
            "A smaller object to a larger object",
            "A heavier object to a lighter object"
        ],
        answer: "A hotter object to a colder object",
        explanation:
            "Heat naturally transfers from an object at a higher temperature to an object at a lower temperature."
    },

    {
        question: "Which of these is a good conductor of heat?",
        options: [
            "Wood",
            "Plastic",
            "Copper",
            "Rubber"
        ],
        answer: "Copper",
        explanation:
            "Copper is a good conductor of heat, which is why metals are commonly used in cooking utensils."
    },

    {
        question: "Which of these is generally a poor conductor of heat?",
        options: [
            "Copper",
            "Aluminium",
            "Iron",
            "Wood"
        ],
        answer: "Wood",
        explanation:
            "Wood is a poor conductor of heat and therefore acts as an insulator."
    },

    {
        question: "Which method of heat transfer mainly occurs in solids?",
        options: [
            "Conduction",
            "Convection",
            "Radiation",
            "Evaporation"
        ],
        answer: "Conduction",
        explanation:
            "Conduction is the main method of heat transfer through solids."
    },

    {
        question: "Which method of heat transfer occurs mainly in liquids and gases?",
        options: [
            "Conduction",
            "Convection",
            "Radiation",
            "Reflection"
        ],
        answer: "Convection",
        explanation:
            "Convection transfers heat through the movement of fluids such as liquids and gases."
    },

    {
        question: "How does heat from the Sun reach Earth?",
        options: [
            "Conduction",
            "Convection",
            "Radiation",
            "Evaporation"
        ],
        answer: "Radiation",
        explanation:
            "Heat from the Sun reaches Earth through radiation, which does not require a material medium."
    }
];


let currentQuestion = 0;

let userAnswers = new Array(questions.length).fill(null);

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
                        ${userAnswers[currentQuestion] === option ? "checked" : ""}
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

const timer =
    setInterval(() => {

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