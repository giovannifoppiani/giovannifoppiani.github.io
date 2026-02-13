// Fetch and render publications
async function loadPublications() {
    try {
        const response = await fetch('data/publications.json');
        const data = await response.json();
        const pubList = document.querySelector('.publication-section ul');
        
        pubList.innerHTML = data.publications.map(pub => {
            const titleHtml = pub.url 
                ? `<a href="${pub.url}" target="_blank" class="title">${pub.title}</a>` 
                : `<span class="title">${pub.title}</span>`;
            
            const noteHtml = pub.note ? ` ${pub.note}` : '';
            
            return `
                <li>
                    <span class="author">${pub.authors} (${pub.year}).</span>
                    ${titleHtml}
                    ${pub.venue}${noteHtml}
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
        const data = await response.json();
        const tbody = document.querySelector('.table-container tbody');
        
        tbody.innerHTML = data.projects.map(project => {
            const categories = project.categories.join(', ');
            const titleHtml = project.url 
                ? `<a href="${project.url}" target="_blank">${project.title}</a>` 
                : project.title;
            
            return `
                <tr data-category="${categories}">
                    <td>${project.year}</td>
                    <td>${titleHtml}</td>
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

// Initialize filter functionality
function initializeFilters() {
    const navItems = document.querySelectorAll(".navbar ul li");
    const rows = document.querySelectorAll("tbody tr");
    
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

// Load data when page loads
document.addEventListener('DOMContentLoaded', () => {
    loadPublications();
    loadProjects();
});