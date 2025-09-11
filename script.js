const addBtn = document.getElementById("addBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

addBtn.addEventListener("click", function() {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Lütfen bir görev yazın!");
    return;
  }

  // li oluştur
  const li = document.createElement("li");
  li.textContent = taskText;

  // silme butonu ekle
  const deleteBtn = document.createElement("span");
  deleteBtn.textContent = "❌";
  deleteBtn.classList.add("deleteBtn");

  deleteBtn.addEventListener("click", function(event) {
    event.stopPropagation(); // silerken tamamlandı olmasın
    li.remove();

    // Liste boş kaldıysa gizle
    if (taskList.children.length === 0) {
      taskList.style.display = "none";
    }
  });

  // göreve tıklayınca tamamlandı olarak işaretle
  li.addEventListener("click", function() {
    li.classList.toggle("completed");
  });

  li.appendChild(deleteBtn);
  taskList.appendChild(li);

  // input’u temizle
  taskInput.value = "";

  // Listeyi görünür yap
  taskList.style.display = "block";
});

// Enter tuşu ile görev ekleme
taskInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    addBtn.click();
  }
});
