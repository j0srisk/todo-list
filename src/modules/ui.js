import { updateActiveProject } from '../index.js';
import { differenceInDays, parseISO } from 'date-fns';
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
        document.getElementById('addProjectContainer').style.display = 'flex';
        document.getElementById('newProjectInput').focus();
    });

    document.getElementById('newProjectInput').addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
          event.preventDefault();
          document.getElementById('saveProjectBtn').click();
        }
    });
  
    document.getElementById('cancelProjectBtn').addEventListener('click', function() {
        document.getElementById('addProjectBtn').style.display = 'flex';
        document.getElementById('addProjectContainer').style.display = 'none';
        document.getElementById('newProjectInput').value = '';
    });

    document.getElementById('saveProjectBtn').addEventListener('click', function() {
        document.getElementById('addProjectBtn').style.display = 'flex';
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

        const taskDaysLeft = document.createElement('span');
        taskDaysLeft.classList.add('task-days-left');

        const editSection = document.createElement('div');
        editSection.classList.add('edit-section');

        const deleteTaskIcon = document.createElement('img');
        deleteTaskIcon.classList.add('delete-task-icon');
        deleteTaskIcon.setAttribute('src', deleteSvg);
    
        const editTaskIcon = document.createElement('img');
        editTaskIcon.classList.add('edit-task-icon');
        editTaskIcon.setAttribute('src', editSvg);

        editTaskIcon.addEventListener('click', (event) => {
            if (taskDetails.style.display === 'flex') {
                taskDetails.style.display = 'none';
                taskEditButtons.style.display = 'none';
            } else {
                taskDetails.style.display = 'flex';
                taskEditButtons.style.display = 'flex';
            }
        });

        
        taskElement.appendChild(taskHeader);
        taskHeader.appendChild(checkboxSection);
        checkboxSection.appendChild(checkbox);
        taskHeader.appendChild(infoSection);
        infoSection.appendChild(taskTitle);
        infoSection.appendChild(taskDaysLeft);
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
        dueDateInput.value = task.dueDate;

        const priortyPicker = document.createElement('select');
        priortyPicker.classList.add('priorty-picker');
        
        const priorities = [
            { value: 'none', label: 'None' },
            { value: 'low', label: 'Low' },
            { value: 'medium', label: 'Medium' },
            { value: 'high', label: 'High' },
        ];

        priortyPicker.value = task.priority;
        
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

        dueDateInput.value = task.dueDate;
        priortyPicker.value = task.priority;
        if (task.priority === 'high') {
            checkbox.classList.remove('low-priority');
            checkbox.classList.remove('medium-priority');
            checkbox.classList.add('high-priority');
        } else if (task.priority === 'medium') {
            checkbox.classList.remove('low-priority');
            checkbox.classList.add('medium-priority');
            checkbox.classList.remove('high-priority');
        } else if (task.priority === 'low'){
            checkbox.classList.add('low-priority');
            checkbox.classList.remove('medium-priority');
            checkbox.classList.remove('high-priority');
        };

        saveTaskBtn.addEventListener('click', (event) => {
            task.dueDate = dueDateInput.value;
            task.priority = priortyPicker.value;
            taskDetails.style.display = 'none';
            taskEditButtons.style.display = 'none';
            if (task.priority === 'high') {
                checkbox.classList.remove('low-priority');
                checkbox.classList.remove('medium-priority');
                checkbox.classList.add('high-priority');
            } else if (task.priority === 'medium') {
                checkbox.classList.remove('low-priority');
                checkbox.classList.add('medium-priority');
                checkbox.classList.remove('high-priority');
            } else if (task.priority === 'low'){
                checkbox.classList.add('low-priority');
                checkbox.classList.remove('medium-priority');
                checkbox.classList.remove('high-priority');
            };

            function removeTimeFromDate(date) {
                const year = date.getFullYear();
                const month = date.getMonth();
                const day = date.getDate();

                return new Date(year, month, day);
              }

            if (task.dueDate != ''){
                const daysLeft = differenceInDays(parseISO(task.dueDate), removeTimeFromDate(new Date()));
                if (daysLeft < 0) {
                    taskDaysLeft.classList.add('overdue');
                    taskDaysLeft.textContent = 'Overdue';
                } else if (daysLeft === 0) {
                    taskDaysLeft.classList.remove('overdue');
                    taskDaysLeft.textContent = 'Due Today';
                } else if (daysLeft === 1) {
                    taskDaysLeft.classList.remove('overdue');
                    taskDaysLeft.textContent = 'Due Tomorrow';
                } else {
                    taskDaysLeft.classList.remove('overdue');
                    taskDaysLeft.textContent = daysLeft + ' days left';
                }
            }
    
        });


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