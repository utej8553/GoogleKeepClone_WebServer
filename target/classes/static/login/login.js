document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.getElementById("loginForm");

    signupForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        localStorage.setItem("email", email);

        const data = {
            "email": email,
            "password": password
        };

        fetch("http://localhost:8080/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(response => response.text())
            .then(result => {
                console.log("Server response:", result);
                if (result === 'login successful') {
                    window.location.href = "../home/home.html";
                } else {
                    alert(result);
                }
            })
            .catch(error => {
                console.error("Error:", error);
                alert("An error occurred. Please try again later.");
            });
    });
});
