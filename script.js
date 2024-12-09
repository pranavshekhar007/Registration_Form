// Select DOM Elements
const studentForm = document.getElementById('student-form');
const studentTableBody = document.querySelector('#studentTable tbody');

// Retrieve existing students from localStorage or initialize empty
let students = JSON.parse(localStorage.getItem('students')) || [];

// Render the table
function renderTable() {
    studentTableBody.innerHTML = '';
    students.forEach((student, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.id}</td>
            <td>${student.email}</td>
            <td>${student.contact}</td>
            <td>
                <button class="action edit" onclick="editStudent(${index})">Edit</button>
                <button class="action delete" onclick="deleteStudent(${index})">Delete</button>
            </td>
        `;
        studentTableBody.appendChild(row);
    });
}

// Add Student
studentForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get input values
    const name = document.getElementById('name').value.trim();
    const id = document.getElementById('studentID').value.trim();
    const email = document.getElementById('email').value.trim();
    const contact = document.getElementById('contact').value.trim();

    // Validation
    if (!name || !id || !email || !contact) {
        alert('All fields are required!');
        return;
    }

    // Add new student
    students.push({ name, id, email, contact });
    localStorage.setItem('students', JSON.stringify(students));
    renderTable();
    studentForm.reset();
});

// Edit Student
function editStudent(index) {
    const student = students[index];
    document.getElementById('name').value = student.name;
    document.getElementById('studentID').value = student.id;
    document.getElementById('email').value = student.email;
    document.getElementById('contact').value = student.contact;

    // Remove student being edited
    students.splice(index, 1);
    renderTable();
}

// Delete Student
function deleteStudent(index) {
    if (confirm('Are you sure you want to delete this student?')) {
        students.splice(index, 1);
        localStorage.setItem('students', JSON.stringify(students));
        renderTable();
    }
}

// Initial render
renderTable();
