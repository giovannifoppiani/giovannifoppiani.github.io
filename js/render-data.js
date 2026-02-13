// render-data.js - Automatically generates publications and projects from JSON

// Render Publications
async function renderPublications() {
    try {
        const response = await fetch('data/publications.json');
        const publications = await response.json();
        
        const publicationList = document.getElementById('publication-list');
        publicationList.innerHTML = '';
        
        publications.forEach(pub => {
            const li = document.createElement('li');
            
            // Build the HTML structure
            let html = `<span class="author">${pub.authors}</span> `;
            
            if (pub.url) {
                html += `<a href="${pub.url}" target="_blank" class="title">${pub.title}</a> `;
            } else {
                html += `<span class="title">${pub.title}</span> `;
            }
            
            html += pub.venue;
            
            if (pub.status === 'in_progress') {
                html += ' [In progress]';
            }
            
            html += '<div class="divider"></div>';
            
            li.innerHTML = html;
            publicationList.appendChild(li);
        });
    } catch (error) {
        console.error('Error loading publications:', error);
    }
}

// Render Projects Table
async function renderProjects() {
    try {
        const response = await fetch('data/projects.json');
        const projects = await response.json();
        
        const tbody = document.getElementById('projects-tbody');
        tbody.innerHTML = '';
        
        projects.forEach(project => {
            const tr = document.createElement('tr');
            tr.setAttribute('data-category', project.categories.join(', '));
            
            // Year
            const tdYear = document.createElement('td');
            tdYear.textContent = project.year;
            tr.appendChild(tdYear);
            
            // Title (with link if available)
            const tdTitle = document.createElement('td');
            if (project.url) {
                const link = document.createElement('a');
                link.href = project.url;
                link.target = '_blank';
                link.textContent = project.title;
                tdTitle.appendChild(link);
            } else {
                tdTitle.textContent = project.title;
            }
            tr.appendChild(tdTitle);
            
            // Discipline
            const tdDiscipline = document.createElement('td');
            tdDiscipline.textContent = project.discipline;
            tr.appendChild(tdDiscipline);
            
            // Collaboration
            const tdCollaboration = document.createElement('td');
            tdCollaboration.textContent = project.collaboration;
            tr.appendChild(tdCollaboration);
            
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error('Error loading projects:', error);
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    renderPublications();
    renderProjects();
});