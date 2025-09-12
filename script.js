const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const emptyMessage = document.getElementById("emptyMessage");
const allBtn = document.getElementById("allBtn");
const activeBtn = document.getElementById("activeBtn");
const completedBtn = document.getElementById("completedBtn");

allBtn.addEventListener("click", () => filterTasks("all"));
activeBtn.addEventListener("click", () => filterTasks("active"));
completedBtn.addEventListener("click", () => filterTasks("completed"));

// Sayfa açıldığında görevleri yükle
window.addEventListener("DOMContentLoaded", () => {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach((task) =>
    addTaskToDOM(task.id, task.text, task.completed)
  );
  updateListVisibility();
});

// Enter ile ekleme
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addBtn.click();
});

// Görev ekleme
addBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (text === "") return;

  const id = Date.now(); // benzersiz ID
  addTaskToDOM(id, text, false);
  saveTask(id, text, false);
  taskInput.value = "";
  updateListVisibility();
});

// DOM'a görev ekleme
function addTaskToDOM(id, text, completed) {
  const li = document.createElement("li");
  li.dataset.id = id;
  const span = document.createElement("span");
  span.textContent = text;
  if (completed) li.classList.add("completed");

  // Tamamlama
  span.addEventListener("click", () => {
    li.classList.toggle("completed");
    updateTask(id, li.classList.contains("completed"));
  });

  // Silme
  const delBtn = document.createElement("button");
  delBtn.textContent = "X";
  delBtn.className = "deleteBtn";
  delBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    li.remove();
    deleteTask(id);
    updateListVisibility();
  });

  li.appendChild(span);
  li.appendChild(delBtn);
  taskList.appendChild(li);
}

// LocalStorage işlemleri
function saveTask(id, text, completed) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ id, text, completed });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTask(id, completed) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const updatedTasks = tasks.map((task) =>
    task.id === id ? { ...task, completed } : task
  );
  localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}

function deleteTask(id) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const filtered = tasks.filter((task) => task.id !== id);
  localStorage.setItem("tasks", JSON.stringify(filtered));
}

// Listeyi gizle/göster
function updateListVisibility() {
  if (taskList.children.length === 0) {
    taskList.style.display = "none";
    emptyMessage.style.display = "block";
  } else {
    taskList.style.display = "block";
    emptyMessage.style.display = "none";
  }
}

function filterTasks(filter) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  taskList.innerHTML = ""; // listeyi temizle

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "active") return task.completed === false;
    if (filter === "completed") return task.completed === true;
  });

  filteredTasks.forEach((task) =>
    addTaskToDOM(task.id, task.text, task.completed)
  );
  updateListVisibility();
}
