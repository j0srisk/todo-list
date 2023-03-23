import 'normalize.css';
import './styles.css';

import Project from './modules/project';
import Task from './modules/task';
import UI from './modules/ui';

let projectsList = [];
let activeProject = null;

function createDefaultProject() {
    addProject('Inbox');
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
    const projectSubmitButton = document.querySelector('#saveProjectBtn');
    projectSubmitButton.addEventListener('click', () => {
        const projectInputField = document.querySelector('#newProjectInput');
        const projectTitle  = projectInputField.value.trim();
        if(projectTitle){
            addProject(projectTitle);
        }
    });

    // Task Input Event Listeners
    const taskInputField = document.querySelector('#newTaskInput');
    taskInputField.addEventListener('keydown', (event) => {
        if(event.key === 'Enter'){
            event.preventDefault();
            if (taskInputField.value){
                addTask(taskInputField.value);
            }
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

function deleteProject(project) {
    const projectIndex = projectsList.indexOf(project);
    projectsList.splice(projectIndex, 1);
    UI.renderProjects(projectsList);
    updateActiveProject(projectsList[0]);
    UI.renderTasks(activeProject);
}

function addTask(title) {
    const newTask = new Task(title);
    activeProject.tasks.push(newTask);
    UI.renderTasks(activeProject);
}

function updateTask(task, title, completed, dueDate, priority) {
    task.title = title;
    task.completed = completed;
    task.dueDate = dueDate;
    task.priority = priority;
    console.log('updated task: ', task);
    UI.renderTasks(activeProject);
}

function deleteTask(task) {
    const taskIndex = activeProject.tasks.indexOf(task);
    activeProject.tasks.splice(taskIndex, 1);
    UI.renderTasks(activeProject);
    console.log(activeProject.tasks);
};

createDefaultProject();
setupEventListeners();

export { updateActiveProject, deleteProject, updateTask, deleteTask };