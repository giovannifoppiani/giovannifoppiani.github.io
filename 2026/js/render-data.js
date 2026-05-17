// render-data.js — loads publications and projects from JSON,
// then wires up the "Read more" toggle and project category filter.

async function renderPublications() {
    try {
        const response = await fetch('data/publications.json');
        const publications = await response.json();

        const list = document.getElementById('publication-list');
        if (!list) return;
        list.innerHTML = '';

        publications.forEach(pub => {
            const li = document.createElement('li');
            let html = `<span class="author">${pub.authors}</span> `;
            if (pub.url) {
                html += `<a href="${pub.url}" target="_blank" rel="noopener" class="title">${pub.title}</a> `;
            } else {
                html += `<span class="title">${pub.title}</span> `;
            }
            html += pub.venue;
            if (pub.status === 'in_progress') html += ' [In progress]';
            html += '<div class="divider"></div>';
            li.innerHTML = html;
            list.appendChild(li);
        });
    } catch (err) {
        console.error('Error loading publications:', err);
    }
}

async function renderProjects() {
    try {
        const response = await fetch('data/projects.json');
        const projects = await response.json();

        const tbody = document.getElementById('projects-tbody');
        if (!tbody) return;
        tbody.innerHTML = '';

        projects.forEach(project => {
            const tr = document.createElement('tr');
            tr.setAttribute('data-category', project.categories.join(', '));

            const tdYear = document.createElement('td');
            tdYear.textContent = project.year;
            tr.appendChild(tdYear);

            const tdTitle = document.createElement('td');
            if (project.url) {
                const a = document.createElement('a');
                a.href = project.url;
                a.target = '_blank';
                a.rel = 'noopener';
                a.textContent = project.title;
                tdTitle.appendChild(a);
            } else {
                tdTitle.textContent = project.title;
            }
            tr.appendChild(tdTitle);

            const tdDiscipline = document.createElement('td');
            tdDiscipline.textContent = project.discipline;
            tr.appendChild(tdDiscipline);

            const tdCollab = document.createElement('td');
            tdCollab.textContent = project.collaboration;
            tr.appendChild(tdCollab);

            tbody.appendChild(tr);
        });
    } catch (err) {
        console.error('Error loading projects:', err);
    }
}

function setupHamburger() {
    const btn = document.getElementById('hamburgerBtn');
    const dropdown = document.getElementById('hamburgerDropdown');
    if (!btn || !dropdown) return;

    const close = () => {
        btn.classList.remove('active');
        dropdown.classList.remove('active');
        btn.setAttribute('aria-expanded', 'false');
        btn.setAttribute('aria-label', 'Open menu');
        document.body.style.overflow = '';
    };
    const open = () => {
        btn.classList.add('active');
        dropdown.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
        btn.setAttribute('aria-label', 'Close menu');
        document.body.style.overflow = 'hidden';
    };

    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.contains('active') ? close() : open();
    });

    dropdown.querySelectorAll('a').forEach(a => a.addEventListener('click', close));

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') close();
    });
}

function setupAboutToggle() {
    const btn = document.getElementById('aboutToggle');
    const content = document.getElementById('aboutContent');
    if (!btn || !content) return;
    const label = btn.querySelector('span');
    btn.addEventListener('click', () => {
        const open = content.classList.toggle('active');
        btn.setAttribute('aria-expanded', String(open));
        if (label) label.textContent = open ? 'Hide extended bio' : 'Extended bio';
    });
}

function setupProjectFilter() {
    const items = document.querySelectorAll('.navbar [data-filter]');
    const tbody = document.getElementById('projects-tbody');
    if (!items.length || !tbody) return;

    items.forEach(item => {
        const link = item.querySelector('a');
        if (!link) return;
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const filter = item.getAttribute('data-filter');
            items.forEach(i => i.classList.toggle('active', i === item));

            tbody.querySelectorAll('tr').forEach(row => {
                const cats = (row.getAttribute('data-category') || '')
                    .split(',').map(s => s.trim());
                const match = filter === 'all' || cats.includes(filter);
                row.style.display = match ? '' : 'none';
            });
        });
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    setupHamburger();
    setupAboutToggle();
    await Promise.all([renderPublications(), renderProjects()]);
    setupProjectFilter();
});
