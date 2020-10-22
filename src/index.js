import { Project, projectList, setCurrentProject, getCurrentProject } from './projects';
import { Item, deleteItem } from './item';
import addEventListenerToButtons from './display';

// initialize a list of projects, 'default' project is default
let currentProject = getCurrentProject();
console.log(currentProject.title);

//const newProject = Project("default");
//console.log(currentProject);

//const newTodoItem = Item("gym", "go to the gym", "16/11/2020", 1);
//console.log(currentProject.todoList);

//console.log(currentProject.todoList.indexOf(currentProject));
//deleteItem(currentProject.todoList.indexOf(newTodoItem));
//console.log(currentProject.todoList);












