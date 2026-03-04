
const preloaderStr = "ACE FLORES";
const preloaderTextContainer = document.getElementById('preloaderText');
preloaderStr.split('').forEach((char, index) => {
    const span = document.createElement('span');
    span.textContent = char === ' ' ? '\u00A0' : char;
    span.classList.add('preloader-char');
    span.style.animationDelay = `${index * 0.08}s`;
    preloaderTextContainer.appendChild(span);
});

const percentEl = document.getElementById('preloaderPercent');
const loadingBarEl = document.getElementById('loadingProgress');
const loadDuration = 2200;
let loadStartTime = null;

function animatePreloader(timestamp) {
    if (!loadStartTime) loadStartTime = timestamp;
    const elapsed = timestamp - loadStartTime;
    let progress = elapsed / loadDuration;
    let easeProgress = 1 - Math.pow(1 - progress, 3);
    let percent = Math.floor(easeProgress * 100);
    if (percent > 100) percent = 100;

    percentEl.textContent = percent + '%';
    loadingBarEl.style.width = percent + '%';

    if (elapsed < loadDuration) {
        requestAnimationFrame(animatePreloader);
    } else {
        setTimeout(() => {
            document.getElementById('preloader').classList.add('slide-up');
            setTimeout(() => {
                document.getElementById('mainNav').classList.add('show');
                document.getElementById('heroSubtitle').classList.add('show');
                document.getElementById('heroTextContainer').classList.add('show');
                document.getElementById('getInTouchBtn').classList.add('show');
            }, 400);
        }, 300);
    }
}
requestAnimationFrame(animatePreloader);


const heroTextStr = "ACE FLORES";
const heroContainer = document.getElementById('heroTextContainer');

heroTextStr.split('').forEach((char, index) => {
    const span = document.createElement('span');
    const charContent = char === ' ' ? '\u00A0' : char;
    span.textContent = charContent;
    span.setAttribute('data-char', charContent);
    span.classList.add('hero-char');
    span.style.animationDelay = `${index * 0.06}s`;
    heroContainer.appendChild(span);
});

const heroChars = document.querySelectorAll('.hero-char');
let targetScrollY = 0;
let currentScrollY = 0;
let waveX = 0;

window.addEventListener('scroll', () => {
    targetScrollY = window.scrollY;
});

const totalChars = heroChars.length;
const charDuration = 0.75;
const staggerStep = (1 - charDuration) / (totalChars - 1);

function renderLoop() {
    currentScrollY += (targetScrollY - currentScrollY) * 0.1;
    const isMobile = window.innerWidth <= 768;
    const waveSpeed = isMobile ? 2.0 : 2.5;

    waveX -= waveSpeed;
    if (waveX <= -600) waveX += 600;

    const maxScroll = isMobile ? (window.innerHeight * 0.30) : (window.innerHeight * 0.65);
    let progress = currentScrollY / maxScroll;

    if (progress < 0) progress = 0;
    if (progress > 1) progress = 1;

    const letterOffset = isMobile ? 22 : 40;

    heroChars.forEach((char, index) => {
        const charStart = index * staggerStep;
        const charEnd = charStart + charDuration;

        let charFill = 0;
        if (progress >= charEnd) {
            charFill = 100;
        } else if (progress <= charStart) {
            charFill = 0;
        } else {
            let p = (progress - charStart) / charDuration;
            charFill = (Math.sin(p * Math.PI - Math.PI / 2) + 1) / 2 * 100;
        }

        const yOffset = 1.3 - (charFill / 100) * 2.0;
        const continuousXOffset = waveX - (index * letterOffset);

        char.style.setProperty('--wave-x', `${continuousXOffset}px`);
        char.style.setProperty('--wave-x-fast', `${continuousXOffset * 1.5}px`);
        char.style.setProperty('--mask-y', `${yOffset}em`);
    });

    requestAnimationFrame(renderLoop);
}
renderLoop();


const animatedLinks = document.querySelectorAll('.animated-link');
animatedLinks.forEach(link => {
    const text = link.textContent;
    link.textContent = '';
    text.split('').forEach((char, index) => {
        const wrap = document.createElement('span');
        wrap.classList.add('char-wrap');
        const span = document.createElement('span');
        const charContent = char === ' ' ? '\u00A0' : char;
        span.textContent = charContent;
        span.classList.add('char');
        span.setAttribute('data-char', charContent);
        span.style.setProperty('--char-index', index);
        wrap.appendChild(span);
        link.appendChild(wrap);
    });
});

const openBtn = document.getElementById('openMenuBtn');
const closeBtn = document.getElementById('closeMenuBtn');
const menuOverlay = document.getElementById('menuOverlay');

const closeMenu = () => {
    menuOverlay.classList.remove('open');
   
    document.body.style.overflow = '';
};

openBtn.addEventListener('click', () => {
    menuOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
});

closeBtn.addEventListener('click', closeMenu);

animatedLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId && targetId.startsWith('#') && targetId !== '#') {
            e.preventDefault();
            closeMenu();
            setTimeout(() => {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            }, 400);
        }
    });
});


const aboutHeadingEl = document.getElementById('aboutHeading');
const aboutTitleStr = "ABOUT ME";
const totalAboutChars = aboutTitleStr.length;

aboutTitleStr.split('').forEach((char, index) => {
    const span = document.createElement('span');
    span.textContent = char === ' ' ? '\u00A0' : char;
    span.classList.add('about-char');
    const reverseIndex = totalAboutChars - 1 - index;
    span.style.transitionDelay = `${reverseIndex * 0.08}s`;
    aboutHeadingEl.appendChild(span);
});

const p1Text = "Finding out that websites are built using HTML and CSS sparked my interest in web development and introduced me to programming. That curiosity grew into a passion for creating systems and understanding how technology works. Now, at 21 years old and currently a third-year BSIT student, I continue pursuing my goal of becoming a skilled web developer.";
const p2Text = "Currently studying at Datamex College, I have gained experience in HTML, CSS, JavaScript, PHP, and MySQL, allowing me to build dynamic and functional web applications. My next goal is to learn the Laravel framework, explore Supabase as a modern database solution, and strengthen my knowledge in website security to build secure, reliable, and professional systems as I work toward becoming a full-stack developer.";

document.getElementById('placeholder1').textContent = p1Text;
document.getElementById('placeholder2').textContent = p2Text;

const aboutTopContentEl = document.getElementById('aboutTopContent');
const imageStackEl = document.getElementById('imageStackContainer');
const aboutText1El = document.getElementById('aboutText1');
const aboutText2El = document.getElementById('aboutText2');

let hasAboutAnimated = false;

function typeWriterEffect(element, text, baseSpeed, onComplete) {
    let i = 0;
    element.innerHTML = "";
    element.classList.add('typing-cursor');

    function type() {
        if (i < text.length) {
            element.innerHTML = text.substring(0, i + 1);
            i++;
            let currentSpeed = baseSpeed + (Math.random() * 10 - 5);
            if (currentSpeed < 0) currentSpeed = 0;
            setTimeout(type, currentSpeed);
        } else {
            element.classList.remove('typing-cursor');
            if (onComplete) onComplete();
        }
    }
    type();
}

const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !hasAboutAnimated) {
            hasAboutAnimated = true;
            aboutHeadingEl.classList.add('show');
            imageStackEl.classList.add('show');

            setTimeout(() => {
                typeWriterEffect(aboutText1El, p1Text, 8, () => {
                    setTimeout(() => {
                        typeWriterEffect(aboutText2El, p2Text, 8);
                    }, 150);
                });
            }, 600);
        }
    });
}, { threshold: 0.05 });

if (aboutTopContentEl) {
    aboutObserver.observe(aboutTopContentEl);
}

let isCardAnimating = false;
imageStackEl.addEventListener('click', () => {
    if (isCardAnimating) return;
    isCardAnimating = true;

    const activeCard = imageStackEl.querySelector('.image-stack-card.active');
    const inactiveCard = imageStackEl.querySelector('.image-stack-card:not(.active)');

    activeCard.classList.add('swing-out');

    setTimeout(() => {
        activeCard.classList.remove('active');
        inactiveCard.classList.add('active');
        activeCard.classList.remove('swing-out');

        setTimeout(() => {
            isCardAnimating = false;
        }, 600);
    }, 300);
});


const timelineWrapper = document.getElementById('timelineWrapper');
const timelineProgress = document.getElementById('timelineProgress');
const timelineItems = document.querySelectorAll('.timeline-animate');

window.addEventListener('scroll', () => {
    if (timelineWrapper && timelineProgress) {
        const rect = timelineWrapper.getBoundingClientRect();
        const isMobile = window.innerWidth <= 768;

        const triggerPoint = window.innerHeight * (isMobile ? 0.85 : 0.6);

        let distance = triggerPoint - rect.top;
        let progress = distance / rect.height;
        if (progress < 0) progress = 0;
        if (progress > 1) progress = 1;

        timelineProgress.style.height = (progress * 100) + '%';

        timelineItems.forEach(item => {
            const itemRect = item.getBoundingClientRect();
            if (triggerPoint >= itemRect.top + 37) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }
});

function getTimelineObserver() {
    const isMobile = window.innerWidth <= 768;
    return new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0,
        rootMargin: isMobile ? "0px 0px -15% 0px" : "0px 0px -40% 0px"
    });
}

const timelineObserverInstance = getTimelineObserver();
timelineItems.forEach(item => {
    timelineObserverInstance.observe(item);
});


const randomCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
function decryptEffect(element, originalText) {
    let iteration = 0;
    clearInterval(element.decryptInterval);

    element.decryptInterval = setInterval(() => {
        element.innerText = originalText.split("").map((char, index) => {
            if (index < iteration) {
                return originalText[index];
            }
            if (originalText[index] === ' ' || originalText[index] === '\n' || originalText[index] === ',') {
                return originalText[index];
            }
            return randomCharacters[Math.floor(Math.random() * randomCharacters.length)];
        }).join("");

        if (iteration >= originalText.length) {
            clearInterval(element.decryptInterval);
        }
        iteration += 1;
    }, 20);
}

const projectItemsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

document.querySelectorAll('.project-animate').forEach(item => {
    projectItemsObserver.observe(item);
});

const projectsHeadline = document.getElementById('projectsHeadline');
let hasHeadlineDecrypted = false;
const projectSectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !hasHeadlineDecrypted) {
            hasHeadlineDecrypted = true;
            decryptEffect(projectsHeadline, projectsHeadline.getAttribute('data-text'));
        }
    });
}, { threshold: 0.1 });
projectSectionObserver.observe(document.getElementById('projectsSection'));

const projectTitles = document.querySelectorAll('.project-decrypt-title');
const titleObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.hasDecrypted) {
            entry.target.hasDecrypted = true;
            setTimeout(() => {
                decryptEffect(entry.target, entry.target.getAttribute('data-text'));
            }, 300);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

projectTitles.forEach(title => {
    titleObserver.observe(title);
});


window.moveCursor = function (e, element) {
    const tracker = element.querySelector('.view-cursor-tracker');
    if (!tracker) return;

    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

   
    tracker.style.transform = `translate3d(${x}px, ${y}px, 0)`;
};


const sketchSectionEl = document.getElementById('sketchSection');
const sketchObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

if (sketchSectionEl) {
    sketchObserver.observe(sketchSectionEl);
}


const projectsData = {
    project1: {
        title: "Datamex College",
        desc: "Built a modern static website for DATAMEX College in my third year. It provides structured, public information about the school’s mission and vision, educational programs, facilities, extracurricular activities (including Sportsfest, sports events, dance competition, and pageant), success stories from students/parents/graduates, comprehensive FAQs, and inquiry/application channels.",
        images: [
            "img/datamexcollege/hero.jpg",
            "img/datamexcollege/about.jpg",
            "img/datamexcollege/gallery.jpg",
            "img/datamexcollege/feedback.jpg",
            "img/datamexcollege/faq.jpg",
            "img/datamexcollege/footer.jpg"
        ],
        stack: [
            '<i class="devicon-html5-plain colored"></i>',
            '<i class="devicon-css3-plain colored"></i>',
            '<i class="devicon-javascript-plain colored"></i>',
            '<i class="devicon-bootstrap-plain colored"></i>'
        ],
        link: "https://datamexcollege.vercel.app/"
    },
    project2: {
        title: "Grease Monkey",
        desc: "Created a modern static website for Ford Grease Monkey in my third year. It provides structured information on Ford vehicle specialization, including categorized parts pricing for various models (EcoSport, Fiesta, Focus, Explorer, Everest, Mustang), specialized repair services (Ford modules, key fabrication/programming, diagnostics, overhauls), and answers to frequently asked questions about common issues, parts costs, and repair processes.",
        images: [
            "img/greasemonkey/hero.jpg",
            "img/greasemonkey/aboutus.jpg",
            "img/greasemonkey/parts.jpg",
            "img/greasemonkey/services.jpg",
            "img/greasemonkey/faq.jpg",
            "img/greasemonkey/footer.jpg",
            "img/greasemonkey/login.jpg",
            "img/greasemonkey/forgot.jpg"
        ],
        stack: [
            '<i class="devicon-html5-plain colored"></i>',
            '<i class="devicon-css3-plain colored"></i>',
            '<i class="devicon-javascript-plain colored"></i>',
            '<i class="devicon-bootstrap-plain colored"></i>'
        ],
        link: "https://greasee-monkey.vercel.app/"
    },
    project3: {
        title: "Pixel Seven",
        desc: "Created a modern static website in my third year to showcase the PixelEdge 16 Pro smartphone concept. It highlights key selling points including pro-level camera clarity, lightning-fast performance, vibrant display technology, long battery life, robust security, 5G support, and durable materials—all organized into dedicated feature sections for an intuitive user experience.",
        images: [
            "img/pixelseven/hero.jpg",
            "img/pixelseven/specs.jpg",
            "img/pixelseven/gallery.jpg",
            "img/pixelseven/footer.jpg"
        ],
        stack: [
            '<i class="devicon-html5-plain colored"></i>',
            '<i class="devicon-css3-plain colored"></i>',
            '<i class="devicon-javascript-plain colored"></i>',
            '<i class="devicon-bootstrap-plain colored"></i>'
        ],
        link: "https://pixel-seven-jade.vercel.app/"
    },
    project4: {
        title: "Recent Portfolio",
        desc: "Personal portfolio website, built and maintained as a current project during my BSIT studies. The static site presents my background as a second-year student developer passionate about frontend technologies (HTML5, CSS3, JavaScript), my learning goals, tech stack (including C++, VS Code, GitHub, ChatGPT), and recent works such as a coding vlog site, the 'Slide Tech' group project (Vercel-deployed), and an in-progress Kitchen Inventory system.",
        images: [
            "img/acefloresportfolio/hero.jpg",
            "img/acefloresportfolio/aboutme.jpg",
            "img/acefloresportfolio/techstack.jpg"
        ],
        stack: [
            '<i class="devicon-html5-plain colored"></i>',
            '<i class="devicon-css3-plain colored"></i>',
            '<i class="devicon-javascript-plain colored"></i>'
        ],
        link: "https://aceflores.vercel.app/"
    },
    project5: {
        title: "Runai Game",
        desc: "Award-winning game project: Runai (endless runner survival) and its static promotional website, champion in Best Game and Best Website. Created during my BSIT studies, the site showcases the game's narrative—Unit-10 escaping a zombie- and robot-infested lab with the last antidote—highlighting enemies, power-ups (health batteries), hazards (lava, hammers, spikes, turrets, falling objects), and reflex-based gameplay. Includes story, features overview, and direct 'Play Now' link to the external game platform.",
        images: [
            "img/runaigame/hero.jpg",
            "img/runaigame/gamehistory.jpg",
            "img/runaigame/characters.jpg",
            "img/runaigame/powerups.jpg",
            "img/runaigame/environment.jpg",
            "img/runaigame/gamesetting.jpg",
            "img/runaigame/footer.jpg",
        ],
        stack: [
            '<i class="devicon-html5-plain colored"></i>',
            '<i class="devicon-css3-plain colored"></i>',
            '<i class="devicon-javascript-plain colored"></i>',
        ],
        link: "https://runai-game.vercel.app/"
    },
    project6: {
        title: "Ordering system",
        desc: "Full-stack Restaurant POS and Kitchen Management System built with PHP, MySQL, HTML/CSS/JavaScript, Bootstrap, and WebSocket for real-time order updates. Supports Admin (inventory/user/sales oversight), Cashier (POS terminal, order queuing, receipts), and Kitchen Staff (live KDS, order history). Features include real-time stock tracking, sales analytics/charts, PDF exports, role-based access, and responsive design—developed as an advanced project showcasing end-to-end web application development.",
        images: [
            "img/orderingsystem/dashboard.jpg",
            "img/orderingsystem/inventory.jpg",
            "img/orderingsystem/manageuser.jpg",
            "img/orderingsystem/salesoverview.jpg",
            "img/orderingsystem/pos.jpg",
            "img/orderingsystem/transactionhistory.jpg",
            "img/orderingsystem/liveorders.jpg",
            "img/orderingsystem/orderhistory.jpg",
        ],
        stack: [
            '<i class="devicon-html5-plain colored"></i>',
            '<i class="devicon-css3-plain colored"></i>',
            '<i class="devicon-javascript-plain colored"></i>',
            '<i class="devicon-bootstrap-plain colored"></i>',
            '<i class="devicon-php-plain colored"></i>',
            '<i class="devicon-mysql-plain colored"></i>'
        ],
        link: "coming_soon.html"
    },
    project7: {
        title: "Slide Tech",
        desc: "Third-year BSIT project: Fully static Slide Tech landing page using pure HTML and CSS. Showcases premium vehicles (sportscars and motorcycles) with engine specs and promotional pricing, core vehicle services, customer feedback (with ratings), and an FAQ section—crafted for clear navigation, semantic markup, and responsive design to effectively present an automotive sales and service business.",
        images: [
            "img/slidetech/hero.jpg",
            "img/slidetech/items.jpg",
            "img/slidetech/services.jpg",
            "img/slidetech/faq.jpg",
            "img/slidetech/footer.jpg",
        ],
        stack: [
            '<i class="devicon-html5-plain colored"></i>',
            '<i class="devicon-css3-plain colored"></i>',
        ],
        link: "https://slidetech.vercel.app/"
    },
    project8: {
        title: "Project Management System For Barangay Initiatives",
        desc: "A frontend concept for a dynamic weather dashboard providing current conditions and forecasts. Features a clean layout with custom illustrations that adapt to different weather conditions.",
        images: [
            "img/projectmanagement/admin/login.png",
            "img/projectmanagement/admin/register.png",
            "img/projectmanagement/admin/forgot.png",
            "img/projectmanagement/admin/dasbhoard.png",
            "img/projectmanagement/admin/createproject.png",
            "img/projectmanagement/admin/manageruser.png",
            "img/projectmanagement/admin/projectinformation.png",
            "img/projectmanagement/admin/updateproject.png",
            "img/projectmanagement/admin/usersmonitoring.png",
            "img/projectmanagement/admin/projectstatus.png",
            "img/projectmanagement/manager/managerdasbhoard.png",
            "img/projectmanagement/manager/projectstatus.png",
            "img/projectmanagement/manager/staffmonitoring.png",
            "img/projectmanagement/manager/taskinformation.png",
            "img/projectmanagement/staff/dashboard.png",
            "img/projectmanagement/staff/taskstatus.png",

        ],
        stack: [
            '<i class="devicon-dotnetcore-plain colored"></i>',
            '<i class="devicon-microsoftsqlserver-plain colored"></i>'
        ],
        link: "coming_soon.html"
    }
};


const modalOverlay = document.getElementById('projectModalOverlay');
const modalCloseBtn = document.getElementById('modalCloseBtn');
const carouselTrack = document.getElementById('modalCarouselTrack');

let currentSlide = 0;
let slideCount = 0;

window.openProjectModal = function (projectId) {
    const data = projectsData[projectId];
    if (!data) return;

    document.getElementById('modalProjectTitle').innerText = data.title;
    document.getElementById('modalProjectDesc').innerText = data.desc;
    document.getElementById('modalProjectLink').href = data.link;
    document.getElementById('modalProjectStack').innerHTML = data.stack.join('');

    carouselTrack.innerHTML = '';
    data.images.forEach(imgSrc => {
        const slide = document.createElement('div');
        slide.className = 'modal-carousel-slide';
        slide.innerHTML = `<img src="${imgSrc}" alt="${data.title}" onclick="openLightbox('${imgSrc}')" draggable="false">`;
        carouselTrack.appendChild(slide);
    });

    currentSlide = 0;
    slideCount = data.images.length;
    updateCarousel();

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
};

function closeProjectModal() {
    modalOverlay.classList.remove('active');

 
    const exploreOverlay = document.getElementById('exploreOverlay');
    if (!exploreOverlay || !exploreOverlay.classList.contains('active')) {
   
        document.body.style.overflow = '';
    }
}

modalCloseBtn.addEventListener('click', closeProjectModal);
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeProjectModal();
});

window.moveSlide = function (step) {
    currentSlide += step;
    if (currentSlide < 0) currentSlide = slideCount - 1;
    if (currentSlide >= slideCount) currentSlide = 0;
    updateCarousel();
};

function updateCarousel() {
    carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
}


let touchStartX = 0;
let touchEndX = 0;

carouselTrack.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

carouselTrack.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
        moveSlide(1);
    }
    if (touchEndX > touchStartX + swipeThreshold) {
        moveSlide(-1);
    }
}


const lightboxOverlay = document.getElementById('lightboxOverlay');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCloseBtn = document.getElementById('lightboxCloseBtn');

window.openLightbox = function (src) {
    lightboxImg.src = src;
    lightboxOverlay.classList.add('active');
};

function closeLightbox() {
    lightboxOverlay.classList.remove('active');
}

lightboxCloseBtn.addEventListener('click', closeLightbox);
lightboxOverlay.addEventListener('click', (e) => {
    if (e.target === lightboxOverlay) closeLightbox();
});


const interactiveArea = document.getElementById('sketchInteractiveArea');
const exploreOverlay = document.getElementById('exploreOverlay');
const exploreCloseBtn = document.getElementById('exploreCloseBtn');
const exploreContainer = document.getElementById('exploreContainer');

let isDraggingExplore = false;
let hasDraggedExplore = false;
let exploreStartX;
let exploreScrollLeft;


if (interactiveArea) {
    interactiveArea.addEventListener('click', () => {
        if (exploreOverlay) {
            const sketchSection = document.getElementById('sketchSection');
            if (sketchSection) sketchSection.classList.add('explore-active');

            setTimeout(() => {
                exploreOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            }, 400);
        }
    });
}

window.handleExploreItemClick = function (projectId, event) {
    if (hasDraggedExplore) {
        event.preventDefault();
        event.stopPropagation();
        return;
    }
    openProjectModal(projectId);
};


function closeExplore() {
    if (!exploreOverlay || !exploreOverlay.classList.contains('active')) return;

    exploreOverlay.classList.remove('active');


    document.body.style.overflow = '';

    setTimeout(() => {
        const sketchSection = document.getElementById('sketchSection');
        if (sketchSection) {
            sketchSection.classList.remove('explore-active');
        }
    }, 500);
}

if (exploreCloseBtn) {
    exploreCloseBtn.addEventListener('click', closeExplore);
}

window.addEventListener('wheel', (e) => {
    const modalActive = document.getElementById('projectModalOverlay');
    if (modalActive && modalActive.classList.contains('active')) return;

    if (exploreOverlay && exploreOverlay.classList.contains('active')) {
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && Math.abs(e.deltaY) > 20) {
            closeExplore();
        }
    }
});

let exploreTouchStartY = 0;
window.addEventListener('touchstart', (e) => {
    exploreTouchStartY = e.touches[0].clientY;
}, { passive: true });

window.addEventListener('touchmove', (e) => {
    const modalActive = document.getElementById('projectModalOverlay');
    if (modalActive && modalActive.classList.contains('active')) return;

    if (exploreOverlay && exploreOverlay.classList.contains('active')) {
        let currentY = e.touches[0].clientY;
        if (Math.abs(exploreTouchStartY - currentY) > 60) {
            closeExplore();
        }
    }
}, { passive: true });

if (exploreContainer) {
    exploreContainer.addEventListener('mousedown', (e) => {
        isDraggingExplore = true;
        hasDraggedExplore = false;
        exploreContainer.style.cursor = 'grabbing';
        exploreStartX = e.pageX - exploreContainer.offsetLeft;
        exploreScrollLeft = exploreContainer.scrollLeft;
    });

    exploreContainer.addEventListener('mouseleave', () => {
        isDraggingExplore = false;
        exploreContainer.style.cursor = 'grab';
    });

    exploreContainer.addEventListener('mouseup', () => {
        isDraggingExplore = false;
        exploreContainer.style.cursor = 'grab';
    });

    exploreContainer.addEventListener('mousemove', (e) => {
        if (!isDraggingExplore) return;

        const x = e.pageX - exploreContainer.offsetLeft;
        const walk = (x - exploreStartX) * 2;

        if (Math.abs(walk) > 5) {
            hasDraggedExplore = true;
            e.preventDefault();
        }

        exploreContainer.scrollLeft = exploreScrollLeft - walk;
    });
}


const footerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            footerObserver.unobserve(entry.target);
        }
    });

}, { threshold: 0.1, rootMargin: "0px 0px 0px 0px" });


document.querySelectorAll('.footer-animate, .footer-animate-container').forEach(item => {
    footerObserver.observe(item);
});


const footerHugeTextStr = "ACE FLORES";
const footerHugeContainerEl = document.getElementById('footerHugeText');

if (footerHugeContainerEl) {
 
    footerHugeContainerEl.innerHTML = ''; 

    footerHugeTextStr.split('').forEach((char, index) => {
        const span = document.createElement('span');
        const charContent = char === ' ' ? '\u00A0' : char;
        
        span.textContent = charContent;
        span.setAttribute('data-char', charContent);
        span.classList.add('footer-huge-char');
        
        
        span.style.transitionDelay = `${0.7 + (index * 0.1)}s`;
        
        footerHugeContainerEl.appendChild(span);
    });
}


const footerHugeChars = document.querySelectorAll('.footer-huge-char');
const footerElement = document.getElementById('footer');

let waveXFooter = 0;

function renderFooterWave() {
    if (!footerElement || footerHugeChars.length === 0) return;

    const isMobile = window.innerWidth <= 768;
    const waveSpeed = isMobile ? 2.0 : 2.5;

   
    waveXFooter -= waveSpeed;
    if (waveXFooter <= -600) waveXFooter += 600;


    const rect = footerElement.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    let progress = 0;
    if (rect.top < windowHeight) {
      
        const distanceIn = windowHeight - rect.top;
        
        const maxFillDistance = rect.height + (windowHeight * 0.2);

        progress = distanceIn / maxFillDistance;
    }

    // Clamp progress
    if (progress < 0) progress = 0;
    if (progress > 1) progress = 1;

    const letterOffset = isMobile ? 15 : 30;
    const totalChars = footerHugeChars.length;
    const charDuration = 0.5; 
    const staggerStep = (1 - charDuration) / (totalChars - 1);

    footerHugeChars.forEach((char, index) => {
        const charStart = index * staggerStep;
        const charEnd = charStart + charDuration;

        let charFill = 0;
        if (progress >= charEnd) {
            charFill = 100;
        } else if (progress <= charStart) {
            charFill = 0;
        } else {
            let p = (progress - charStart) / charDuration;
            charFill = p * 100;
        }

       
        const yOffset = 1.3 - (charFill / 100) * 1.5;
        const continuousXOffset = waveXFooter - (index * letterOffset);

        char.style.setProperty('--wave-x', `${continuousXOffset}px`);
        char.style.setProperty('--wave-x-fast', `${continuousXOffset * 1.5}px`);
        char.style.setProperty('--mask-y', `${yOffset}em`);
    });

    requestAnimationFrame(renderFooterWave);
}


renderFooterWave();

ocument.querySelectorAll('.smooth-scroll').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
