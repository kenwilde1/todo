const setLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
}

const getLocalStorage = (project) => {
    return JSON.parse(localStorage.getItem(project));
}

export { setLocalStorage, getLocalStorage }