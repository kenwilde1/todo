let projectList = [
    {
        "title": "default",
        "todoList":
        [
            
        ]
    }
    ];

let currentProject = projectList[0];

const Project = (title) => {
    let todoList = [];
    projectList.push({title, todoList});
    return { title, todoList };
}

const getCurrentProject = () => {
    const getSelectValue = document.querySelector('#selectProject');
    return projectList.find(project => project.title == getSelectValue.value);
}

const setCurrentProject = (position) => {

    currentProject = projectList[position];
}

export { Project, projectList, setCurrentProject, getCurrentProject };