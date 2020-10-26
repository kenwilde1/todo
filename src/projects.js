import { getLocalStorage, setLocalStorage } from './localstorage';

let projectList = [
    {
        "title": "default",
        "todoList":
        [
            ["Breakfast", "Go get breakfast", "16/11/2020", "1"],
            ["Gym", "get to the gym", "01/01/2021", "1"]
        ]
    }
    ];

// let the current project be the default (first) project
let currentProject = projectList[0];

const Project = (title) => {
    let todoList = [];
    projectList.push({title, todoList});
    return { title, todoList };
}

const initializeDefaultProject = ( () => {

    setLocalStorage('default', 
    [
        ["Breakfast", "Go get breakfast", "16/11/2020", "1"],
        ["Gym", "get to the gym", "01/01/2021", "1"]
    ]);
    console.log(true);

})();

const getCurrentProject = () => {
    const getSelectValue = document.querySelector('#selectProject').value;
    return getLocalStorage(getSelectValue);

    //return projectList.find(project => project.title == getSelectValue.value);
}

export { Project, projectList, getCurrentProject, initializeDefaultProject };