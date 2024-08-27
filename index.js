document.addEventListener('DOMContentLoaded', function() {
    // Set up about section
    document.getElementById('bio').innerHTML = `
        <p>${data.about}</p>
        <p>Email: <a href="mailto:${data.email}">${data.email}</a> | Phone: ${data.phone}</p>
        <p>LinkedIn: <a href="https://${data.linkedIn}" target="_blank">${data.linkedIn}</a></p>
    `;

    // Set up skills section
    const skills = data.technicalSkills;
    document.getElementById('skills').innerHTML = `
        <div class="col-md-6">
            <h3>Programming Languages</h3>
            <ul>${skills.programmingLanguages.map(lang => `<li>${lang}</li>`).join('')}</ul>
        </div>
        <div class="col-md-6">
            <h3>Frameworks</h3>
            <ul>${skills.frameworks.map(framework => `<li>${framework}</li>`).join('')}</ul>
        </div>
        <div class="col-md-6">
            <h3>Databases</h3>
            <ul>${skills.databases.map(db => `<li>${db}</li>`).join('')}</ul>
        </div>
        <div class="col-md-6">
            <h3>Tools & Technologies</h3>
            <ul>${skills.toolsTechnologies.map(tool => `<li>${tool}</li>`).join('')}</ul>
        </div>
        <div class="col-md-6">
            <h3>Areas of Interest</h3>
            <ul>${skills.areasOfInterest.map(area => `<li>${area}</li>`).join('')}</ul>
        </div>
    `;

    // Set up work experience section
    const experience = data.workExperience.map(exp => `
        <div class="timeline-block">
            <div class="timeline-img colorlib-shadow">
                <i class="fa fa-briefcase"></i>
            </div>
            <div class="timeline-content">
                <h2>${exp.company} <span>${exp.startDate} - ${exp.endDate}</span></h2>
                <h3>${exp.position}</h3>
                ${exp.subSections.map(section => `
                    <div class="timeline-item">
                        <h3>${section.title} (${section.startDate} - ${section.endDate})</h3>
                        <ul>
                            ${section.responsibilities.map(res => `<li>${res}</li>`).join('')}
                        </ul>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
    document.getElementById('experience').innerHTML = experience;

    // Set up education section
    document.getElementById('education').innerHTML = `
        <div class="timeline-block">
            <div class="timeline-img colorlib-shadow">
                <i class="fa fa-graduation-cap"></i>
            </div>
            <div class="timeline-content">
                <h2>${data.education.degree} <span>${data.education.graduationDate}</span></h2>
                <h3>${data.education.institution}</h3>
                <p>${data.education.grade}</p>
            </div>
        </div>
    `;

    // Set up projects section
    const updateProjects = (projectType, projects) => {
        document.getElementById(projectType).innerHTML = projects.map(project => `
            <li>
                <h3><a href="${project.link}" target="_blank">${project.name}</a></h3>
                <p>${project.description}</p>
            </li>
        `).join('');
    };

    updateProjects('backend-projects', data.projects);
});

