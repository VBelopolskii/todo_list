import {TASKS} from "./tasks.js";

const tasksList = document.querySelector('.content__main-list');

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

function init(list) {
    list.forEach(task => {
        generateTemplate(task);
    })
}

init(TASKS);