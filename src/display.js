import { getCurrentProject, Project, projectList } from './projects';
import { deleteItem, editItem, Item } from './item';

let currentProject = getCurrentProject();

// elements that may be used more than once in multiple functions 
const todoContainer = document.querySelector('#todo-container');
const todoSliceForm = document.querySelector('#create-todo-form');
const createProjectForm = document.querySelector('#create-project-form');
const editTodoForm = document.querySelector('#edit-todo-form');

// module to handle DOM behaviour
const addEventListenersToButtons = ( () => {
    // get button elements
    const interactionButtons = document.querySelectorAll('.interaction-buttons');

    // add event listeners and expected behaviour to buttons
    interactionButtons.forEach( (button) => button.addEventListener('click', (e) => {
        switch (button.id) {
            case 'create-todo-button':
                // todo'Slice' refers to a single todo item 
                todoSliceForm.classList.toggle('form-style');
                break;
            case 'create-todo':
                createTodoListDOM();
                break;
            case 'create-project-button':
                createProjectForm.classList.toggle('form-style');
                break;
            case 'create-project':
                createProjectDOM();
                break;
            case 'edit-todo-button':
                console.log("hello");
                break;
        }

    }));


})();

const createProjectDOM = () => {
    const projectTitleField = document.querySelector('#project-title-value');
    const newProject = Project(projectTitleField.value);
    const createProjectForm = document.querySelector('#create-project-form');

    const selectField = document.querySelector('#selectProject');
    const newProjectOption = document.createElement('option');

    newProjectOption.value = projectTitleField.value;
    newProjectOption.innerHTML = projectTitleField.value;

    selectField.appendChild(newProjectOption);
    createProjectForm.classList.toggle('form-style');
}

const createTodoListDOM = () => {

    const todoTitle = document.querySelector('#todo-title-value').value;
    const todoDescription = document.querySelector('#todo-description-value').value;
    const todoDueDate = document.querySelector('#todo-date-value').value;
    const todoPriority = document.querySelector('#todo-priority-value').value;

    const newItem = Item(todoTitle, todoDescription, todoDueDate, todoPriority);
                
    while (todoContainer.childElementCount > 0) {
        todoContainer.removeChild(todoContainer.lastChild);
    }
    for (let i = 0; i < currentProject.todoList.length; i++) {
        const todoSlice = document.createElement('div');
        todoSlice.id = i;
        todoSlice.classList.add('todoItem');
        todoContainer.appendChild(todoSlice);
        for (let j = 0; j < 6; j++) {
            let property = document.createElement('p');
            switch (j) {
                case 0:
                    property.id = `${i}title`;
                    property.innerHTML = `Title: ${currentProject.todoList[i][j]}`;
                    break;
                case 1:
                    property.id = `${i}desc`;
                    property.innerHTML = `Description: ${currentProject.todoList[i][j]}`;
                    break;
                case 2:
                    property.id = `${i}date`;
                    property.innerHTML = `Due Date: ${currentProject.todoList[i][j]}`;
                    break;
                case 3:
                    property.id = `${i}priority`;
                    property.innerHTML = `Priority: ${currentProject.todoList[i][j]}`;
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
    todoSliceForm.classList.toggle('form-style');
    createNewEventListeners();
}

const updateTodoListDOM = (elementID) => {

    const element = document.getElementById(`${elementID}`);
    const todoProperties = element.querySelectorAll('p');

    todoProperties.forEach( (prop) => {
        switch(prop.id) {
            case `${elementID}title`:
                prop.innerHTML = `Title: ${currentProject.todoList[elementID][0]}`;
                break;
            case `${elementID}desc`:
                prop.innerHTML = `Description: ${currentProject.todoList[elementID][1]}`;
                break;
            case `${elementID}date`:
                prop.innerHTML = `Due Date: ${currentProject.todoList[elementID][2]}`;
                break;
            case `${elementID}priority`:
                prop.innerHTML = `Priority: ${currentProject.todoList[elementID][3]}`;
                break;
        }
    })


    console.log(todoProperties);


}

const createNewEventListeners = () => {
    // this function creates event listeners for dynamically created elements (buttons)
    const dynamicButtons = document.querySelectorAll('.todo-buttons');

    dynamicButtons.forEach( (button) => button.addEventListener('click', (e) => {
        if (button.innerHTML == 'Edit') {
            editTodoFormHandler(button.id);
        }
        
    }));
}

const editTodoFormHandler = (identifier) => {

    const editTodoTitle = document.querySelector('#edit-title-value');
    const editTodoDescription = document.querySelector('#edit-description-value');
    const editTodoDueDate = document.querySelector('#edit-date-value');
    const editTodoPriority = document.querySelector('#edit-priority-value');
    const saveChangesButton = document.querySelector('#save-changes-button');

    const todoTitle = document.querySelector('#todo-title-value').value;
    const todoDescription = document.querySelector('#todo-description-value').value;
    const todoDueDate = document.querySelector('#todo-date-value').value;
    const todoPriority = document.querySelector('#todo-priority-value').value;

    editTodoTitle.value = currentProject.todoList[identifier][0];
    editTodoDescription.value = currentProject.todoList[identifier][1];
    editTodoDueDate.value = currentProject.todoList[identifier][2];
    editTodoPriority.value = currentProject.todoList[identifier][3];


    editTodoForm.classList.toggle('form-style');

    saveChangesButton.addEventListener('click', (e) => {

        console.log(identifier);
        currentProject.todoList[identifier][0] = editTodoTitle.value;
        currentProject.todoList[identifier][1] = editTodoDescription.value;
        currentProject.todoList[identifier][2] = editTodoDueDate.value;
        currentProject.todoList[identifier][3] = editTodoPriority.value;
        updateTodoListDOM(identifier);

        //editItem(editTitleField, editDescField, editDueDateField, editPriorityField);
        //console.log(currentProject.todoList);
    

    })

}


// Notes for tomorrow
// make edit todo form in the HTML rather than DOM
