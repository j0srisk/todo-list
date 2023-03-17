import 'normalize.css';
import './styles.css';

import Project from './modules/project';
import Task from './modules/task';
import UI from './modules/ui';

let projectsList = [];

function createDefaultProject() {
    addProject('Default Project');
    UI.renderTasks(projectsList[0]);
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
    UI.renderProjects(projectsList);
    UI.renderTasks(newProject);
}

function addTask(title) {
    const newTask = new Task(title);
    activeProject.tasks.push(newTask);
    console.log(activeProject);
    UI.renderTasks(activeProject);
}

createDefaultProject();
setupEventListeners();