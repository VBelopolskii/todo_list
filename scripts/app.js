import {TASKS} from "./tasks.js"

const tasksList = document.querySelector('.content__main-list');
const tasks = document.querySelectorAll('.content__main-list li');
const counterElement = document.querySelector('.task-count');
const inputNewTask = document.getElementById("footer__new-task");
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
    taskListEl.id = task.id;
    taskInput.className = taskListEl.className;
}

function renderTasks() {
    TASKS.forEach(task => {
        generateTemplate(task);
        if (task.isChecked) {
            putTick(task);
        }
    });
    setTasksCounter();
}

function setTasksCounter() {
    counterElement.innerText = TASKS.length;
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
            id: TASKS.length + 1,
            name: inputNewTask.value.trim(),
            isChecked: false
        });

    renderNewTask();
    clearInput();

}

function clearInput() {
    inputNewTask.value = "";
}


addNewTaskForm.addEventListener("submit", addNewTask);



// tasks.addEventListener("click", task => {selectTask(task)});

// tasks.forEach(function(task) {
//     task.addEventListener("click", selectTask)
// })

function selectTask(event) {
    const task = event.target;
    if(task.tagName === "LI") {
        if (task.classList.contains(TASK_CSS_CLASS.CHECKED)) {
            task.classList.remove(TASK_CSS_CLASS.CHECKED);
            task.classList.add(TASK_CSS_CLASS.UNCHECKED);
        } else {
            task.classList.remove(TASK_CSS_CLASS.UNCHECKED);
            task.classList.add(TASK_CSS_CLASS.CHECKED);
        }
        putTick(task);
        console.log(TASKS[task.id - 1]);
    }
};

tasksList.addEventListener("click", selectTask);


//------------------------------------------
function isCheckboxChecked(taskEl) {
    return document.querySelector(`li[id="${taskEl.id}"] input`).checked;
}

function changeCheckboxProp(task, taskEl) {
    if (task.isChecked === TASK_CSS_CLASS.CHECKED) {
        taskEl.querySelector("input").checked = true;
    } else {
        taskEl.querySelector("input").checked = false;
    }
}

function putTick(task) {
    document.querySelector(`li[id="${task.id}"] input`).click();
}


//--------------------------------------------

function init() {
    renderTasks();
}

init();