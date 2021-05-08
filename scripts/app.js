import {TASKS} from "./tasks.js"

const tasksList = document.querySelector('.content__main-list');
const tasks = document.querySelectorAll('.content__main-list li');
const counterElement = document.querySelector('.task-count');
const inputNewTask = document.getElementById("footer__new-task");
const addNewTaskForm = document.querySelector(".footer__form");

const TASK_CSS_CLASS = {
    CHECKED: 'checked'
}


// TODO Storage не захотел работать с экспортируемым массивом
let todoList = [];

function init() {
    if (localStorage.getItem("todo")) {
        todoList = JSON.parse(localStorage.getItem("todo"));
    }
    renderTasks();
}

// MVP --- VIEW
function generateTemplate(task) {
    const taskListEl = document.createElement('li');
    const taskInput = document.createElement('input');
    const taskLabel = document.createElement('label');
    taskListEl.innerText = task.name;
    taskListEl.prepend(taskInput);
    taskListEl.append(taskLabel);
    taskInput.type = 'checkbox';

    taskInput.checked = task.isChecked;
    if (task.isChecked) {
        taskListEl.className = TASK_CSS_CLASS.CHECKED;
        taskInput.className = taskListEl.className;
    }

    taskListEl.id = task.id;
    taskInput.id = taskListEl.id;

    // Тут генерировать шаблон и его возвращать
    return taskListEl;
}

function renderTasks() {
    todoList.forEach(task => {
        tasksList.append(generateTemplate(task));
    });
    // ...
    setTasksCounter();
}

function rerenderTask(task) {
    tasksList.append(generateTemplate(task));
    setTasksCounter();
}

function setTasksCounter() {
    counterElement.innerText = todoList.length;
}

function renderNewTask() {
    const newTask = todoList[todoList.length - 1];
    let taskTemplate = generateTemplate(newTask);
    tasksList.append(taskTemplate);
    setTasksCounter();
}

//
function addNewTask(evt) {
    evt.preventDefault();

    if (!inputNewTask.value.trim()) {
        alert("Type at least one symbol in the input field");
        return;
    }

    todoList.push(
        {
            id: todoList.length,
            name: inputNewTask.value.trim(),
            isChecked: false
        });

    localStorage.setItem("todo", JSON.stringify(todoList));
    renderNewTask();
    clearInput();

}

function clearInput() {
    inputNewTask.value = "";
}


addNewTaskForm.addEventListener("submit", addNewTask);


// MVC - CONTROLLER
function selectTask(event) {
    // Is task finished <=> (task.isChecked != task.isChecked);
    const taskEl = event.target;
    let task = todoList[taskEl.id];

    task.isChecked = (taskEl.tagName === 'INPUT') ? taskEl.checked : !task.isChecked;

    // По id найти task, изменить isChecked, запустить ререндер шаблона.
    // task.isChecked = !task.isChecked;

    localStorage.setItem("todo", JSON.stringify(todoList));

    tasksList.innerHTML = '';
    renderTasks();
}

tasksList.addEventListener("click", selectTask);



//--------------------------------------------

init();

// Получить данные => Отрендерить данные по состоянию => слушать изменения
// Произошло изменение => обновили модель => перерендерили с новым состоянием