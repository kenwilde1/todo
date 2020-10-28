import { getCurrentProject, Project } from './projects';
import { deleteItem, Item } from './item';
import { setLocalStorage } from './localstorage';

let currentProject = getCurrentProject();

// elements that may be used more than once in multiple functions 
const todoContainer = document.querySelector('#todo-container');
const todoSliceForm = document.querySelector('#create-todo-form');
const createProjectForm = document.querySelector('#create-project-form');
const editTodoForm = document.querySelector('#edit-todo-form');
const createForms = document.querySelector('#create-forms');

// module to handle DOM behaviour
const addEventListenersToButtons = ( () => {
    
    // get button elements
    const interactionButtons = document.querySelectorAll('.interaction-buttons');

    // add event listeners and expected behaviour to buttons
    interactionButtons.forEach( (button) => button.addEventListener('click', (e) => {
        switch (button.id) {
            case 'create-todo-button':
                // todo'Slice' refers to a single todo item 
                if (!createProjectForm.classList.contains('form-style')) {
                    alert('You cannot create a new todo item while you are creating a new project');
                }else if (!editTodoForm.classList.contains('form-style')) {
                    alert('You cannot create a new todo item while you are editing a current todo item');
                }
                else {
                    todoSliceForm.classList.toggle('form-style');
                }
                break;
            case 'create-todo':
                createTodo();
                break;
            case 'create-project-button':
                if (!todoSliceForm.classList.contains('form-style')) {
                    alert('You cannot create a new project while you are creating a new todo item');
                }else if (!editTodoForm.classList.contains('form-style')) {
                    alert('You cannot create a new project while you are editing a todo item')
                }else {
                    createProjectForm.classList.toggle('form-style');
                }
                break;
            case 'create-project':
                createProjectDOM();
                break;
            case 'edit-todo-button':
                break;
            case 'show-todos-button':
                renderTodoDOM();
                break;
            case 'exit-todo-form':
                todoSliceForm.classList.toggle('form-style');
                break;
            case 'exit-project-form':
                createProjectForm.classList.toggle('form-style');
                break;
        }
        if (button.innerHTML == 'X') {
            switch (button.id) {
                case 'exit-edit-form':
                    editTodoForm.classList.toggle('form-style');
                    break;
            }
        }
    }));
})();

const displayProjects = (() => {
    
    const selectContainer = document.querySelector('#selectProject');

    for (let i = 0; i < localStorage.length; i++) {

        const addProject = document.createElement('option');
        addProject.id = localStorage.key(i);
        addProject.value = localStorage.key(i);
        addProject.innerHTML = localStorage.key(i);
        selectContainer.appendChild(addProject);
    }

})(); 

const renderTodoDOM = () => {

    currentProject = getCurrentProject();

    todoContainer.classList.toggle('form-style');

    while (todoContainer.childElementCount > 0) {
        todoContainer.removeChild(todoContainer.lastChild);
    }

    for (let i = 0; i < currentProject.length; i++) {
        const todoSlice = document.createElement('div');
        todoSlice.id = i;
        todoSlice.classList.add('todoItem');
        todoContainer.appendChild(todoSlice);
        for (let j = 0; j < 6; j++) {
            let property = document.createElement('p');
            switch (j) {
                case 0:
                    property.id = `${i}title`;
                    property.innerHTML = `Title: ${currentProject[i][j]}`;
                    break;
                case 1:
                    property.id = `${i}desc`;
                    property.innerHTML = `Description: ${currentProject[i][j]}`;
                    break;
                case 2:
                    property.id = `${i}date`;
                    property.innerHTML = `Due Date: ${currentProject[i][j]}`;
                    break;
                case 3:
                    if (currentProject[i][j] == 1) {
                        todoSlice.classList.add('priorityOne');
                    }
                    property.id = `${i}priority`;
                    property.innerHTML = `Priority: ${currentProject[i][j]}`;
                    break;
                case 4:
                    property = document.createElement('button');
                    property.innerHTML = 'Edit';
                    property.id = i;
                    property.classList.add("todo-buttons");
                    break;
                case 5:
                    property = document.createElement('button');
                    property.innerHTML = 'Delete';
                    property.id = i;
                    property.classList.add("todo-buttons");
                    break;
            }
            todoSlice.appendChild(property);
        }
    }
    createNewEventListeners();
}

const createProjectDOM = () => {

    const getSelectValue = document.querySelector('#selectProject').value;

    const projectTitleField = document.querySelector('#project-title-value');
    const newProject = Project(projectTitleField.value);
    const createProjectForm = document.querySelector('#create-project-form');

    const selectField = document.querySelector('#selectProject');
    const newProjectOption = document.createElement('option');

    newProjectOption.value = projectTitleField.value;
    newProjectOption.innerHTML = projectTitleField.value;

    selectField.appendChild(newProjectOption);
    createProjectForm.classList.toggle('form-style');
    setLocalStorage(newProjectOption.value, []);
}

const createTodo = () => {

    const getSelectValue = document.querySelector('#selectProject').value;

    const todoTitle = document.querySelector('#todo-title-value').value;
    const todoDescription = document.querySelector('#todo-description-value').value;
    const todoDueDate = document.querySelector('#todo-date-value').value;
    const todoPriority = document.querySelector('#todo-priority-value').value;

    // ensure priority is between 1 - 3 in order to create a todo
    if (parseInt(todoPriority) > 3 || parseInt(todoPriority) < 1) {
        alert("Please choose a priority between 1-3 (High = 1, Medium = 2, Low = 3");
    }else {
        const newItem = Item(todoTitle, todoDescription, todoDueDate, todoPriority);

        todoSliceForm.classList.toggle('form-style');
        renderTodoDOM();
    }           
}

const updateTodoListDOM = (elementID) => {

    const element = document.getElementById(`${elementID}`);
    const todoProperties = element.querySelectorAll('p');

    todoProperties.forEach( (prop) => {
        switch(prop.id) {
            case `${elementID}title`:
                prop.innerHTML = `Title: ${currentProject[elementID][0]}`;
                break;
            case `${elementID}desc`:
                prop.innerHTML = `Description: ${currentProject[elementID][1]}`;
                break;
            case `${elementID}date`:
                prop.innerHTML = `Due Date: ${currentProject[elementID][2]}`;
                break;
            case `${elementID}priority`:
                prop.innerHTML = `Priority: ${currentProject[elementID][3]}`;
                break;
        }
    });
}

const createNewEventListeners = () => {
    // this function creates event listeners for dynamically created elements (buttons)
    const dynamicButtons = document.querySelectorAll('.todo-buttons');
    
    dynamicButtons.forEach( (button) => button.addEventListener('click', (e) => {
        
        if (button.innerHTML == 'Edit') {
            if (!createProjectForm.classList.contains('form-style') || !todoSliceForm.classList.contains('form-style')) {
                alert('You cannot edit a todo item while you are still editing / creating something else');
            }else {
                editTodoFormHandler(button.id);
            }
            
        }else if(button.innerHTML == 'Delete') {
            
            deleteTodoFormHandler(button.id);
        }
        
    }));
}

const editTodoFormHandler = (identifier) => {

    const currentProjectTitle = document.querySelector('#selectProject').value;

    editTodoForm.classList.toggle('form-style');

    const editTodoTitle = document.querySelector('#edit-title-value');
    const editTodoDescription = document.querySelector('#edit-description-value');
    const editTodoDueDate = document.querySelector('#edit-date-value');
    const editTodoPriority = document.querySelector('#edit-priority-value');
    const saveChangesButton = document.querySelector('#save-changes-button');

    const todoTitle = document.querySelector('#todo-title-value').value;
    const todoDescription = document.querySelector('#todo-description-value').value;
    const todoDueDate = document.querySelector('#todo-date-value').value;
    const todoPriority = document.querySelector('#todo-priority-value').value;

    editTodoTitle.value = currentProject[identifier][0];
    editTodoDescription.value = currentProject[identifier][1];
    editTodoDueDate.value = currentProject[identifier][2];
    editTodoPriority.value = currentProject[identifier][3];

    saveChangesButton.addEventListener('click', (e) => {
        
        currentProject[identifier][0] = editTodoTitle.value;
        currentProject[identifier][1] = editTodoDescription.value;
        currentProject[identifier][2] = editTodoDueDate.value;
        currentProject[identifier][3] = editTodoPriority.value;
        setLocalStorage(currentProjectTitle, currentProject);
        updateTodoListDOM(identifier);
        editTodoForm.classList.add('form-style');

    })
}

const deleteTodoFormHandler = (todo) => {
    deleteItem(todo);
    renderTodoDOM();
}

