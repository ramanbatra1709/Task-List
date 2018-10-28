const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const taskInput = document.querySelector('#task');

addEventListeners();

function addEventListeners()    {
    form.addEventListener('submit', addTask);
}

function addTask(event) {
    if (taskInput.value === '') {
        alert('Add a task please!');
    }
    else    {
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(taskInput.value));
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fa fa-remove"></i>';
        li.appendChild(link);
        taskList.appendChild(li); 
        taskInput.value = '';
    }
    event.preventDefault();
}
