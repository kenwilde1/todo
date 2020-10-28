import { getCurrentProject } from './projects';
import { setLocalStorage } from './localstorage';

const Item = (title, description, dueDate, priority) => {
    const currentProjectTitle = document.querySelector('#selectProject').value; 
    const currentProject = getCurrentProject();
    currentProject.push([title, description, dueDate, priority]);
    setLocalStorage(currentProjectTitle, currentProject);
    return { title, description, dueDate, priority };
}

const deleteItem = (position) => {
    const currentProjectTitle = document.querySelector('#selectProject').value; 
    const currentProject = getCurrentProject();
    currentProject.splice(position, 1); 
    setLocalStorage(currentProjectTitle, currentProject);
}

export { Item, deleteItem };