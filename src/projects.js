let projectList = [
    {
        "title": "Food",
        "todoList":
        [
            ["breakfast", "go get breakfast", "16/11/2020", 1]
        ]
    }
    ];

let currentProject = projectList[0];

const Project = (title) => {
    let todoList = [title];
    projectList.push({title, todoList});
    return { title };
}

const getCurrentProject = () => {
    return currentProject;
}

const setCurrentProject = (position) => {
    currentProject = projectList[position];
}

export { Project, projectList, setCurrentProject, getCurrentProject };