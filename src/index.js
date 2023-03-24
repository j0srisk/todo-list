import "normalize.css";
import "./styles.css";

import Project from "./modules/project";
import Task from "./modules/task";
import UI from "./modules/ui";
import Storage from "./modules/storage";

let projectsList = [];
let activeProject = null;

function updateActiveProject(project) {
  if (project != null) {
    activeProject = project;
    UI.renderTasks(activeProject);
  }

  return activeProject;
}

function addProject(title) {
  const newProject = new Project(title);
  projectsList.push(newProject);
  updateActiveProject(newProject);
  UI.renderProjects(projectsList);
  UI.renderTasks(activeProject);
  Storage.save(projectsList);
}

function deleteProject(project) {
  const projectIndex = projectsList.indexOf(project);
  projectsList.splice(projectIndex, 1);
  UI.renderProjects(projectsList);
  updateActiveProject(projectsList[0]);
  UI.renderTasks(activeProject);
  Storage.save(projectsList);
}

function addTask(title) {
  const newTask = new Task(title);
  newTask.dueDate = "";
  activeProject.tasks.push(newTask);
  UI.renderTasks(activeProject);
  Storage.save(projectsList);
}

function updateTask(task, title, completed, dueDate, priority) {
  const currentTask = task;
  currentTask.title = title;
  currentTask.completed = completed;
  currentTask.dueDate = dueDate;
  currentTask.priority = priority;
  UI.renderTasks(activeProject);
  Storage.save(projectsList);
}

function deleteTask(task) {
  const taskIndex = activeProject.tasks.indexOf(task);
  activeProject.tasks.splice(taskIndex, 1);
  UI.renderTasks(activeProject);
  Storage.save(projectsList);
}

function createDefaultProject() {
  addProject("Inbox");
  addTask("Create a new project");
  addTask("Create a new task");
  addTask("Mark a task as completed");
}

function loadProjects() {
  const storedProjectsList = Storage.load();
  if (storedProjectsList.length === 0) {
    console.log("No projects found in local storage. Creating default project.");
    createDefaultProject();
  } else {
    projectsList = storedProjectsList;
  }
  updateActiveProject(projectsList[0]);
  UI.renderProjects(projectsList);
}

function setupEventListeners() {
  // Project Input Event Listeners
  const projectSubmitButton = document.querySelector("#saveProjectBtn");
  projectSubmitButton.addEventListener("click", () => {
    const projectInputField = document.querySelector("#newProjectInput");
    const projectTitle = projectInputField.value.trim();
    if (projectTitle) {
      addProject(projectTitle);
    }
  });

  // Task Input Event Listeners
  const taskInputField = document.querySelector("#newTaskInput");
  taskInputField.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (taskInputField.value) {
        addTask(taskInputField.value);
      }
    }
  });
}

setupEventListeners();
loadProjects();

// localStorage.clear();

export {
  updateActiveProject, deleteProject, updateTask, deleteTask,
};
