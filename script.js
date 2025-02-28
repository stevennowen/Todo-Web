const todoInput = document.querySelector(".todo-input");
const todoContainer = document.querySelector(".todo-container");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

document.addEventListener("DOMContentLoaded", loadTodos);
todoButton.addEventListener("click", function(e) {
  e.preventDefault();
  const todoText = todoInput.value;
  if (todoText.trim() === "") return;

  let todos = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [];
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const li = document.createElement("li");
    li.innerText = todoText;
    li.classList.add("todo-item");
    todoDiv.appendChild(li);

    // Membuat div wrapper untuk tombol
    const buttonWrapper = document.createElement("div");
    buttonWrapper.classList.add("button-wrapper");

    const completeBtn = document.createElement("button");
    completeBtn.classList.add("complete-btn");
    completeBtn.innerHTML = '<i class="fas fa-check-circle"></i>';
    buttonWrapper.appendChild(completeBtn);

    const trashBtn = document.createElement("button");
    trashBtn.classList.add("trash-btn");
    trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
    buttonWrapper.appendChild(trashBtn);

    // Menambahkan div wrapper ke todoDiv
    todoDiv.appendChild(buttonWrapper);

    todoList.appendChild(todoDiv);
  saveTodo(todoText);
  todoInput.value = "";
});
todoList.addEventListener("click", function(e) {
  if (e.target.closest(".trash-btn")) {
    const todo = e.target.closest(".todo");
    todo.classList.add("slide");
    removeTodo(todo);
    todo.addEventListener("transitionend", function() {
      todo.remove();
    });
  }
  if (e.target.closest(".complete-btn")) {
    const todo = e.target.closest(".todo");
    todo.classList.toggle("completed");
    const icon = todo.querySelector(".complete-btn i");
    if (todo.classList.contains("completed")) {
      icon.style.color = "goldenrod";
    } else {
      icon.style.color = "";
    }
  }
});

function saveTodo(todo) {
  let todos = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [];
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function loadTodos() {

  let todos = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [];
  
  todos.forEach(function(todoText) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const li = document.createElement("li");
    li.innerText = todoText;
    li.classList.add("todo-item");
    todoDiv.appendChild(li);

    // Membuat div wrapper untuk tombol
    const buttonWrapper = document.createElement("div");
    buttonWrapper.classList.add("button-wrapper");

    const completeBtn = document.createElement("button");
    completeBtn.classList.add("complete-btn");
    completeBtn.innerHTML = '<i class="fas fa-check-circle"></i>';
    buttonWrapper.appendChild(completeBtn);

    const trashBtn = document.createElement("button");
    trashBtn.classList.add("trash-btn");
    trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
    buttonWrapper.appendChild(trashBtn);

    todoDiv.appendChild(buttonWrapper);

    todoList.appendChild(todoDiv);
  });
}


function removeTodo(todoElement) {
  let todos = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [];
  const todoText = todoElement.querySelector(".todo-item").innerText;
  const index = todos.indexOf(todoText);
  if (index > -1) {
    todos.splice(index, 1);
  }
  localStorage.setItem("todos", JSON.stringify(todos));
}
