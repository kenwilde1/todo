import { getCurrentProject, projectList, setCurrentProject } from './projects';



const Item = (title, description, dueDate, priority) => {

    const currentProject = getCurrentProject();
    currentProject.todoList.push([title, description, dueDate, priority]);
    
    return { title, description, dueDate, priority };
}

const editItem = (title, desc, duedate, priority) => {
    
    currentProject

}

const deleteItem = (position) => {
    const currentProject = getCurrentProject();
    currentProject.todoList.splice(position, 1); 
}

export { Item, deleteItem };