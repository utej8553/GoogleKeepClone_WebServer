document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.getElementById("signupForm");

    signupForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const username = document.getElementById("username").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        localStorage.setItem("email", email);

        const data = {
            "username": username,
            "email": email,
            "password": password
        };

        fetch("http://localhost:8080/api/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(response => response.text())
            .then(result => {
                console.log("Server response:", result);
                if (result === 'signup successful') {
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
