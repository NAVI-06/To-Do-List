// Getting references to DOM elements
const inputBox = document.getElementById('inputBox');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');

// Variable to keep track of the todo item being edited
let editTodo = null;

// Function to add or edit a todo item
const addTodo = () => {
    // Get the trimmed value from the input field
    const inputText = inputBox.value.trim();
    
    // Check if the input field is empty
    if (inputText.length <= 0) {
        alert("You must write something in your to do");
        return false;
    }

    // Check if the button's value is "Edit", indicating an edit operation
    if (addBtn.value === "Edit") {
        // Update the existing todo item with the new text
        editLocalTodos(editTodo.target.previousElementSibling.innerHTML);
        editTodo.target.previousElementSibling.innerHTML = inputText;
        addBtn.value = "Add"; // Reset button value to "Add"
        inputBox.value = ""; // Clear the input field
    } else {
        // Create a new list item
        const li = document.createElement("li");

        // Create and configure the checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("checkbox");
        li.appendChild(checkbox);

        // Create and configure the paragraph to display the todo text
        const p = document.createElement("p");
        p.innerHTML = inputText;
        li.appendChild(p);

        // Create and configure the Edit button
        const editBtn = document.createElement("button");
        editBtn.innerText = "Edit";
        editBtn.classList.add("btn", "editBtn");
        li.appendChild(editBtn);

        // Create and configure the Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Remove";
        deleteBtn.classList.add("btn", "deleteBtn");
        li.appendChild(deleteBtn);

        // Add the new list item to the todo list
        todoList.appendChild(li);
        inputBox.value = ""; // Clear the input field

        // Save the new todo item to local storage
        saveLocalTodos(inputText);
    }
}

// Function to handle updating (editing or deleting) todo items
const updateTodo = (e) => {
    // Handle delete operation
    if (e.target.innerHTML === "Remove") {
        todoList.removeChild(e.target.parentElement); // Remove the list item
        deleteLocalTodos(e.target.parentElement); // Delete the todo from local storage
    }

    // Handle edit operation
    if (e.target.innerHTML === "Edit") {
        inputBox.value = e.target.previousElementSibling.innerHTML; // Set input field to current todo text
        inputBox.focus(); // Focus on the input field
        addBtn.value = "Edit"; // Change button value to "Edit"
        editTodo = e; // Store the event for editing
    }
}

// Function to save a new todo item to local storage
const saveLocalTodos = (todo) => {
    let todos;
    // Check if there are existing todos in local storage
    if (localStorage.getItem("todos") === null) {
        todos = []; // Initialize an empty array if none exist
    } else {
        todos = JSON.parse(localStorage.getItem("todos")); // Parse existing todos
    }
    todos.push(todo); // Add the new todo item
    localStorage.setItem("todos", JSON.stringify(todos)); // Save updated todos to local storage
}

// Function to load todos from local storage and display them
const getLocalTodos = () => {
    let todos;
    // Check if there are existing todos in local storage
    if (localStorage.getItem("todos") === null) {
        todos = []; // Initialize an empty array if none exist
    } else {
        todos = JSON.parse(localStorage.getItem("todos")); // Parse existing todos
        todos.forEach(todo => {
            // Create a list item for each todo
            const li = document.createElement("li");

            // Create and configure the checkbox
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.classList.add("checkbox");
            li.appendChild(checkbox);

            // Create and configure the paragraph to display the todo text
            const p = document.createElement("p");
            p.innerHTML = todo;
            li.appendChild(p);

            // Create and configure the Edit button
            const editBtn = document.createElement("button");
            editBtn.innerText = "Edit";
            editBtn.classList.add("btn", "editBtn");
            li.appendChild(editBtn);

            // Create and configure the Delete button
            const deleteBtn = document.createElement("button");
            deleteBtn.innerText = "Remove";
            deleteBtn.classList.add("btn", "deleteBtn");
            li.appendChild(deleteBtn);

            // Add the list item to the todo list
            todoList.appendChild(li);
        });
    }
}

// Function to delete a todo item from local storage
const deleteLocalTodos = (todo) => {
    let todos;
    // Check if there are existing todos in local storage
    if (localStorage.getItem("todos") === null) {
        todos = []; // Initialize an empty array if none exist
    } else {
        todos = JSON.parse(localStorage.getItem("todos")); // Parse existing todos
    }

    // Get the text of the todo item to be deleted
    let todoText = todo.children[1].innerHTML; // Adjusted to target the correct element
    let todoIndex = todos.indexOf(todoText); // Find the index of the todo item
    todos.splice(todoIndex, 1); // Remove the todo item
    localStorage.setItem("todos", JSON.stringify(todos)); // Save updated todos to local storage
    console.log(todoIndex); // Log the index for debugging purposes
}

// Function to edit a todo item in local storage
const editLocalTodos = (todo) => {
    let todos = JSON.parse(localStorage.getItem("todos")); // Get existing todos
    let todoIndex = todos.indexOf(todo); // Find the index of the todo item
    todos[todoIndex] = inputBox.value; // Update the todo item with new value
    localStorage.setItem("todos", JSON.stringify(todos)); // Save updated todos to local storage
}

// Event listener for DOMContentLoaded to load todos from local storage on page load
document.addEventListener('DOMContentLoaded', getLocalTodos);

// Event listener for the Add button click to add or edit todos
addBtn.addEventListener('click', addTodo);

// Event listener for click events in the todo list to handle edit and delete operations
todoList.addEventListener('click', updateTodo);
