document.addEventListener("DOMContentLoaded", function () {
    console.log("Student Attendance App Loaded!");

    const studentForm = document.getElementById("studentForm");
    if (studentForm) {
        studentForm.addEventListener("submit", function (event) {
            event.preventDefault();
            let studentNameInput = document.getElementById("studentName");
            let studentName = studentNameInput.value.trim();

            if (studentName === "") {
                alert("Student name cannot be empty!");
                return;
            }

            fetch("/addStudent", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({ name: studentName }), // ✅ Fix JSON issue
            })
            .then(response => {
                if (!response.ok) throw new Error("Failed to add student");
                return response.text();
            })
            .then(() => {
                studentNameInput.value = ""; // ✅ Clear input after adding student
                loadStudents(); // ✅ Refresh list dynamically without reloading
            })
            .catch(error => {
                console.error("Error adding student:", error);
                alert("Error: Unable to add student");
            });
        });
    }

    loadStudents(); // ✅ Load students when the page loads
});

function toggleAttendance(studentId) {
    fetch(`/updateAttendance/${studentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" }
    })
    .then(response => response.json())  
    .then(data => {
        let btn = document.getElementById(`toggle-${studentId}`);
        if (btn) {
            btn.textContent = data.attendance ? "Present" : "Absent";
            btn.className = data.attendance ? "toggle-btn present" : "toggle-btn absent";
        }
    })
    .catch(error => {
        console.error("Error updating attendance:", error);
        alert("Error: Unable to update attendance");
    });
}

// ✅ Function to fetch students and update the UI dynamically
function loadStudents() {
    fetch("/")
        .then(response => response.text())
        .then(html => {
            let parser = new DOMParser();
            let doc = parser.parseFromString(html, "text/html");
            let newTable = doc.querySelector(".table-container");
            if (newTable) {
                document.querySelector(".table-container").innerHTML = newTable.innerHTML;
            }
        })
        .catch(error => console.error("Error loading students:", error));
}
