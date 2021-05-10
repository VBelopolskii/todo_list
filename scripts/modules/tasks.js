import LocalStorageModule from "./local-storage.module.js";
import {rendererModule} from "./renderer.module.js";
import {generateTemplate} from "./generate-template.module.js";

let tasks = [];

const inputNewTask = document.getElementById("footer__new-task");


const tasksList = document.querySelector('.content__main-list');

function addNewTask(evt, array) {
    evt.preventDefault();

    if (!inputNewTask.value.trim()) {
        alert("Type at least one symbol in the input field");
        return;
    }

    array.push(
        {
            id: array.length,
            name: inputNewTask.value.trim(),
            isChecked: false
        });

    LocalStorageModule.set("todo", array);

    let newTask = array[array.length - 1];
    rendererModule(tasksList, generateTemplate(newTask));

    clearInput();

}

function clearInput() {
    inputNewTask.value = "";
}

function selectTask(event, array) {
    const taskEl = event.target;
    let task = array[taskEl.id];

    task.isChecked = (taskEl.tagName === 'INPUT') ? taskEl.checked : !task.isChecked;

    LocalStorageModule.set("todo", array);

    tasksList.innerHTML = '';

    array.forEach(task => {
        rendererModule(tasksList, generateTemplate(task));
    });
    setTasksCounter(array);
}

function setTasksCounter(array) {

    document.querySelector('.task-count').innerText = array.length;
}

export {
    addNewTask,
    selectTask,
    setTasksCounter,
    tasks,
    tasksList
}