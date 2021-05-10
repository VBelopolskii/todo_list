// import {TASKS} from "./modules/tasks.js"
import LocalStorageModule from "./modules/local-storage.module.js"
import {generateTemplate} from "./modules/generate-template.module.js";
import {rendererModule} from "./modules/renderer.module.js";

const tasksList = document.querySelector('.content__main-list');
const tasks = document.querySelectorAll('.content__main-list li');
const counterElement = document.querySelector('.task-count');
const inputNewTask = document.getElementById("footer__new-task");
const addNewTaskForm = document.querySelector(".footer__form");

const TASK_CSS_CLASS = {
    CHECKED: 'checked',
    UNCHECKED: 'unchecked'
}


// TODO Storage не захотел работать с экспортируемым массивом
let todoList = [];

function parseStorageValues() {
    if (LocalStorageModule.get("todo")) {
        todoList = JSON.parse(LocalStorageModule.get("todo"));
    }
}

function init() {
    parseStorageValues();

    todoList.forEach(task => {
        rendererModule(tasksList, generateTemplate(task));
    });
    setTasksCounter();

}

function setTasksCounter() {
    counterElement.innerText = todoList.length;
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

    LocalStorageModule.set("todo", todoList);

    let newTask = todoList[todoList.length - 1];
    rendererModule(tasksList, generateTemplate(newTask));

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

    LocalStorageModule.set("todo", todoList);

    tasksList.innerHTML = '';

    // renderTasks();

    todoList.forEach(task => {
        rendererModule(tasksList, generateTemplate(task));
    });
    setTasksCounter();
}

tasksList.addEventListener("click", selectTask);


//--------------------------------------------

init();

// Получить данные => Отрендерить данные по состоянию => слушать изменения
// Произошло изменение => обновили модель => перерендерили с новым состоянием