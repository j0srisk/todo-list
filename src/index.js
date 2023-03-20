import 'normalize.css';
import './styles.css';

import Project from './modules/project';
import Task from './modules/task';
import UI from './modules/ui';

let projectsList = [];
let activeProject = null;

function createDefaultProject() {
    addProject('Default Project');
    addProject('Groceries');
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

function setupProjectItemEventListeners() {
    const projectItems = document.querySelectorAll('.project-item');
    projectItems.forEach((projectItem) => {
        projectItem.addEventListener('click', (event) => {
            const projectTitle = event.target.textContent;
            const project = projectsList.find((project) => project.title === projectTitle);
            activeProject = project;
            UI.renderTasks(activeProject);
        });
    });
}

function addProject(title) {
    const newProject = new Project(title);
    projectsList.push(newProject);
    activeProject = newProject;
    UI.renderProjects(projectsList);
    UI.renderTasks(activeProject);
    setupProjectItemEventListeners();
}

function addTask(title) {
    const newTask = new Task(title);
    activeProject.tasks.push(newTask);
    UI.renderTasks(activeProject);
}

createDefaultProject();
setupEventListeners();