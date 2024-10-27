// Event Listener for Add Row button
document.getElementById("add-row").addEventListener("click", function() {
    const table = document.getElementById("gpa-table").getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    // Insert checkboxes, course name, grade dropdown, credits input, and remove button
    const selectCell = newRow.insertCell(0);
    const courseCell = newRow.insertCell(1);
    const gradeCell = newRow.insertCell(2);
    const creditsCell = newRow.insertCell(3);
    const removeCell = newRow.insertCell(4);

    selectCell.innerHTML = '<input type="checkbox" checked>';
    courseCell.innerHTML = '<input type="text" placeholder="Course Name">';
    gradeCell.innerHTML = `
        <select class="grade">
            <option value="" disabled selected></option> <!-- Empty option by default -->
            <option value="4.0">A+</option>
            <option value="4.0">A</option>
            <option value="3.7">A-</option>
            <option value="3.3">B+</option>
            <option value="3.0">B</option>
            <option value="2.7">B-</option>
            <option value="2.3">C+</option>
            <option value="2.0">C</option>
            <option value="1.7">C-</option>
            <option value="1.0">D</option>
            <option value="0.0">F</option>
        </select>`;
    creditsCell.innerHTML = '<input type="number" class="credits" min="0" step="0.5">';
    removeCell.innerHTML = '<button class="remove-row">X</button>';

    // Add event listener to remove row button
    newRow.querySelector(".remove-row").addEventListener("click", function() {
        this.closest("tr").remove();
    });
});

// Event Listener for Calculate button
document.getElementById("calculate-gpa").addEventListener("click", function() {
    const rows = document.querySelectorAll("#gpa-table tbody tr");
    let totalCredits = 0;
    let totalPoints = 0;

    rows.forEach(function(row) {
        const isChecked = row.querySelector('input[type="checkbox"]').checked;
        const grade = parseFloat(row.querySelector(".grade").value);
        const credits = parseFloat(row.querySelector(".credits").value);

        if (!isNaN(grade) && !isNaN(credits) && isChecked) {
            totalCredits += credits;
            totalPoints += grade * credits;
        }
    });

    const gpa = totalPoints / totalCredits;
    document.getElementById("gpa-output").textContent = totalCredits ? "GPA: " + gpa.toFixed(2) : "GPA: N/A";
});

// Updated Event Listener for Reset button to clear EVERYTHING
document.getElementById("reset").addEventListener("click", function() {
    const rows = document.querySelectorAll("#gpa-table tbody tr");
    
    rows.forEach(function(row) {
        // Reset checkbox, course, grade, and credits fields
        row.querySelector('input[type="checkbox"]').checked = true; // Reset checkboxes to checked
        row.querySelector('input[type="text"]').value = ""; // Clear course name (placeholder shows)
        row.querySelector(".grade").value = ""; // Reset grade dropdown to empty
        row.querySelector(".credits").value = ""; // Clear the credits
    });

    // Clear the GPA output
    document.getElementById("gpa-output").textContent = "GPA: ";
});
