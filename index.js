import {
    about,
    skills,
    projects,
    education,
    experience,
    footer,
} from "./data.js";

import { URLs } from './user-data/urls.js';

const { backendProjects } = projects;
const { gitConnected } = URLs;

console.log("Imports:");
console.log("about:", about ? "Imported" : "Not Imported");
console.log("skills:", skills ? "Imported" : "Not Imported");
console.log("projects:", projects ? "Imported" : "Not Imported");
console.log("education:", education ? "Imported" : "Not Imported");
console.log("experience:", experience ? "Imported" : "Not Imported");
console.log("footer:", footer ? "Imported" : "Not Imported");
console.log("URLs:", URLs ? "Imported" : "Not Imported");
console.log("backendProjects:", backendProjects ? "Imported" : "Not Imported");
// console.log("medium:", medium ? "Imported" : "Not Imported");
console.log("gitConnected:", gitConnected ? "Imported" : "Not Imported");

document.addEventListener('DOMContentLoaded', function() {
    // Populate bio section
    populateBio(about, 'about');

    // Populate skills section
    populateSkills(skills, 'skills');
    
    // Fetch and populate blogs from Medium
    // fetchBlogsFromMedium(medium);

    // Fetch and map data from Git-connected service
    // fetchGitConnectedData(gitConnected);

    // Populate projects sections
    populateProjects(backendProjects, 'backend-projects');

    // Populate experience and education sections
    populateExp_Edu(experience, 'experience');
    populateExp_Edu(education, 'education');

    // Populate footer links
    populateLinks(footer, 'footer');
});

// Fetch blogs from Medium profile
async function fetchBlogsFromMedium(url) {
    try {
        const response = await fetch(url);
        const { items } = await response.json();
        populateBlogs(items, "blogs");
    } catch (error) {
        console.error(`Error in fetching the blogs from Medium profile: ${error}`);
    }
}

// Fetch data from Git-connected service
async function fetchGitConnectedData(url) {
    try {
        const response = await fetch(url);
        const { basics } = await response.json();
        mapBasicResponse(basics);
    } catch (error) {
        console.error(`Error in fetching the data from git connected: ${error}`);
    }
}

// Map and set basic profile data
function mapBasicResponse(basics) {
    const { name } = basics;
    window.parent.document.title = name;
}

// Populate bio section
function populateBio(items, id) {
    const bioTag = document.getElementById(id);
    if (bioTag) {
        for (let i = 0; i < items.length; i++) {
            const p = document.createElement("p");
            p.innerHTML = items[i];
            bioTag.append(p);
        }
    } else {
        console.error(`Element with id "${id}" not found`);
    }
}

// Populate skills section
function populateSkills(items, id) {
    const skillsTag = document.getElementById(id);
    if (skillsTag) {
        for (let i = 0; i < items.length; i++) {
            const { skillName, color, percentage } = items[i];
            const h3 = document.createElement("h3");
            h3.innerHTML = skillName;

            const divProgress = document.createElement("div");
            divProgress.className = "progress";
            const divProgressBar = document.createElement("div");
            divProgressBar.className = `progress-bar color-${color}`;
            divProgressBar.style.width = `${percentage}%`;
            divProgress.append(divProgressBar);

            const divProgressWrap = document.createElement("div");
            divProgressWrap.className = "progress-wrap";
            divProgressWrap.append(h3, divProgress);

            const divAnimateBox = document.createElement("div");
            divAnimateBox.className = "col-md-6 animate-box";
            divAnimateBox.append(divProgressWrap);

            skillsTag.append(divAnimateBox);
                     }
    } else {
        console.error(`Element with id "${id}" not found`);
    }
}

// Populate projects section
function populateProjects(items, id) {
    const projectdesign = document.getElementById(id);
    if (projectdesign) {
        const h4 = document.createElement("h4");
        h4.className = "project-heading";

        const a = document.createElement("a");
        a.target = "_blank";

        const img = document.createElement("img");
        img.className = "img-fluid";

        const divResumeContentLeft = document.createElement("div");
        divResumeContentLeft.className = "resume-content";
        divResumeContentLeft.id = "left-div";
        divResumeContentLeft.append(img);

        const divResumeContentRight = document.createElement("div");
        divResumeContentRight.className = "resume-content";
        divResumeContentRight.id = "right-div";

        const p = document.createElement("p");
        p.className = "project-description";

        const divSpan = document.createElement("div");

        const divSubHeading = document.createElement("div");
        divSubHeading.className = "sub-heading";
        divSubHeading.append(p);
        divSubHeading.append(divSpan);
        divResumeContentRight.append(divSubHeading);

        const divResumeItem = document.createElement("div");
        divResumeItem.className = "resume-item";
        divResumeItem.append(divResumeContentLeft);
        divResumeItem.append(divResumeContentRight);
        a.append(divResumeItem);

        const divProjectCard = document.createElement("div");
        divProjectCard.className = "project-card";
        divProjectCard.append(a);

        const li = document.createElement("li");
        li.append(divProjectCard);

        const hr = document.createElement("hr");

        for (let i = 0; i < items.length; i++) {
            const project = items[i];
            h4.innerHTML = project.projectName;
            a.href = project.preview;

            img.src = project.image;

            p.innerHTML = project.summary;

            divSpan.innerHTML = "";
            for (let k = 0; k < project.techStack.length; k++) {
                const span = document.createElement("span");
                span.className = "badge badge-secondary";
                span.innerHTML = project.techStack[k];
                divSpan.append(span);
            }

            projectdesign.append(li.cloneNode(true));

            if (i !== items.length - 1) {
                projectdesign.append(hr.cloneNode(true));
            }
        }
    } else {
        console.error(`Element with id "${id}" not found`);
    }
}

// Populate experience and education sections
function populateExp_Edu(items, id) {
    const mainContainer = document.getElementById(id);
    if (mainContainer) {
        for (let i = 0; i < items.length; i++) {
            const item = items[i];

            const spanTimelineSublabel = document.createElement("span");
            spanTimelineSublabel.className = "timeline-sublabel";
            spanTimelineSublabel.innerHTML = item.subtitle;

            const spanh2 = document.createElement("span");
            spanh2.innerHTML = item.duration;

            const h2TimelineLabel = document.createElement("h2");
            h2TimelineLabel.innerHTML = item.title;
            h2TimelineLabel.append(spanh2);

            const divTimelineLabel = document.createElement("div");
            divTimelineLabel.className = "timeline-label";
            divTimelineLabel.append(h2TimelineLabel);
            divTimelineLabel.append(spanTimelineSublabel);

            for (let j = 0; j < item.details.length; j++) {
                const pTimelineText = document.createElement("p");
                pTimelineText.className = "timeline-text";
                pTimelineText.innerHTML = `&blacksquare; ${item.details[j]}`;
                divTimelineLabel.append(pTimelineText);
            }

            const divTags = document.createElement("div");
            for (let j = 0; j < item.tags.length; j++) {
                const spanTags = document.createElement("span");
                spanTags.className = "badge badge-secondary";
                spanTags.innerHTML = item.tags[j];
                divTags.append(spanTags);
            }
            divTimelineLabel.append(divTags);

            const iFa = document.createElement("i");
            iFa.className = `fa fa-${item.icon}`;

            const divTimelineIcon = document.createElement("div");
            divTimelineIcon.className = "timeline-icon color-2";
            divTimelineIcon.append(iFa);

            const divTimelineEntryInner = document.createElement("div");
            divTimelineEntryInner.className = "timeline-entry-inner";
            divTimelineEntryInner.append(divTimelineIcon);
            divTimelineEntryInner.append(divTimelineLabel);

            const article = document.createElement("article");
            article.className = "timeline-entry animate-box";
            article.append(divTimelineEntryInner);

            mainContainer.append(article);
        }

        const divTimelineIcon = document.createElement("div");
        divTimelineIcon.className = "timeline-icon color-2";

        const divTimelineEntryInner = document.createElement("div");
        divTimelineEntryInner.className = "timeline-entry-inner";
        divTimelineEntryInner.append(divTimelineIcon);

        const article = document.createElement("article");
        article.className = "timeline-entry begin animate-box";
        article.append(divTimelineEntryInner);

        mainContainer.append(article);
    } else {
        console.error(`Element with id "${id}" not found`);
    }
}

// Populate blogs section
function populateBlogs(items, id) {
    const projectdesign = document.getElementById(id);
    if (projectdesign) {
        const count = 3;

        for (let i = 0; i < count; i++) {
            const blog = items[i];

            const h4 = document.createElement("h4");
            h4.className = "project-heading";
            h4.innerHTML = blog.title;

            const a = document.createElement("a");
            a.href = blog.link;
            a.target = "_blank";
            a.append(h4);

            const img = document.createElement("img");
            img.src = blog.thumbnail;
            img.className = "img-fluid";
            img.alt = blog.title;

            const divResumeContentLeft = document.createElement("div");
            divResumeContentLeft.className = "resume-content";
            divResumeContentLeft.id = "left-div";
            divResumeContentLeft.append(img);

            const divResumeContentRight = document.createElement("div");
            divResumeContentRight.className = "resume-content";
            divResumeContentRight.id = "right-div";

            const p = document.createElement("p");
            p.className = "project-description";
            const html = blog.content;
            const [, doc] = /<p>(.*?)<\/p>/g.exec(html) || [];
            p.innerHTML = doc;

            const divSpan = document.createElement("div");
            const span = document.createElement("span");
            span.className = "badge badge-secondary";
            span.innerHTML = "Blog";
            divSpan.append(span);

            const divSubHeading = document.createElement("div");
            divSubHeading.className = "sub-heading";
            divSubHeading.append(p, divSpan);
            divResumeContentRight.append(divSubHeading);

            const divResumeItem = document.createElement("div");
            divResumeItem.className = "resume-item";
            divResumeItem.append(divResumeContentLeft, divResumeContentRight);

            const divProjectCard = document.createElement("div");
            divProjectCard.className = "project-card";
            divProjectCard.append(a);
            a.append(divResumeItem);

            const li = document.createElement("li");
            li.append(divProjectCard);

            projectdesign.append(li);
            if (i !== count - 1) {
                projectdesign.append(document.createElement("hr"));
            }
        }
    } else {
        console.error(`Element with id "${id}" not found`);
    }
}

// Populate footer links
function populateLinks(items, id) {
    const footerTag = document.getElementById(id);
    if (footerTag) {
        for (let i = 0; i < items.length; i++) {
            const { label, data } = items[i];
            const section = document.createElement("div");
            section.className = "footer-section";

            const header = document.createElement("h4");
            header.innerHTML = label;
            section.append(header);

            for (let j = 0; j < data.length; j++) {
                const { text, link, func } = data[j];
                const a = document.createElement("a");
                a.innerHTML = text;
                a.target = "_blank";

                if (link) {
                    a.href = link;
                } else if (func) {
                    a.href = "javascript:void(0);";
                    a.onclick = new Function(func);
                }

                section.append(a);
                section.append(document.createElement("br"));
            }

            footerTag.append(section);
        }
    } else {
        console.error(`Element with id "${id}" not found`);
    }
}

