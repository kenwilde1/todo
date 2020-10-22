import { getCurrentProject, Project, projectList } from './projects';
import { Item } from './item';

let currentProject = getCurrentProject();

// elements that may be used more than once in multiple functions 
const todoContainer = document.querySelector('#todo-container');
const todoSliceForm = document.querySelector('#create-todo-form');
const createProjectForm = document.querySelector('#create-project-form');

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
                                property.innerHTML = `Title: ${currentProject.todoList[i][j]}`;
                                break;
                            case 1:
                                property.innerHTML = `Description: ${currentProject.todoList[i][j]}`;
                                break;
                            case 2:
                                property.innerHTML = `Due Date: ${currentProject.todoList[i][j]}`;
                                break;
                            case 3:
                                property.innerHTML = `Priority: ${currentProject.todoList[i][j]}`;
                                break;
                            case 4:
                                property = document.createElement('button');
                                property.innerHTML = 'Edit';
                                property.id = 'edit-todo-button';
                                break;
                            case 5:
                                property = document.createElement('button');
                                property.innerHTML = 'Delete';
                                property.id = 'delete-todo-button';
                                break;
                        }
                        todoSlice.appendChild(property);
                    }
                }
                todoSliceForm.classList.toggle('form-style');
}
