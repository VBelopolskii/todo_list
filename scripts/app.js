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
let todoList = TASKS;

function init() {
    if (localStorage.getItem("todo")) {
        todoList = JSON.parse(localStorage.getItem("todo"));
    }
    renderTasks();
}

// MVP --- VIEW
function generateTemplate(task) {
    //
    const taskListEl = document.createElement('li');
    const taskInput = document.createElement('input');
    const taskLabel = document.createElement('label');
    taskListEl.innerText = task.name;
    taskListEl.prepend(taskInput);
    taskListEl.append(taskLabel);
    tasksList.append(taskListEl);
    taskInput.type = 'checkbox';
    taskInput.checked = task.isChecked;
    if (task.isChecked) {
        taskInput.className = taskListEl.className = TASK_CSS_CLASS.CHECKED;
        taskInput.className = taskListEl.className;
    }
    taskListEl.id = task.id;
    // Тут генерировать шаблон и его возвращать
}

function renderTasks() {
    todoList.forEach(task => {
        // Тут ловить сгенерированный шаблон и аппендить
        generateTemplate(task);

        // if (task.isChecked) {
        //     putTick(task.id);
        // }
    });
    // ...
    setTasksCounter();
}

function putTick(taskId) {
    const checkbox = document.querySelector(`li[id="${taskId}"] input`);
    checkbox.checked = !checkbox.checked;
}

function setTasksCounter() {
    counterElement.innerText = todoList.length;
}

function renderNewTask() {
    const newTask = todoList[todoList.length -1];
    generateTemplate(newTask);
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

// MVC - CONTROLLER
function selectTask(event) {
    // Is task finished <=> (task.isChecked != task.isChecked);
    const task = event.target;
    // По id найти task, изменить isChecked, запустить ререндер шаблона.

    // if (task.tagName === "LI") {
    //     if (task.classList.contains(TASK_CSS_CLASS.CHECKED)) {
    //         task.classList.remove(TASK_CSS_CLASS.CHECKED);
    //     } else {
    //         task.classList.add(TASK_CSS_CLASS.CHECKED);
    //     }
    //     putTick(task.id);
    //     todoList[task.id].isChecked = !todoList[task.id].isChecked;
    //     changeCheckboxProp(task);
    // }
}

tasksList.addEventListener("click", selectTask);



//------------------------------------------
// function isCheckboxChecked(task) {
//     return document.querySelector(`li[id="${task.id}"] input`).checked;
// }

function changeCheckboxProp(task) {

    const checkbox = document.querySelector(`li[id="${task.id}"] input`);
    checkbox.checked = task.isChecked;
}



//--------------------------------------------

init();

// Получить данные => Отрендерить данные по состоянию => слушать изменения
// Произошло изменение => обновили модель => перерендерили с новым состоянием