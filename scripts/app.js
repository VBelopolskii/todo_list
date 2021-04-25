import {TASKS} from "./tasks.js"

const tasksList = document.querySelector('.content__main-list');
const counterElement = document.querySelector('.task-count');
const inputNewTask = document.getElementById("footer__new-task");
const addNewTaskBtn = document.querySelector(".footer__button");
const addNewTaskForm = document.querySelector(".footer__form");

const TASK_CSS_CLASS = {
    CHECKED: 'checked',
    UNCHECKED: 'unchecked'
}

function generateTemplate(task) {
    const taskListEl = document.createElement('li');
    const taskInput = document.createElement('input');
    const taskLabel = document.createElement('label');
    taskListEl.innerText = task.name;
    taskListEl.prepend(taskInput);
    taskListEl.append(taskLabel);
    tasksList.append(taskListEl);
    taskInput.type = 'checkbox';
    taskListEl.className = task.isChecked ? TASK_CSS_CLASS.CHECKED : TASK_CSS_CLASS.UNCHECKED;
}

function setTasksCounter() {
    counterElement.innerText = TASKS.length;
}

function renderTasks() {
    TASKS.forEach(task => {
        generateTemplate(task);
    });
    setTasksCounter();
}

function renderNewTask() {
    const newTask = TASKS[TASKS.length - 1];
    generateTemplate(newTask);
    setTasksCounter();
}

function addNewTask(evt) {
    evt.preventDefault();

    if (!inputNewTask.value.trim()) {
        alert("Type at least one symbol in the input field");
        return;
    }

    TASKS.push(
        {
            id: TASKS.length,
            name: inputNewTask.value.trim(),
            isChecked: false
        });

    renderNewTask();
    clearInputField();

}

function clearInputField() {
    inputNewTask.value = "";
}


addNewTaskForm.addEventListener("submit", addNewTask);

function init() {
    renderTasks();
}

init();