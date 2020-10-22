import { getCurrentProject, projectList, setCurrentProject } from './projects';

const currentProject = getCurrentProject();

const Item = (title, description, dueDate, priority) => {
    currentProject.todoList.push([title, description, dueDate, priority]);
    
    return { title, description, dueDate, priority };
}

const editItem = () => {
    // edit individual property or all?
}

const deleteItem = (position) => {
    currentProject.todoList.splice(position, 1); 
}

export { Item, deleteItem };