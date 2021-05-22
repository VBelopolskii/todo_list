import LocalStorageService from "./services/local-storage.service.js"
import {generateTemplate} from "./components/Task/generate-template.component.js";
import {renderer} from "./components/Task/renderer.js";
import {addNewTask, selectTask, setTasksCounter, tasks, tasksList} from "./components/Task/tasks.js";

const addNewTaskForm = document.querySelector(".footer__form");

let todoList = [];

function init() {

    todoList = LocalStorageService.parseStorageValues("todo");

    todoList.forEach(task => {
        renderer(tasksList, generateTemplate(task));
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