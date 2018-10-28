const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

addEventListeners();

function addEventListeners()    {
    document.addEventListener('DOMContentLoaded', getTasks);
    form.addEventListener('submit', addTask);
    taskList.addEventListener('click', removeTask);
    clearBtn.addEventListener('click', clearTasks);
    filter.addEventListener('keyup', filterTasks);
}

function getTasks() {
    const localStorageTasks = localStorage.getItem('tasks');
    const tasks = (localStorageTasks === null)? []: JSON.parse(localStorageTasks);
    tasks.forEach(function(task) {
        createTaskInUI(task);
    });
}

function addTask(event) {
    if (taskInput.value === '') {
        alert('Add a task please!');
    }
    else    {
        createTaskInUI(taskInput.value);
        storeTask(taskInput.value);
        taskInput.value = '';
    }
    event.preventDefault();
}

function createTaskInUI(taskName) {
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(taskName));
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);
    taskList.appendChild(li);
}

function storeTask(task)    {
    const oldTasks = localStorage.getItem('tasks');
    let newTasks = (oldTasks === null)? []: JSON.parse(oldTasks);
    newTasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
}

function removeTask(event)   {
    const link = event.target.parentElement;
    if (link.classList.contains('delete-item') && confirm(`Delete task "${link.parentElement.textContent}"?`))   {
        link.parentElement.remove();
        unStoreTask(link.parentElement);
    }
}

function unStoreTask(taskListElement)  {
    const oldTasks = localStorage.getItem('tasks');
    let newTasks = (oldTasks === null)? []: JSON.parse(oldTasks);
    newTasks.forEach(function(task, index) {
        if (taskListElement.textContent === task)   {
            newTasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(newTasks));
}

function clearTasks()   {
    while(taskList.firstChild)  {
        taskList.removeChild(taskList.firstChild);
    }
    localStorage.clear();
}

function filterTasks(event)  {
    const text = event.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function(task)    {
        if (task.firstChild.textContent.toLowerCase().indexOf(text) != -1)  {
            task.style.display = 'block';
        }
        else    {
            task.style.display = 'none';
        }
    });
}
