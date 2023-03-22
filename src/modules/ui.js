import { updateActiveProject } from '../index.js';
import editSvg from '../assets/IconoirEditPencil.svg';
import deleteSvg from '../assets/IconoirTrash.svg';

const UI = (() => {

    const projectList = document.querySelector('.project-list');
    const activeProjectTasks = document.querySelector('#activeProjectTasks');

    //setup event listeners
    function setupEventListeners(){
        //event listerners for project input
    document.getElementById('addProjectBtn').addEventListener('click', function() {
        document.getElementById('addProjectBtn').style.display = 'none';
        document.getElementById('addProjectContainer').style.display = 'block';
        document.getElementById('newProjectInput').focus();
    });

    document.getElementById('newProjectInput').addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
          event.preventDefault();
          document.getElementById('saveProjectBtn').click();
        }
    });
  
    document.getElementById('cancelProjectBtn').addEventListener('click', function() {
        document.getElementById('addProjectBtn').style.display = 'block';
        document.getElementById('addProjectContainer').style.display = 'none';
        document.getElementById('newProjectInput').value = '';
    });

    document.getElementById('saveProjectBtn').addEventListener('click', function() {
        document.getElementById('addProjectBtn').style.display = 'block';
        document.getElementById('addProjectContainer').style.display = 'none';

    });
    }

    function createProjectElement(project) {
        const projectElement = document.createElement('li');
        projectElement.classList.add('project-item');
      
        const projectTitle = document.createElement('span');
        projectTitle.classList.add('project-title');
        projectTitle.textContent = project.title;
      
        projectElement.appendChild(projectTitle);
      
        document.getElementById('newProjectInput').value = '';
        
        projectElement.addEventListener('click', (event) => {
            const ActiveProject = updateActiveProject(project);
            const projectElements = document.querySelectorAll('.project-item');
            projectElements.forEach((projectElement) => {
                console.log(projectElement);
                projectElement.classList.remove('active');
            });
            projectElement.classList.add('active');
        });

        //repeated code
        const projectElements = document.querySelectorAll('.project-item');
            projectElements.forEach((projectElement) => {
                console.log(projectElement);
                projectElement.classList.remove('active');
        });
        projectElement.classList.add('active');
      
        return projectElement;
    }
      

    function createTaskElement(task) {
        const taskElement = document.createElement('li');
        taskElement.classList.add('task-item');

        const taskHeader = document.createElement('div');
        taskHeader.classList.add('task-header');

        const checkboxSection = document.createElement('div');
        checkboxSection.classList.add('checkbox-section');

        const checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.classList.add('task-checkbox');

        const infoSection = document.createElement('div');
        infoSection.classList.add('info-section');
    
        const taskTitle = document.createElement('span');
        taskTitle.classList.add('task-title');
        taskTitle.textContent = task.title;

        const editSection = document.createElement('div');
        editSection.classList.add('edit-section');

        const deleteTaskIcon = document.createElement('img');
        deleteTaskIcon.classList.add('delete-task-icon');
        deleteTaskIcon.setAttribute('src', deleteSvg);
    
        const editTaskIcon = document.createElement('img');
        editTaskIcon.classList.add('edit-task-icon');
        editTaskIcon.setAttribute('src', editSvg);

        editTaskIcon.addEventListener('click', (event) => {
            if (taskDetails.style.display === 'block') {
                taskDetails.style.display = 'none';
                taskEditButtons.style.display = 'none';
            } else {
                taskDetails.style.display = 'block';
                taskEditButtons.style.display = 'block';
            }
        });

        
        taskElement.appendChild(taskHeader);
        taskHeader.appendChild(checkboxSection);
        checkboxSection.appendChild(checkbox);
        taskHeader.appendChild(infoSection);
        infoSection.appendChild(taskTitle);
        taskHeader.appendChild(editSection);
        editSection.appendChild(deleteTaskIcon);
        editSection.appendChild(editTaskIcon); // Append the icon to the task element
    
        document.getElementById('newTaskInput').value = '';
    
        taskElement.childNodes[0].addEventListener('click', (event) => {
            if (event.target.checked) {
                taskElement.classList.add('completed');
                task.completed = true;
            } else {
                taskElement.classList.remove('completed');
                task.completed = false;
            }
        });

        const taskDetails = document.createElement('div');
        taskDetails.classList.add('task-details');
        taskDetails.style.display = 'none';

        const dueDateInput = document.createElement('input');
        dueDateInput.setAttribute('type', 'date');
        dueDateInput.classList.add('due-date-input');

        const priortyPicker = document.createElement('select');
        priortyPicker.classList.add('priorty-picker');
        
        const priorities = [
            { value: 'none', label: 'None' },
            { value: 'low', label: 'Low' },
            { value: 'medium', label: 'Medium' },
            { value: 'high', label: 'High' },
        ];
        
        // Loop through the priorities array and create option elements for each priority
        priorities.forEach((priority) => {
            const option = document.createElement('option');
            option.value = priority.value;
            option.textContent = priority.label;
            priortyPicker.appendChild(option);
        });
        
        taskElement.appendChild(taskDetails);
        taskDetails.appendChild(dueDateInput);
        taskDetails.appendChild(priortyPicker);

        const taskEditButtons = document.createElement('div');
        taskEditButtons.classList.add('task-edit-buttons');
        taskEditButtons.style.display = 'none';

        const cancelTaskBtn = document.createElement('button');
        cancelTaskBtn.classList.add('cancel-task-btn');
        cancelTaskBtn.textContent = 'Cancel';

        const saveTaskBtn = document.createElement('button');
        saveTaskBtn.classList.add('save-task-btn');
        saveTaskBtn.textContent = 'Save';

        taskElement.appendChild(taskEditButtons);
        taskEditButtons.appendChild(cancelTaskBtn);
        taskEditButtons.appendChild(saveTaskBtn);

        return taskElement;
    }
    
    

    function renderProjects(projects) {
        projectList.innerHTML = '';

        projects.forEach((project) => {
            const projectElement = createProjectElement(project);
            projectList.appendChild(projectElement);
        });
    }
    
    function renderTasks(project) {
        activeProjectTasks.innerHTML = '';

        const projectTitleText = document.querySelector('#activeProjectTitle');
        projectTitleText.textContent = project.title;

        project.tasks.forEach((task) => {
            const taskElement = createTaskElement(task);
            activeProjectTasks.appendChild(taskElement);
            if (task.completed) {
                console.log(task);
                taskElement.classList.add('completed');
                taskElement.childNodes[0].checked = true;
            }
        });
    }

    setupEventListeners();

    return {
        renderProjects,
        renderTasks,
    };

})();

export default UI;