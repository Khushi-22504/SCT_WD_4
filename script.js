const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = task.completed ? 'completed' : '';
    li.innerHTML = `
      <strong>${task.name}</strong><br>
      <small>${task.dateTime}</small><br>
      <button onclick="toggleComplete(${index})">✔</button>
      <button onclick="editTask(${index})">✎</button>
      <button onclick="deleteTask(${index})">✖</button>
    `;
    taskList.appendChild(li);
  });
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

taskForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const taskName = document.getElementById('taskInput').value;
  const taskDateTime = document.getElementById('taskDateTime').value;
  tasks.push({ name: taskName, dateTime: taskDateTime, completed: false });
  saveTasks();
  renderTasks();
  taskForm.reset();
});

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function editTask(index) {
  const newName = prompt("Edit task name:", tasks[index].name);
  if (newName) {
    tasks[index].name = newName;
    saveTasks();
    renderTasks();
  }
}

function deleteTask(index) {
  if (confirm("Delete this task?")) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  }
}

renderTasks();