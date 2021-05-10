import LocalStorageModule from "./modules/local-storage.module.js"
import {generateTemplate} from "./modules/generate-template.module.js";
import {rendererModule} from "./modules/renderer.module.js";
import {addNewTask, selectTask, setTasksCounter, tasks, tasksList} from "./modules/tasks.js";

const addNewTaskForm = document.querySelector(".footer__form");

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
    setTasksCounter(todoList);

}

addNewTaskForm.addEventListener("submit", function (event) {
    addNewTask(event, todoList)
});


tasksList.addEventListener("click", function (event) {
    selectTask(event, todoList)
});


init();