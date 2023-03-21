import 'normalize.css';
import './styles.css';

import Project from './modules/project';
import Task from './modules/task';
import UI from './modules/ui';

let projectsList = [];
let activeProject = null;

function createDefaultProject() {
    addProject('Default Project');
    addTask('Default Task 1');
    addTask('Default Task 2');
    addTask('Default Task 3');
}

function updateActiveProject(project) {
    activeProject = project;
    UI.renderTasks(activeProject);

    return activeProject;
}

function setupEventListeners() {
    // Project Input Event Listeners
    const projectInputField = document.querySelector('#newProjectInput');
    const projectSubmitButton = document.querySelector('#saveProjectBtn');
    projectSubmitButton.addEventListener('click', () => {
        const projectTitle  = projectInputField.value.trim();
        if(projectTitle){
            addProject(projectTitle);
        }
    });

    // Task Input Event Listeners
    const taskInputField = document.querySelector('#newTaskInput');
    const taskSubmitButton = document.querySelector('#saveTaskBtn');
    taskSubmitButton.addEventListener('click', () => {
        const taskTitle  = taskInputField.value.trim();
        if(taskTitle){
            addTask(taskTitle);
        }
    });
}

function addProject(title) {
    const newProject = new Project(title);
    projectsList.push(newProject);
    updateActiveProject(newProject);
    UI.renderProjects(projectsList);
    UI.renderTasks(activeProject);
}

function removeProject(project) {
    const index = projectsList.indexOf(project);
    projectsList.splice(index, 1);
}

function addTask(title) {
    const newTask = new Task(title);
    activeProject.tasks.push(newTask);
    UI.renderTasks(activeProject);
}

createDefaultProject();
setupEventListeners();

export { updateActiveProject };