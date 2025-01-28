// Dark/Light Mode Toggle
const themeToggleButton = document.getElementById('theme-toggle');
const body = document.body;

themeToggleButton.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        themeToggleButton.textContent = '🌞 Light Mode';  // Change text when dark mode is on
    } else {
        themeToggleButton.textContent = '🌙 Dark Mode';  // Change text when dark mode is off
    }
});

// Task Management - Add Task to List
const addTaskButton = document.getElementById('add-task-btn');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

addTaskButton.addEventListener('click', () => {
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        const newTask = document.createElement('li');
        newTask.textContent = taskText;

        // Create edit and delete buttons for the task
        const editButton = document.createElement('button');
        editButton.textContent = '✏️';
        editButton.classList.add('edit-task-btn');

        const deleteButton = document.createElement('button');
        deleteButton.textContent = '❌';
        deleteButton.classList.add('delete-task-btn');

        // Add event listener to delete button
        deleteButton.addEventListener('click', () => {
            newTask.remove();
        });

        // Add event listener to edit button
        editButton.addEventListener('click', () => {
            // Make the task text editable
            const currentText = newTask.firstChild.textContent.trim();
            const newTextInput = document.createElement('input');
            newTextInput.type = 'text';
            newTextInput.value = currentText;
            newTask.firstChild.replaceWith(newTextInput);

            // Change edit button to "Save"
            editButton.textContent = '💾 Save';
            editButton.removeEventListener('click', () => {});
            editButton.addEventListener('click', () => {
                const updatedText = newTextInput.value.trim();
                if (updatedText !== "") {
                    newTextInput.replaceWith(document.createTextNode(updatedText));
                    editButton.textContent = '✏️';  // Restore edit icon
                } else {
                    alert("Task cannot be empty.");
                }
            });
        });

        // Append edit and delete buttons and task to the list
        newTask.appendChild(editButton);
        newTask.appendChild(deleteButton);
        taskList.appendChild(newTask);

        // Clear the input field after adding the task
        taskInput.value = '';
    } else {
        alert("Please enter a task.");
    }
});
// Customization logic
const applyCustomizationsButton = document.getElementById('apply-customizations');
const themeColorInput = document.getElementById('theme-color');
const fontSelect = document.getElementById('font-select');

applyCustomizationsButton.addEventListener('click', () => {
    // Get selected values
    const selectedColor = themeColorInput.value;
    const selectedFont = fontSelect.value;

    // Apply the customizations to the root CSS variables
    document.documentElement.style.setProperty('--theme-color', selectedColor);
    document.documentElement.style.setProperty('--font-family', selectedFont);

    // Optionally, you could store these values in local storage to persist on page reload
    localStorage.setItem('theme-color', selectedColor);
    localStorage.setItem('font-family', selectedFont);
});

// Apply saved customizations on page load (from local storage if available)
window.addEventListener('load', () => {
    const savedColor = localStorage.getItem('theme-color');
    const savedFont = localStorage.getItem('font-family');
    
    if (savedColor) {
        document.documentElement.style.setProperty('--theme-color', savedColor);
    }
    
    if (savedFont) {
        document.documentElement.style.setProperty('--font-family', savedFont);
    }
});
// Function to update the progress bar based on completed tasks
function updateProgressBar() {
    const tasks = taskList.querySelectorAll('li');
    const completedTasks = Array.from(tasks).filter(task => task.classList.contains('completed')).length;
    const totalTasks = tasks.length;

    // Calculate progress percentage
    const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    // Update progress bar and text
    const progressBar = document.getElementById('progress-bar');
    progressBar.style.width = `${progressPercentage}%`;

    const progressText = document.getElementById('progress-text');
    progressText.textContent = `${Math.round(progressPercentage)}% Completed`;
}

// Task Management - Add Task to List
addTaskButton.addEventListener('click', () => {
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        const newTask = document.createElement('li');
        newTask.textContent = taskText;

        // Create edit, delete, and complete buttons for the task
        const editButton = document.createElement('button');
        editButton.textContent = '✏️';
        editButton.classList.add('edit-task-btn');

        const deleteButton = document.createElement('button');
        deleteButton.textContent = '❌';
        deleteButton.classList.add('delete-task-btn');

        const completeButton = document.createElement('button');
        completeButton.textContent = '✔️';
        completeButton.classList.add('complete-task-btn');

        // Add event listener to delete button
        deleteButton.addEventListener('click', () => {
            newTask.remove();
            updateProgressBar(); // Update progress after task removal
        });

        // Add event listener to edit button
        editButton.addEventListener('click', () => {
            // Make the task text editable
            const currentText = newTask.firstChild.textContent.trim();
            const newTextInput = document.createElement('input');
            newTextInput.type = 'text';
            newTextInput.value = currentText;
            newTask.firstChild.replaceWith(newTextInput);

            // Change edit button to "Save"
            editButton.textContent = '💾 Save';
            editButton.removeEventListener('click', () => {});
            editButton.addEventListener('click', () => {
                const updatedText = newTextInput.value.trim();
                if (updatedText !== "") {
                    newTextInput.replaceWith(document.createTextNode(updatedText));
                    editButton.textContent = '✏️';  // Restore edit icon
                    updateProgressBar(); // Update progress after editing
                } else {
                    alert("Task cannot be empty.");
                }
            });
        });

        // Add event listener to mark task as completed
        completeButton.addEventListener('click', () => {
            newTask.classList.toggle('completed');
            updateProgressBar(); // Update progress after completion toggle
        });

        // Append buttons and task to the list
        newTask.appendChild(editButton);
        newTask.appendChild(deleteButton);
        newTask.appendChild(completeButton);
        taskList.appendChild(newTask);

        // Clear the input field after adding the task
        taskInput.value = '';

        updateProgressBar(); // Update progress when a new task is added
    } else {
        alert("Please enter a task.");
    }
});



