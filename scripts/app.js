import {TASKS} from "./tasks.js"
// test for git
const tasksList = document.querySelector('.content__main-list');
const countElement = document.querySelector('.task-count');

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

function hideCheckedTask() {
}

function showCounter(number) {
    return countElement.innerText = number;
}

function init(list) {
    let tasksNumber = 0
    list.forEach(task => {
        generateTemplate(task);
        tasksNumber++;
    });
    showCounter(tasksNumber);
}

init(TASKS);