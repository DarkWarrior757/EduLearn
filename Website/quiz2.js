const questions = [
    {
        question: "What is the first step in the process of nutrition in animals?",
        options: [
            "Digestion",
            "Ingestion",
            "Absorption",
            "Egestion"
        ],
        answer: "Ingestion",
        explanation:
            "Ingestion is the process of taking food into the body."
    },

    {
        question: "Which organ is mainly responsible for chewing food?",
        options: [
            "Stomach",
            "Mouth",
            "Small intestine",
            "Large intestine"
        ],
        answer: "Mouth",
        explanation:
            "Food is taken into the mouth and chewed by the teeth. Saliva also begins digestion of starch."
    },

    {
        question: "Which substance in saliva helps digest starch?",
        options: [
            "Pepsin",
            "Salivary amylase",
            "Bile",
            "Hydrochloric acid"
        ],
        answer: "Salivary amylase",
        explanation:
            "Salivary amylase is an enzyme in saliva that begins the digestion of starch."
    },

    {
        question: "Where does most digestion and absorption of nutrients take place?",
        options: [
            "Mouth",
            "Stomach",
            "Small intestine",
            "Large intestine"
        ],
        answer: "Small intestine",
        explanation:
            "The small intestine completes most digestion and absorbs digested nutrients into the body."
    },

    {
        question: "Which organ produces bile?",
        options: [
            "Stomach",
            "Liver",
            "Pancreas",
            "Small intestine"
        ],
        answer: "Liver",
        explanation:
            "The liver produces bile, which helps in the digestion of fats."
    },

    {
        question: "What is the main function of the stomach?",
        options: [
            "Pump blood",
            "Store and digest food",
            "Absorb oxygen",
            "Remove urine"
        ],
        answer: "Store and digest food",
        explanation:
            "The stomach temporarily stores food and mixes it with digestive juices."
    },

    {
        question: "Which organ absorbs most of the remaining water from undigested food?",
        options: [
            "Mouth",
            "Stomach",
            "Large intestine",
            "Small intestine"
        ],
        answer: "Large intestine",
        explanation:
            "The large intestine absorbs water and some salts from the remaining material."
    },

    {
        question: "What is the process of taking digested nutrients into the blood called?",
        options: [
            "Ingestion",
            "Digestion",
            "Absorption",
            "Egestion"
        ],
        answer: "Absorption",
        explanation:
            "Absorption is the process by which digested nutrients pass into the blood, mainly through the walls of the small intestine."
    },

    {
        question: "Which teeth are mainly used for cutting food?",
        options: [
            "Molars",
            "Premolars",
            "Incisors",
            "Canines"
        ],
        answer: "Incisors",
        explanation:
            "Incisors are the front teeth and are mainly used for cutting and biting food."
    },

    {
        question: "What is egestion?",
        options: [
            "Taking food into the body",
            "Breaking down food",
            "Absorbing nutrients",
            "Removing undigested food from the body"
        ],
        answer: "Removing undigested food from the body",
        explanation:
            "Egestion is the removal of undigested food from the digestive tract."
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