// app.js
const projectList = document.getElementById('project-list');
const addProjectBtn = document.getElementById('add-project-btn');
const projectModal = document.getElementById('project-modal');
const projectForm = document.getElementById('project-form');
const projectStatusFilter = document.getElementById('project-status-filter');

let projects = [];

function renderProjects(filteredProjects = projects) {
  projectList.innerHTML = '';

  filteredProjects.forEach(project => {
    const projectElement = document.createElement('div');
    projectElement.classList.add('card', 'mb-3');

    projectElement.innerHTML = `
      <div class="card-body">
        <h5 class="card-title">${project.name}</h5>
        <p class="card-text">Status: ${project.status}</p>
        <div class="d-flex justify-content-end">
          <button class="btn btn-primary btn-sm me-2 edit-project-btn" data-project-id="${project.id}">Edit</button>
          <button class="btn btn-danger btn-sm delete-project-btn" data-project-id="${project.id}">Delete</button>
        </div>
      </div>
    `;

    projectList.appendChild(projectElement);
  });
}

function addProject(project) {
  projects.push(project);
  renderProjects();
}

function deleteProject(projectId) {
  projects = projects.filter(project => project.id !== projectId);
  renderProjects();
}

function editProject(projectId, updatedProject) {
  projects = projects.map(project => {
    if (project.id === projectId) {
      return { ...project, ...updatedProject };
    }
    return project;
  });
  renderProjects();
}

addProjectBtn.addEventListener('click', () => {
  projectModal.classList.add('show');
  projectModal.style.display = 'block';
});

projectForm.addEventListener('submit', e => {
  e.preventDefault();
  const projectName = document.getElementById('project-name').value;
  const projectStatus = document.getElementById('project-status').value;
  const newProject = { id: projects.length + 1, name: projectName, status: projectStatus };
  addProject(newProject);
  projectModal.classList.remove('show');
  projectModal.style.display = 'none';
  projectForm.reset();
});

projectStatusFilter.addEventListener('click', e => {
  if (e.target.dataset.status) {
    const filterStatus = e.target.dataset.status;
    const filteredProjects = filterStatus === 'all' ? projects : projects.filter(project => project.status === filterStatus);
    renderProjects(filteredProjects);
  }
});