// Fetch and render publications
async function loadPublications() {
    try {
        const response = await fetch('data/publications.json');
        const publications = await response.json();
        const publicationsList = document.getElementById('publications-list');
        
        if (!publicationsList) return;
        
        publicationsList.innerHTML = publications.map(pub => {
            const titleLink = pub.url 
                ? `<a href="${pub.url}" target="_blank" class="title">${pub.title}</a>` 
                : `<span class="title">${pub.title}</span>`;
            
            const note = pub.note ? ` ${pub.note}` : '';
            
            return `
                <li>
                    <span class="author">${pub.authors} (${pub.year}).</span>
                    ${titleLink}
                    ${pub.venue}${note}
                    <div class="divider"></div>
                </li>
            `;
        }).join('');
    } catch (error) {
        console.error('Error loading publications:', error);
    }
}

// Fetch and render projects
async function loadProjects() {
    try {
        const response = await fetch('data/projects.json');
        const projects = await response.json();
        const projectsTable = document.getElementById('projects-table');
        
        if (!projectsTable) return;
        
        projectsTable.innerHTML = projects.map(project => {
            const titleLink = project.url 
                ? `<a href="${project.url}" target="_blank">${project.title}</a>` 
                : project.title;
            
            const categories = project.categories.join(', ');
            
            return `
                <tr data-category="${categories}">
                    <td>${project.year}</td>
                    <td>${titleLink}</td>
                    <td>${project.discipline}</td>
                    <td>${project.collaboration}</td>
                </tr>
            `;
        }).join('');
        
        // Re-initialize filter functionality after loading projects
        initializeFilters();
    } catch (error) {
        console.error('Error loading projects:', error);
    }
}

// Initialize filter functionality for projects
function initializeFilters() {
    const navItems = document.querySelectorAll(".navbar ul li");
    const rows = document.querySelectorAll("#projects-table tr");
    
    navItems.forEach(item => {
        item.addEventListener("click", (event) => {
            event.preventDefault();
            
            navItems.forEach(nav => nav.classList.remove("active"));
            item.classList.add("active");
            
            const filter = item.getAttribute("data-filter");
            
            rows.forEach(row => {
                const categories = row.getAttribute("data-category").split(", ");
                if (filter === "all" || categories.includes(filter)) {
                    row.style.display = "table-row";
                } else {
                    row.style.display = "none";
                }
            });
        });
    });
}

// Load both when page loads
document.addEventListener('DOMContentLoaded', () => {
    loadPublications();
    loadProjects();
});
