// ===============================
// SHOW LOGIN
// ===============================

function showLogin() {

    document.getElementById("login-form").style.display = "block";
    document.getElementById("signup-form").style.display = "none";

    document.getElementById("login-message").textContent = "";
}


// ===============================
// SHOW SIGN UP
// ===============================

function showSignup() {

    document.getElementById("login-form").style.display = "none";
    document.getElementById("signup-form").style.display = "block";

    document.getElementById("login-message").textContent = "";
}


// ===============================
// CREATE ACCOUNT
// ===============================

function createAccount() {

    const username =
        document.getElementById("signup-username").value.trim();

    const password =
        document.getElementById("signup-password").value;


    if (!username || !password) {

        showMessage(
            "Please enter a username and password.",
            "error"
        );

        return;
    }


    if (password.length < 6) {

        showMessage(
            "Password must be at least 6 characters.",
            "error"
        );

        return;
    }


    const account = {
        username: username,
        password: password
    };


    localStorage.setItem(
        "edulearnAccount",
        JSON.stringify(account)
    );


    showMessage(
        "Account created successfully! 🎉",
        "success"
    );


    setTimeout(() => {

        showLogin();

        document.getElementById("login-username").value =
            username;

    }, 1000);
}


// ===============================
// LOGIN
// ===============================

function loginUser() {

    const username =
        document.getElementById("login-username").value.trim();

    const password =
        document.getElementById("login-password").value;


    const savedAccount =
        localStorage.getItem("edulearnAccount");


    if (!savedAccount) {

        showMessage(
            "No account found. Please create an account first.",
            "error"
        );

        return;
    }


    const account =
        JSON.parse(savedAccount);


    if (
        username === account.username &&
        password === account.password
    ) {

        localStorage.setItem(
            "edulearnLoggedIn",
            "true"
        );

        localStorage.setItem(
            "edulearnUsername",
            account.username
        );


        showMessage(
            "Login successful! 🚀",
            "success"
        );


        setTimeout(() => {

            window.location.href = "index.html";

        }, 800);

    } else {

        showMessage(
            "Incorrect username or password.",
            "error"
        );

    }
}


// ===============================
// PASSWORD SHOW / HIDE
// ===============================

function togglePassword(inputId, button) {

    const input =
        document.getElementById(inputId);


    if (input.type === "password") {

        input.type = "text";

        button.textContent = "🙈";

    } else {

        input.type = "password";

        button.textContent = "👁️";

    }
}


// ===============================
// MESSAGE
// ===============================

function showMessage(message, type) {

    const messageElement =
        document.getElementById("login-message");


    messageElement.textContent = message;

    messageElement.className = type;

}