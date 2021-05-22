const TASK_CSS_CLASS = {
    CHECKED: 'checked',
    UNCHECKED: 'unchecked'
}

export function generateTemplate(task) {
    const taskListEl = document.createElement('li');
    const taskInput = document.createElement('input');
    const taskLabel = document.createElement('label');
    taskListEl.innerText = task.name;
    taskListEl.prepend(taskInput);
    taskListEl.append(taskLabel);
    taskInput.type = 'checkbox';

    taskInput.checked = task.isChecked;
    taskListEl.className = task.isChecked ? TASK_CSS_CLASS.CHECKED : TASK_CSS_CLASS.UNCHECKED;

    taskListEl.id = task.id;
    taskInput.id = taskListEl.id;

    return taskListEl;
}