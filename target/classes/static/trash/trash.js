window.addEventListener("DOMContentLoaded", () => {
    const email = localStorage.getItem("email");
    document.querySelector(".profile_text").textContent = email;

    // Fetch archived notes
    fetch(`http://localhost:8080/api/notes/trash?email=${email}`)
        .then(response => response.json())
        .then(notes => {
            notes.forEach(note => renderNote(note.content));
        })
        .catch(error => console.error("Error fetching archived notes:", error));

    const deletebtn = document.querySelector(".delete_acc");
    if(deletebtn){
        deletebtn.addEventListener("click", () => {
            const confirmDelete = confirm("Are you sure you want to delete your account?");
            if (confirmDelete) {
                fetch("http://localhost:8080/api/deleteAcc", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email })
                })
                    .then(response => response.text())
                    .then(result => {
                        if(result === 'account deleted'){
                            window.location.href = "../signup/signup.html";
                        } else {
                            return res.json().then(data => {
                                throw new Error(data.message || "failed to delete account" );
                            })
                        }
                    })
                    .catch(error => {
                        alert("Error: " + error.message);
                    });
            }
        });
    }
});

function renderNote(content) {
    const noteContainer = document.querySelector(".data");

    const noteDiv = document.createElement("div");
    noteDiv.classList.add("data_inside");
    noteDiv.innerHTML = `
        <p>${content}</p>
        <button class="menu_icon">⋮</button>
        <div class="options_menu">
            <button class="delete_btn">Delete</button>
        </div>
    `;
    const menuIcon = noteDiv.querySelector(".menu_icon");
    const optionsMenu = noteDiv.querySelector(".options_menu");

    menuIcon.addEventListener("click", (e) => {
        e.stopPropagation();
        optionsMenu.style.display = optionsMenu.style.display === "block" ? "none" : "block";
    });

    document.addEventListener("click", () => {
        optionsMenu.style.display = "none";
    });
    const archiveBtn = noteDiv.querySelector(".delete_btn");
    archiveBtn.addEventListener("click", () => {
        const email = localStorage.getItem("email");
        fetch("http://localhost:8080/api/delete", {
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
