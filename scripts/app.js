import {TASKS} from './storage.js';

const ELEMENTS = {
  DIV: 'div'
}

const CLASSES = {
  FINISHED: 'finished'
}

const mainList = document.querySelector('.content__main-list');

init(TASKS);

function init(list) {
  list.forEach(task => {
    generateTemplate(task);
  });
}

function generateTemplate(task) {
  const block = document.createElement(ELEMENTS.DIV);
  block.innerText = task.title;
  block.className = task.isDone ? CLASSES.FINISHED : '';
  block.className = 'task';
  appendToList(block);
}

function appendToList(template) {
  mainList.appendChild(template);
}

const checkbox = document.querySelector("#todo1");

checkbox.addEventListener('change', (evt) => onCheckboxChange(evt));

function onCheckboxChange(evt) {
  const id = evt.target.getAttribute('id');
  const clickedElement = getElement(`#${id}`);
  const isToggled = evt.target.checked;
  isToggled
      ? addClassToBlock(clickedElement, CLASSES.FINISHED)
      : removeClassFromBlock(clickedElement, CLASSES.FINISHED);
}

function addClassToBlock(block, className) {
  block.classList.add(className);
}

function removeClassFromBlock(block, className) {
  block.classList.remove(className);
}

function getElement(selector) {
  return document.querySelector(selector);
}
