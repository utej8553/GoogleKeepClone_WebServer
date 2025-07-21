window.addEventListener("DOMContentLoaded", () => {
    const email = localStorage.getItem("email");
    document.querySelector(".profile_text").innerHTML = email;

    // Load all notes for the user
    fetch(`http://localhost:8080/api/notes?email=${email}`)
        .then(response => response.json())
        .then(notes => {
            notes.forEach(note => renderNote(note.content));
        })
        .catch(error => console.error("Error fetching notes:", error));

    const inputBox = document.querySelector(".input");
    const textarea = document.querySelector(".text_input");

    inputBox.classList.add("collapsed");

    textarea.addEventListener("focus", () => {
        inputBox.classList.remove("collapsed");
        inputBox.classList.add("expanded");
    });

    document.addEventListener("click", (e) => {
        if (!inputBox.contains(e.target)) {
            inputBox.classList.remove("expanded");
            inputBox.classList.add("collapsed");
        }
    });

    textarea.addEventListener("input", () => {
        textarea.style.height = "auto";
        textarea.style.height = textarea.scrollHeight + "px";
    });

    textarea.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            document.querySelector(".input_click").click();
        }
    });
    const deletebtn = document.querySelector(".delete_acc");

    if (deletebtn) {
        deletebtn.addEventListener("click", () => {
            const confirmDelete = confirm("Are you sure you want to delete your account?");
            if (confirmDelete) {
                if (!email) {
                    alert("User email not found.");
                    return;
                }

                fetch("http://localhost:8080/api/deleteAcc", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email })
                })
                    .then(response => response.text())
                    .then(result => {
                        if (result === "Account deleted") {
                            window.location.href = "../signup/signup.html";
                        } else {
                            throw new Error(result || "Failed to delete account");
                        }
                    })
                    .catch(error => {
                        alert("Error: " + error.message);
                    });
            }
        });
    }

    // Add note
    document.querySelector(".input_click").addEventListener("click", () => {
        const content = textarea.value.trim();
        if (!content) return;

        const data = { email, content };

        fetch(`http://localhost:8080/api/notes?email=${email}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
            .then(response => response.text())
            .then(result => {
                console.log("Note added:", result);
                renderNote(data.content);
                textarea.value = "";
                textarea.style.height = "auto";
            })
            .catch(error => console.error("Error adding note:", error));
    });
});

// Render each note with menu
function renderNote(content) {
    const noteContainer = document.querySelector(".data");

    const noteDiv = document.createElement("div");
    noteDiv.classList.add("data_inside");

    noteDiv.innerHTML = `
        <p>${content}</p>
        <button class="menu_icon">⋮</button>
        <div class="options_menu">
            <button class="archive_btn">Archive</button>
            <button class="delete_btn">Delete</button>
        </div>
    `;

    // Toggle menu display
    const menuIcon = noteDiv.querySelector(".menu_icon");
    const optionsMenu = noteDiv.querySelector(".options_menu");

    menuIcon.addEventListener("click", (e) => {
        e.stopPropagation();
        optionsMenu.style.display = optionsMenu.style.display === "block" ? "none" : "block";
    });

    // Hide menu when clicking outside
    document.addEventListener("click", () => {
        optionsMenu.style.display = "none";
    });

    // Handle Archive
    const archiveBtn = noteDiv.querySelector(".archive_btn");
    archiveBtn.addEventListener("click", () => {
        const email = localStorage.getItem("email");
        fetch("http://localhost:8080/api/archive", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, content })
        })
            .then(response => response.text())
            .then(result => {
                console.log("Note archived:", result);
            })
            .catch(error => console.error("Error archiving note:", error));
    });

    // Handle Delete
    const deleteBtn = noteDiv.querySelector(".delete_btn");
    deleteBtn.addEventListener("click", () => {
        const email = localStorage.getItem("email");
        fetch("http://localhost:8080/api/trash", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, content })
        })
            .then(response => response.text())
            .then(result => {
                console.log("Note deleted:", result);
                noteDiv.remove();
            })
            .catch(error => console.error("Error deleting note:", error));
    });

    noteContainer.appendChild(noteDiv);
}
