import {TASKS} from "./tasks.js"

const tasksList = document.querySelector('.content__main-list');
const counterElement = document.querySelector('.task-count');
const inputNewTask = document.getElementById("footer__new-task");
const addNewTaskBtn = document.querySelector(".footer__button");
const addNewTaskForm = document.querySelector(".footer__form");

function generateTemplate(task) {
    const taskListEl = document.createElement('li');
    const taskInput = document.createElement('input');
    const taskLabel = document.createElement('label');
    taskListEl.innerText = task.name;
    taskListEl.prepend(taskInput);
    taskListEl.append(taskLabel);
    tasksList.append(taskListEl);
    taskInput.type = 'checkbox';
    taskInput.className = task.isChecked ? 'done' : 'undone';
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

    if (inputNewTask.value === '') {
        evt.preventDefault();
        alert("Type at least one symbol in the input field");
    } else {

        TASKS.push(
            {
                id: TASKS.length,
                name: inputNewTask.value,
                isChecked: false
            });

        renderNewTask();
        evt.preventDefault();

        clearInputField();
    }
}

function clearInputField() {
    inputNewTask.value = "";
}


addNewTaskForm.addEventListener("submit", addNewTask);

function init() {
    renderTasks();
}

init();