const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const editModal = document.getElementById('edit-modal');
const editTaskInput = document.getElementById('edit-task-input');
const saveTaskBtn = document.getElementById('save-task-btn');
const closeBtn = document.querySelector('.close-btn');

let tasks = [];
let taskBeingEdited = null;

// Add task
addTaskBtn.addEventListener('click', () => {
    const newTask = taskInput.value.trim();

    if (newTask === '') {
        alert('Task cannot be empty!');
        return;
    }

    if (tasks.includes(newTask)) {
        alert('Task already exists!');
        return;
    }

    tasks.push(newTask);
    renderTasks();
    taskInput.value = '';
});

// Render tasks to the DOM
function renderTasks() {
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const li = document.createElement('li');

        const taskText = document.createElement('span');
        taskText.textContent = task;

        const buttons = document.createElement('div');

        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => {
            tasks.splice(index, 1);
            renderTasks();
        };

        // Edit button
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.onclick = () => {
            taskBeingEdited = index;
            editTaskInput.value = task;
            editModal.style.display = 'block';
        };

        buttons.appendChild(editBtn);
        buttons.appendChild(deleteBtn);

        li.appendChild(taskText);
        li.appendChild(buttons);

        taskList.appendChild(li);
    });
}

// Save edited task
saveTaskBtn.addEventListener('click', () => {
    const updatedTask = editTaskInput.value.trim();

    if (updatedTask === '') {
        alert('Task cannot be empty!');
        return;
    }

    if (tasks.includes(updatedTask) && updatedTask !== tasks[taskBeingEdited]) {
        alert('Task already exists!');
        return;
    }

    tasks[taskBeingEdited] = updatedTask;
    renderTasks();
    editModal.style.display = 'none';
});

// Close modal
closeBtn.onclick = () => {
    editModal.style.display = 'none';
};

// Optional: Close modal when clicking outside 
window.onclick = (e) => {
    if (e.target === editModal) {
        editModal.style.display = 'none';
    }
};
