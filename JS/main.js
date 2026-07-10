
const courses = {
    html: { lessons: 5, key: "html_progress", bar: "htmlProgress", text: "htmlProgressText" },
    css: { lessons: 5, key: "css_progress", bar: "cssProgress", text: "cssProgressText" },
    javascript: { lessons: 5, key: "javascript_progress", bar: "jsProgress", text: "jsProgressText" },
    tailwind: { lessons: 5, key: "tailwind_progress", bar: "tailwindProgress", text: "tailwindProgressText" }
};

let currentCourse = null;

function getProgress(courseKey) {
    return parseInt(localStorage.getItem(courses[courseKey].key)) || 0;
}


function saveProgress(courseKey, value) {
    localStorage.setItem(courses[courseKey].key, value);
}

function updateCard(courseKey) {
    const course = courses[courseKey];
    const percent = Math.round((getProgress(courseKey) / course.lessons) * 100);

    document.getElementById(course.bar).style.width = percent + "%";
    document.getElementById(course.text).textContent = percent + "%";
}

function updateModalBar(courseKey) {
    const course = courses[courseKey];
    const percent = Math.round((getProgress(courseKey) / course.lessons) * 100);

    document.getElementById("modalBar").style.width = percent + "%";
    document.getElementById("modalPercent").textContent = percent + "%";
}

function showCurrentLesson(courseKey) {
    const course = courses[courseKey];
    const done = getProgress(courseKey);

    const courseBox = document.querySelector(`.courseLessons[data-course="${courseKey}"]`);

    courseBox.querySelectorAll(".lesson").forEach((lesson) => lesson.classList.add("hidden"));
    courseBox.querySelector(".courseFinished").classList.add("hidden");

    if (done >= course.lessons) {
        courseBox.querySelector(".courseFinished").classList.remove("hidden");
    } else {
        const nextLessonNumber = done + 1;
        courseBox.querySelector(`.lesson[data-lesson="${nextLessonNumber}"]`).classList.remove("hidden");
    }
}

function openModal(courseKey) {
    currentCourse = courseKey;

    document.querySelectorAll(".courseLessons").forEach((box) => box.classList.add("hidden"));
    document.querySelector(`.courseLessons[data-course="${courseKey}"]`).classList.remove("hidden");

    updateModalBar(courseKey);
    showCurrentLesson(courseKey);

    document.getElementById("courseModal").classList.remove("hidden");
    document.getElementById("courseModal").classList.add("flex");
}

function closeModal() {
    document.getElementById("courseModal").classList.add("hidden");
    document.getElementById("courseModal").classList.remove("flex");
}

document.addEventListener("DOMContentLoaded", () => {
    for (let key in courses) {
        updateCard(key);
    }

    document.querySelectorAll(".openCourse").forEach((btn) => {
        btn.addEventListener("click", () => {
            openModal(btn.dataset.course);
        });
    });

    document.getElementById("closeCourse").addEventListener("click", closeModal);

    document.getElementById("lessonContainer").addEventListener("click", (e) => {
        if (e.target.classList.contains("completeBtn") && currentCourse) {
            const done = getProgress(currentCourse);
            saveProgress(currentCourse, done + 1);
            updateCard(currentCourse);
            updateModalBar(currentCourse);
            showCurrentLesson(currentCourse);
        }
    });
});
// عناصر المينيو
const menuBtn = document.getElementById("menuBtn");
const closeMenuBtn = document.getElementById("closeMenuBtn");
const mobileMenu = document.getElementById("mobileMenu");

// فتح المينيو من اليمين
menuBtn.addEventListener("click", () => {
    mobileMenu.classList.remove("translate-x-full");
});

// إغلاق المينيو بزر الـ X
closeMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.add("translate-x-full");
});

// إغلاق المينيو تلقائيًا عند الضغط على أي رابط بداخله
mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        mobileMenu.classList.add("translate-x-full");
    });
});
