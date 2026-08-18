function login() {
    alert("Login system coming soon!");
}

function exploreCourses() {
    document.getElementById("courses").scrollIntoView({
        behavior: "smooth"
    });
}
const questions = [
    {
        question: "What is the process by which green plants make their food?",
        options: ["Respiration", "Photosynthesis", "Digestion", "Transpiration"],
        answer: "Photosynthesis",
        explanation: "Photosynthesis is the process in which green plants use sunlight, carbon dioxide and water to prepare food."
    },
    {
        question: "Which gas is used by plants during photosynthesis?",
        options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"],
        answer: "Carbon dioxide",
        explanation: "Plants take in carbon dioxide from the air. It is one of the raw materials needed for photosynthesis."
    },
    {
        question: "Which part of a plant mainly absorbs water and minerals?",
        options: ["Leaf", "Stem", "Root", "Flower"],
        answer: "Root",
        explanation: "Roots absorb water and minerals from the soil and transport them to other parts of the plant."
    },
    {
        question: "Which substance gives leaves their green colour?",
        options: ["Starch", "Chlorophyll", "Glucose", "Protein"],
        answer: "Chlorophyll",
        explanation: "Chlorophyll is the green pigment present in leaves and helps them absorb sunlight."
    },
    {
        question: "Plants that make their own food are called:",
        options: ["Heterotrophs", "Autotrophs", "Parasites", "Saprotrophs"],
        answer: "Autotrophs",
        explanation: "Autotrophs are organisms that can prepare their own food. Green plants are common examples."
    },
    {
        question: "What is the main source of energy for photosynthesis?",
        options: ["Moonlight", "Sunlight", "Soil", "Wind"],
        answer: "Sunlight",
        explanation: "Plants use energy from sunlight to carry out photosynthesis."
    },
    {
        question: "Which nutrient do plants obtain from the soil?",
        options: ["Minerals", "Sugar", "Starch", "Glucose"],
        answer: "Minerals",
        explanation: "Plants absorb mineral nutrients from the soil through their roots."
    },
    {
        question: "Cuscuta is an example of a:",
        options: ["Parasite", "Autotroph", "Saprotroph", "Insectivorous plant"],
        answer: "Parasite",
        explanation: "Cuscuta is a parasitic plant that obtains nutrients from another plant called its host."
    },
    {
        question: "Which of these is an insectivorous plant?",
        options: ["Rose", "Mango", "Pitcher plant", "Wheat"],
        answer: "Pitcher plant",
        explanation: "The pitcher plant traps insects and obtains nutrients from them, especially nitrogen."
    },
    {
        question: "Which food is commonly stored in leaves after photosynthesis?",
        options: ["Starch", "Protein", "Fat", "Minerals"],
        answer: "Starch",
        explanation: "Plants convert the glucose produced during photosynthesis into starch, which can be stored."
    }
];


let currentQuestion = 0;

let userAnswers = new Array(questions.length).fill(null);

const quizContainer = document.getElementById("quiz-container");

const nextButton = document.getElementById("next-button");

const previousButton =
    document.getElementById("previous-button");

const submitButton =
    document.getElementById("submit-test");

const loadingScreen =
    document.getElementById("loading-screen");

const resultScreen =
    document.getElementById("result-screen");


// Only run quiz code on quiz.html

if (quizContainer) {

    showQuestion();

    nextButton.addEventListener("click", nextQuestion);

    previousButton.addEventListener(
        "click",
        previousQuestion
    );

    submitButton.addEventListener(
        "click",
        finishQuiz
    );
}


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


    // Hide Previous on first question

    if (currentQuestion === 0) {

        previousButton.style.display = "none";

    } else {

        previousButton.style.display = "block";

    }


    // On last question

    if (currentQuestion === questions.length - 1) {

        nextButton.style.display = "none";

        submitButton.style.display = "block";

    } else {

        nextButton.style.display = "block";

        submitButton.style.display = "none";

    }
}


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


function nextQuestion() {

    saveAnswer();

    if (currentQuestion < questions.length - 1) {

        currentQuestion++;

        showQuestion();

    }
}


function previousQuestion() {

    saveAnswer();

    if (currentQuestion > 0) {

        currentQuestion--;

        showQuestion();

    }
}


function finishQuiz() {

    saveAnswer();

    document.querySelector(".quiz-page").style.display =
        "none";

    loadingScreen.style.display = "flex";


    setTimeout(() => {

        loadingScreen.style.display = "none";

        resultScreen.style.display = "block";

        showResults();

    }, 2000);
}


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
// 10 MINUTE QUIZ TIMER
// =========================

let timeLeft = 10 * 60;

const timerElement = document.getElementById("time");

if (timerElement) {

    const quizTimer = setInterval(() => {

        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;

        timerElement.textContent =
            `${minutes}:${seconds.toString().padStart(2, "0")}`;

        // Warning when 2 minutes remain
        if (timeLeft <= 120 && timeLeft > 60) {
            timerElement.style.color = "orange";
        }

        // Warning when 1 minute remains
        if (timeLeft <= 60) {
            timerElement.style.color = "red";
        }

        // Time's up
        if (timeLeft <= 0) {

            clearInterval(quizTimer);

            alert("⏰ Time's up! Your test will be submitted.");

            finishQuiz();

            return;
        }

        timeLeft--;

    }, 1000);
}
// ===============================
// LOGIN / LOGOUT UI
// ===============================

function updateAuthUI() {

    const authArea = document.getElementById("auth-area");

    if (!authArea) return;

    const loggedIn =
        localStorage.getItem("edulearnLoggedIn");

    const username =
        localStorage.getItem("edulearnUsername");


    if (loggedIn === "true" && username) {

        authArea.innerHTML = `
            <span class="welcome-user">
                👋 ${username}
            </span>

            <button onclick="logoutUser()">
                Logout
            </button>
        `;

    } else {

        authArea.innerHTML = `
            <button onclick="window.location.href='login.html'">
                Login
            </button>
        `;

    }
}


// ===============================
// LOGOUT
// ===============================

function logoutUser() {

    localStorage.removeItem("edulearnLoggedIn");
    localStorage.removeItem("edulearnUsername");

    updateAuthUI();

}


// Run when page loads

updateAuthUI();